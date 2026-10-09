const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const SeoPage = require("../models/SeoPage");
const SeoLocation = require("../models/SeoLocation");

const SITE_URL = "https://printkee.com";
const RESERVED_ROOTS = new Set([
  "admin", "api", "login", "search", "customize", "brands", "blogs", "blog", "contact",
  "about", "privacy-policy", "sitemap", "locations", "diwali-special", "_next",
]);

const normalizePath = (value = "") => {
  let path = String(value).trim().toLowerCase();
  try {
    if (/^https?:\/\//.test(path)) path = new URL(path).pathname;
  } catch {}
  path = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return path === "/" ? "/" : path.replace(/\/{2,}/g, "/");
};

const normalizeKeyword = (value = "") =>
  String(value).toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();

const textOnly = (value = "") =>
  String(value).replace(/<[^>]+>/g, " ").replace(/&[a-z0-9#]+;/gi, " ").replace(/\s+/g, " ").trim();

const pageText = (page) => [
  page.h1,
  page.intro,
  page.bodyContent,
  ...(page.contentBlocks || []).flatMap((block) => [block.heading, block.body]),
  ...(page.faqs || []).flatMap((faq) => [faq.question, faq.answer]),
].map(textOnly).filter(Boolean).join(" ");

const tokens = (value) => new Set(
  textOnly(value).toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2)
);

const similarity = (left, right) => {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let intersection = 0;
  for (const token of a) if (b.has(token)) intersection += 1;
  return intersection / (a.size + b.size - intersection);
};

async function findRouteCollision(path) {
  const parts = normalizePath(path).slice(1).split("/").filter(Boolean);
  if (!parts.length || RESERVED_ROOTS.has(parts[0])) return `Path is reserved by the application: /${parts[0] || ""}`;

  const category = await Category.findOne({ slug: parts[0] }).select("_id slug").lean();
  if (!category) return null;
  if (parts.length === 1) return "Path is already owned by a catalog category";

  const subcategory = await Subcategory.findOne({ category: category._id, slug: parts[1] }).select("_id slug").lean();
  if (!subcategory) return null;
  if (parts.length === 2) return "Path is already owned by a catalog subcategory";

  const product = await Product.findOne({ category: category._id, subcategory: subcategory._id, slug: parts[2] }).select("_id").lean();
  return product ? "Path is already owned by a catalog product" : null;
}

async function evaluateSeoPage(input, ignoreId = null) {
  const page = typeof input.toObject === "function" ? input.toObject() : input;
  const path = normalizePath(page.path);
  const expectedCanonical = `${SITE_URL}${path}`;
  const issues = [];
  const content = pageText(page);
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  if (!page.seoTitle || textOnly(page.seoTitle).length < 30) issues.push("SEO title must contain at least 30 useful characters");
  if (!page.metaDescription || textOnly(page.metaDescription).length < 70) issues.push("Meta description must contain at least 70 useful characters");
  if (!page.h1 || textOnly(page.h1).length < 10) issues.push("A unique H1 is required");
  if (!page.intro || textOnly(page.intro).length < 80) issues.push("Intro must contain at least 80 useful characters");
  if (wordCount < 250) issues.push("Page needs at least 250 words of useful reviewed content");
  if (!(page.featuredProducts || []).length) issues.push("At least one relevant product is required");
  if (!page.quotationPath || normalizePath(page.quotationPath) !== "/contact") issues.push("A valid quotation path to /contact is required");
  if (!(page.images || []).some((image) => image?.url && textOnly(image.altText).length >= 8)) issues.push("At least one descriptive image with useful alt text is required");
  if (!page.primaryKeyword) issues.push("Primary keyword is required");
  if (!page.parentPath && page.pageType !== "HUB") issues.push("A meaningful parent page is required");
  if (![...(page.relatedCategories || []), ...(page.relatedPages || []), ...(page.relatedLocations || [])].some((link) => link?.url)) {
    issues.push("At least one contextual internal link is required");
  }
  if (!page.canonicalUrl || page.canonicalUrl !== expectedCanonical) issues.push(`Canonical must be ${expectedCanonical}`);
  if (!page.schemaOptions || !Object.values(page.schemaOptions).some(Boolean)) issues.push("At least one applicable structured-data type must be enabled");

  const allLinks = [...(page.relatedCategories || []), ...(page.relatedPages || []), ...(page.relatedLocations || [])];
  for (const link of allLinks) {
    if (!link?.url || (!String(link.url).startsWith("/") && !String(link.url).startsWith(`${SITE_URL}/`))) {
      issues.push("Internal links must use a valid Printkee path");
      break;
    }
  }
  const unsupportedClaimPattern = /\b(our|printkee(?:'s)?)\s+(factory|office|local team|manufacturing unit)\b|\bguaranteed\s+(delivery|turnaround)\b/i;
  if (unsupportedClaimPattern.test(content)) issues.push("Content contains an unsupported operational or local-service claim");

  if (page.location) {
    const locationText = normalizeKeyword(page.location);
    if (locationText && !normalizeKeyword(`${page.seoTitle} ${page.h1} ${content}`).includes(locationText)) {
      issues.push("Location page content does not meaningfully identify its target location");
    }
    const location = await SeoLocation.findOne({
      $or: [{ slug: page.location }, { name: new RegExp(`^${String(page.location).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") }],
      activeStatus: "ACTIVE", serviceFeasibility: "VERIFIED",
    }).select("locationSpecificInformation").lean();
    if (!location || textOnly(location.locationSpecificInformation).length < 40) {
      issues.push("Location needs verified service feasibility and meaningful location-specific information");
    }
  }

  if ((page.featuredProducts || []).length) {
    const productIds = (page.featuredProducts || []).map((item) => item?._id || item).filter((item) => String(item).match(/^[a-f0-9]{24}$/i));
    const activeProductCount = await Product.countDocuments({ _id: { $in: productIds }, isActive: true });
    if (activeProductCount !== productIds.length || !productIds.length) issues.push("All featured products must exist and be active");
  }

  const routeCollision = await findRouteCollision(path);
  if (routeCollision) issues.push(routeCollision);

  const collisionQuery = {
    $or: [
      { path },
      { normalizedPrimaryKeyword: normalizeKeyword(page.primaryKeyword) },
      { seoTitle: page.seoTitle },
      { h1: page.h1 },
    ],
  };
  if (ignoreId) collisionQuery._id = { $ne: ignoreId };
  const collision = await SeoPage.findOne(collisionQuery).select("path primaryKeyword seoTitle h1").lean();
  if (collision) issues.push(`Potential path, title, H1 or keyword cannibalization with ${collision.path}`);

  const comparisonQuery = ignoreId ? { _id: { $ne: ignoreId }, status: { $ne: "ARCHIVED" } } : { status: { $ne: "ARCHIVED" } };
  const comparisons = await SeoPage.find(comparisonQuery).select("path h1 intro bodyContent contentBlocks faqs").lean();
  let maximumSimilarity = 0;
  let similarPagePath = "";
  for (const candidate of comparisons) {
    const score = similarity(content, pageText(candidate));
    if (score > maximumSimilarity) {
      maximumSimilarity = score;
      similarPagePath = candidate.path;
    }
  }
  if (maximumSimilarity >= 0.72) issues.push(`Content similarity ${Math.round(maximumSimilarity * 100)}% with ${similarPagePath}`);

  const deductions = Math.min(100, issues.length * 12 + (wordCount < 400 ? 8 : 0));
  return {
    eligible: issues.length === 0,
    score: Math.max(0, 100 - deductions),
    issues,
    wordCount,
    maximumSimilarity,
    similarPagePath,
    normalizedPath: path,
    normalizedPrimaryKeyword: normalizeKeyword(page.primaryKeyword),
    expectedCanonical,
  };
}

module.exports = { evaluateSeoPage, findRouteCollision, normalizeKeyword, normalizePath, pageText, similarity };
