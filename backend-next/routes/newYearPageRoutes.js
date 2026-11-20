const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");
const NewYearPage = require("../models/NewYearPage");
const Product = require("../models/product");
const { verifyToken, requireRole } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const router = express.Router();
const KEY = "new-year-2027";
const MAX_ROW_ITEMS = 4;
const MAX_ROWS = 100;
const LEGACY_SECTIONS = [
  ["gifts", "New Year 2027 Gift Sets"],
  ["diaries", "Corporate Diaries 2027"],
  ["calendars", "Corporate Calendars 2027"],
];
const ANY_KEY = /^(legacy:[a-z0-9-]{1,120}|product:[a-f0-9]{24}|custom:[a-f0-9]{24})$/;
const HIDEABLE_KEY = /^(legacy:[a-z0-9-]{1,120}|product:[a-f0-9]{24})$/;
const writeRoles = ["super_admin", "admin", "catalog_manager", "content_editor"];
const upload = makeUploader("new-year");

const toCard = (product) => ({
  id: `product:${product._id}`,
  name: product.name,
  image: product.images?.[0]?.url,
  sku: product.sku || "",
  available: product.isActive === true && product.status === "published" && !product.deletedAt,
});

function uploadHref(value) {
  let url;
  try { url = new URL(value); } catch { return null; }
  const base = new URL(process.env.BASE_URL);
  if (url.origin !== base.origin || !/^\/uploads\/new-year\/[a-zA-Z0-9.-]+\.(webp|png|jpe?g)$/i.test(url.pathname) ||
      url.search || url.hash || url.username || url.password) return null;
  return url.href;
}

// Pages saved before rows were dynamic hold three long lists; split them into rows of four.
function layoutOf(settings) {
  if (!settings) return [];
  if (Array.isArray(settings.layout)) {
    return settings.layout.map(({ id, title, items }) => ({ id, title: title || "", items: items || [] }));
  }
  return LEGACY_SECTIONS.flatMap(([key, title]) => {
    const items = settings.rows?.[key] || [];
    const rows = [];
    for (let i = 0; i < items.length; i += MAX_ROW_ITEMS) {
      rows.push({ id: `${key}-${i / MAX_ROW_ITEMS + 1}`, title: i === 0 ? title : "", items: items.slice(i, i + MAX_ROW_ITEMS) });
    }
    return rows;
  });
}

async function readPage(admin) {
  const settings = await NewYearPage.findOne({ key: KEY }).lean();
  const layout = layoutOf(settings);
  const deleted = settings?.deletedProducts || [];
  const placed = layout.flatMap((row) => row.items);
  const keys = admin ? [...placed, ...deleted] : placed;
  const used = new Set(placed);
  const customs = settings?.customProducts || [];
  const customCards = customs
    .filter((c) => admin || used.has(`custom:${c._id}`))
    .map((c) => ({ id: `custom:${c._id}`, name: c.name, image: c.image, available: true }));
  const ids = keys.filter((key) => key.startsWith("product:")).map((key) => key.slice(8));
  const legacy = keys.filter((key) => key.startsWith("legacy:"));
  const products = ids.length || legacy.length ? await Product.find({
    $or: [{ _id: { $in: ids } }, { slug: { $in: legacy.map((key) => key.slice(7)) } }],
  }).select("name slug images sku status isActive deletedAt").lean() : [];
  return {
    settings: settings && {
      bannerMode: settings.bannerMode,
      banner: settings.banner,
      layout,
      productOverrides: settings.productOverrides || [],
      ...(admin ? {
        deletedProducts: deleted,
        customProducts: customs.map((c) => ({ id: String(c._id), name: c.name, image: c.image })),
      } : {}),
    },
    products: [...customCards, ...products.flatMap((product) => {
      const card = toCard(product);
      const references = [
        ...(ids.includes(String(product._id)) ? [card.id] : []),
        ...(legacy.includes(`legacy:${product.slug}`) ? [`legacy:${product.slug}`] : []),
      ];
      // A tombstone prevents a legacy fallback from resurrecting an archived product.
      return references.map((id) => card.available || admin ? { ...card, id } : { id, available: false });
    })],
  };
}

router.get("/", asyncHandler(async (req, res) => {
  res.set("Cache-Control", "no-store");
  return ok(res, await readPage(false));
}));

router.get("/admin", verifyToken, requireRole(...writeRoles, "viewer"), asyncHandler(async (req, res) => {
  res.set("Cache-Control", "no-store");
  return ok(res, await readPage(true));
}));

router.put("/admin", verifyToken, requireRole(...writeRoles), asyncHandler(async (req, res) => {
  const { layout, bannerMode, banner } = req.body;
  if (!Array.isArray(layout) || layout.length > MAX_ROWS) {
    return fail(res, 400, `Provide the page rows, with at most ${MAX_ROWS} rows.`);
  }
  const rowIds = new Set();
  const cleanLayout = [];
  for (const row of layout) {
    const title = typeof row?.title === "string" ? row.title.trim() : null;
    if (typeof row?.id !== "string" || !/^[a-z0-9-]{1,40}$/.test(row.id) || rowIds.has(row.id) ||
        title === null || title.length > 120 || !Array.isArray(row.items) || row.items.length > MAX_ROW_ITEMS) {
      return fail(res, 400, `Each row needs a unique id, a title up to 120 characters and at most ${MAX_ROW_ITEMS} products.`);
    }
    rowIds.add(row.id);
    cleanLayout.push({ id: row.id, title, items: row.items });
  }
  const keys = cleanLayout.flatMap((row) => row.items);
  if (keys.some((key) => typeof key !== "string" || !ANY_KEY.test(key))) {
    return fail(res, 400, "Invalid product reference.");
  }
  if (new Set(keys).size !== keys.length) return fail(res, 400, "A product can appear in only one row.");

  const existing = await NewYearPage.findOne({ key: KEY }).lean();

  const replaceDeleted = req.body.deletedProducts !== undefined;
  const deleted = replaceDeleted ? req.body.deletedProducts : (existing?.deletedProducts || []);
  if (!Array.isArray(deleted) || deleted.length > 1000 || deleted.some((key) => typeof key !== "string" || !HIDEABLE_KEY.test(key)) ||
      new Set(deleted).size !== deleted.length) {
    return fail(res, 400, "Invalid deleted product list.");
  }
  if (deleted.some((key) => keys.includes(key))) return fail(res, 400, "A deleted product cannot also be in a row.");

  const replaceCustoms = req.body.customProducts !== undefined;
  let customs = (existing?.customProducts || []).map((c) => ({ _id: String(c._id), name: c.name, image: c.image }));
  if (replaceCustoms) {
    const list = req.body.customProducts;
    if (!Array.isArray(list) || list.length > 200) return fail(res, 400, "Provide at most 200 custom products.");
    const seen = new Set();
    customs = [];
    for (const item of list) {
      const name = typeof item?.name === "string" ? item.name.trim() : "";
      const image = uploadHref(item?.image);
      if (typeof item?.id !== "string" || !/^[a-f0-9]{24}$/.test(item.id) || seen.has(item.id) || !name || name.length > 120 || !image) {
        return fail(res, 400, "Each custom product needs a name (up to 120 characters) and an uploaded image.");
      }
      seen.add(item.id);
      customs.push({ _id: item.id, name, image });
    }
  }
  const customIds = new Set(customs.map((c) => c._id));
  if (keys.some((key) => key.startsWith("custom:") && !customIds.has(key.slice(7)))) {
    return fail(res, 400, "A selected custom product no longer exists.");
  }

  const replaceOverrides = req.body.productOverrides !== undefined;
  let overrides = existing?.productOverrides || [];
  if (replaceOverrides) {
    const list = req.body.productOverrides;
    if (!Array.isArray(list) || list.length > 1000) return fail(res, 400, "Provide at most 1000 product edits.");
    const seen = new Set();
    overrides = [];
    for (const item of list) {
      const name = typeof item?.name === "string" ? item.name.trim() : undefined;
      const image = item?.image === undefined ? undefined : uploadHref(item.image);
      if (typeof item?.id !== "string" || !HIDEABLE_KEY.test(item.id) || seen.has(item.id) ||
          (item.name !== undefined && (!name || name.length > 120)) ||
          (item.image !== undefined && !image) || (name === undefined && image === undefined)) {
        return fail(res, 400, "Each product edit needs a unique product reference, a name up to 120 characters or an uploaded image.");
      }
      seen.add(item.id);
      overrides.push({ id: item.id, ...(name !== undefined ? { name } : {}), ...(image ? { image } : {}) });
    }
  }

  if (!["default", "custom", "none"].includes(bannerMode)) return fail(res, 400, "Invalid banner mode.");
  let cleanBanner;
  if (bannerMode === "custom") {
    const href = uploadHref(banner?.url);
    if (!href) return fail(res, 400, "Upload a banner first.");
    if (!Number.isInteger(banner.width) || !Number.isInteger(banner.height) ||
        banner.width < 1 || banner.height < 1 || banner.width > 20000 || banner.height > 20000 ||
        typeof banner.alt !== "string" || !banner.alt.trim() || banner.alt.length > 500) {
      return fail(res, 400, "Use an uploaded banner, valid dimensions and descriptive alternative text.");
    }
    cleanBanner = { url: href, width: banner.width, height: banner.height, alt: banner.alt.trim() };
  }

  const ids = keys.filter((key) => key.startsWith("product:")).map((key) => key.slice(8));
  const legacySlugs = keys.filter((key) => key.startsWith("legacy:")).map((key) => key.slice(7));
  const products = ids.length || legacySlugs.length ? await Product.find({
    $or: [{ _id: { $in: ids } }, { slug: { $in: legacySlugs } }],
  }).lean() : [];
  const foundIds = new Set(products.map((product) => String(product._id)));
  if (ids.some((id) => !foundIds.has(id)) || products.some((p) => !toCard(p).available || !p.images?.[0]?.url)) {
    return fail(res, 400, "Selected catalogue products must be published, active and have an image. Remove unavailable products before saving.");
  }
  if (products.some((product) => ids.includes(String(product._id)) && keys.includes(`legacy:${product.slug}`))) {
    return fail(res, 400, "The same product is selected from both the existing collection and catalogue.");
  }

  await NewYearPage.findOneAndUpdate({ key: KEY }, {
    $set: {
      layout: cleanLayout, bannerMode,
      ...(cleanBanner ? { banner: cleanBanner } : {}),
      ...(replaceCustoms ? { customProducts: customs } : {}),
      ...(replaceDeleted ? { deletedProducts: deleted } : {}),
      ...(replaceOverrides ? { productOverrides: overrides } : {}),
    },
    ...(!cleanBanner ? { $unset: { banner: 1 } } : {}),
  }, { upsert: true, new: true, runValidators: true });
  if (replaceCustoms || replaceOverrides) {
    const keep = new Set([...customs.map((c) => c.image), ...overrides.map((p) => p.image), cleanBanner?.url].filter(Boolean));
    for (const old of [...(existing?.customProducts || []), ...(existing?.productOverrides || [])]) {
      const href = uploadHref(old.image);
      if (href && !keep.has(old.image)) {
        await fs.unlink(path.join("uploads", "new-year", path.basename(new URL(href).pathname))).catch(() => {});
      }
    }
  }
  return ok(res, await readPage(true));
}));

router.post("/upload", verifyToken, requireRole(...writeRoles), upload.single("file"), handleUploadError, (req, res) => {
  if (!req.file) return fail(res, 400, "Choose an image.");
  return ok(res, { url: `${process.env.BASE_URL.replace(/\/$/, "")}/uploads/new-year/${req.file.filename}` });
});

module.exports = router;
