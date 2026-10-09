const { normalizePath } = require("./seoQuality");

const DEFAULT_MODIFIERS = [
  "custom", "customised", "personalized", "branded", "bulk", "wholesale", "corporate",
  "promotional", "logo-printed", "supplier", "vendor", "manufacturer", "online",
];

const DEFAULT_LOCATIONS = [
  { name: "India", slug: "india", level: "COUNTRY", verified: false },
  { name: "Delhi", slug: "delhi", level: "CITY", verified: true },
  { name: "Noida", slug: "noida", level: "CITY", verified: true },
  { name: "Greater Noida", slug: "greater-noida", level: "CITY", verified: true },
  { name: "Gurgaon", slug: "gurgaon", level: "CITY", verified: true },
  { name: "Faridabad", slug: "faridabad", level: "CITY", verified: true },
  { name: "Ghaziabad", slug: "ghaziabad", level: "CITY", verified: true },
  { name: "Haryana", slug: "haryana", level: "STATE", verified: false },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", level: "STATE", verified: false },
  { name: "Maharashtra", slug: "maharashtra", level: "STATE", verified: false },
  { name: "Karnataka", slug: "karnataka", level: "STATE", verified: false },
  { name: "Tamil Nadu", slug: "tamil-nadu", level: "STATE", verified: false },
  { name: "Telangana", slug: "telangana", level: "STATE", verified: false },
  { name: "West Bengal", slug: "west-bengal", level: "STATE", verified: false },
  { name: "Mumbai", slug: "mumbai", level: "CITY", verified: false },
  { name: "Pune", slug: "pune", level: "CITY", verified: false },
  { name: "Bengaluru", slug: "bengaluru", level: "CITY", verified: false },
  { name: "Hyderabad", slug: "hyderabad", level: "CITY", verified: false },
  { name: "Chennai", slug: "chennai", level: "CITY", verified: false },
  { name: "Kolkata", slug: "kolkata", level: "CITY", verified: false },
  { name: "Ahmedabad", slug: "ahmedabad", level: "CITY", verified: false },
  { name: "Lucknow", slug: "lucknow", level: "CITY", verified: false },
];

const EXISTING_LOCATION_PATHS = new Set([
  "/delhi/corporate-gifts", "/noida/corporate-gifts", "/greater-noida/corporate-gifts",
  "/gurgaon/corporate-gifts", "/faridabad/corporate-gifts", "/ghaziabad/corporate-gifts",
]);

const cleanSlug = (value = "") => String(value)
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const displayPhrase = (value = "") => cleanSlug(value).replace(/-/g, " ");

function dispositionFor({ modifier, proposedPath, location, entity }) {
  if (EXISTING_LOCATION_PATHS.has(proposedPath)) {
    return {
      status: "PUBLISHED", indexable: true, sitemapIncluded: true, canonicalPath: proposedPath,
      priority: 90, reason: "Existing indexable Printkee location page; retained as the canonical target.",
    };
  }
  if (["manufacturer", "wholesale"].includes(modifier)) {
    return {
      status: "REJECTED", indexable: false, sitemapIncluded: false, canonicalPath: "", priority: 10,
      reason: `Rejected until Printkee can substantiate the '${modifier}' business claim for this product and location.`,
    };
  }
  if (["customised", "personalized"].includes(modifier)) {
    const canonicalModifier = "custom";
    return {
      status: "CANONICALIZED", indexable: false, sitemapIncluded: false,
      canonicalPath: normalizePath(`/${location.slug}/${canonicalModifier}-${entity.slug}`), priority: 25,
      reason: `Merged into the custom-intent canonical to prevent spelling and same-intent cannibalization.`,
    };
  }
  return {
    status: "CANDIDATE", indexable: false, sitemapIncluded: false, canonicalPath: "",
    priority: location.verified ? 45 : 25,
    reason: location.verified
      ? "Research candidate only; requires unique content, product validation, editorial review, and explicit approval."
      : "Research candidate only; service coverage and location-specific usefulness are not yet verified.",
  };
}

function makeCandidate({ entity, location, modifier = "", productMode = false }) {
  const modifierSlug = cleanSlug(modifier);
  const keywordRoot = `${modifierSlug ? `${displayPhrase(modifierSlug)} ` : ""}${displayPhrase(entity.slug)}`;
  const candidateSlug = `${modifierSlug ? `${modifierSlug}-` : ""}${entity.slug}`;
  const proposedPath = productMode
    ? normalizePath(`/india/${entity.subcategorySlug}/${candidateSlug}`)
    : normalizePath(`/${location.slug}/${candidateSlug}`);
  const disposition = dispositionFor({ modifier: modifierSlug, proposedPath, location, entity });
  const findings = [];
  if (!location.verified) findings.push("Location service feasibility is not verified");
  if (["supplier", "vendor"].includes(modifierSlug)) findings.push("Business relationship claim requires evidence");
  if (!disposition.indexable) findings.push("Not approved for indexing or sitemap inclusion");
  return {
    proposedPath,
    targetKeyword: `${keywordRoot} in ${location.name}`,
    targetKeywordCluster: entity.categorySlug || entity.slug,
    entityType: entity.type,
    entityKey: `${entity.type}:${entity.slug}`,
    entityName: entity.name,
    categorySlug: entity.categorySlug || (entity.type === "CATEGORY" ? entity.slug : ""),
    subcategorySlug: entity.subcategorySlug || (entity.type === "SUBCATEGORY" ? entity.slug : ""),
    productSlug: entity.type === "PRODUCT" ? entity.slug : "",
    modifier: modifierSlug,
    locationSlug: location.slug,
    locationName: location.name,
    locationLevel: location.level,
    commercialIntent: "COMMERCIAL",
    expectedBusinessValue: location.verified ? "MEDIUM" : "UNKNOWN",
    canonicalPath: disposition.canonicalPath,
    competingUrl: "",
    contentGaps: ["Verified service information", "Unique location guidance", "Reviewed product selection", "Genuine FAQs"],
    validationFindings: findings,
    dispositionReason: disposition.reason,
    priority: disposition.priority,
    qualityScore: disposition.indexable ? 100 : 0,
    similarityScore: ["customised", "personalized"].includes(modifierSlug) ? 1 : 0,
    routeConflict: false,
    cannibalizationWarning: ["customised", "personalized"].includes(modifierSlug),
    serviceVerified: Boolean(location.verified),
    hasApplicableProducts: true,
    hasUniqueLocationInformation: disposition.indexable,
    status: disposition.status,
    indexable: disposition.indexable,
    sitemapIncluded: disposition.sitemapIncluded,
  };
}

function flattenCatalog(categoryData) {
  const entitiesBySlug = new Map();
  const products = [];
  for (const category of categoryData) {
    const categorySlug = cleanSlug(category.slug || category.name);
    entitiesBySlug.set(categorySlug, { type: "CATEGORY", name: category.name, slug: categorySlug, categorySlug });
    for (const subcategory of category.subcategories || []) {
      const subcategorySlug = cleanSlug(subcategory.slug || subcategory.name);
      // A category and subcategory occasionally share one slug and one search intent.
      // Keep one canonical entity instead of manufacturing two identical URL targets.
      if (!entitiesBySlug.has(subcategorySlug)) {
        entitiesBySlug.set(subcategorySlug, { type: "SUBCATEGORY", name: subcategory.name, slug: subcategorySlug, categorySlug, subcategorySlug });
      }
      for (const product of subcategory.products || []) {
        products.push({
          type: "PRODUCT", name: product.name, slug: cleanSlug(product.slug || product.name),
          categorySlug, subcategorySlug,
        });
      }
    }
  }
  return { entities: [...entitiesBySlug.values()], products };
}

function generateCandidateInventory(categoryData, options = {}) {
  const locations = options.locations || DEFAULT_LOCATIONS;
  const modifiers = options.modifiers || DEFAULT_MODIFIERS;
  const capacity = options.capacity || 20000;
  const { entities, products } = flattenCatalog(categoryData);
  const raw = [];

  for (const entity of entities) {
    for (const location of locations) {
      raw.push(makeCandidate({ entity, location }));
      for (const modifier of modifiers) raw.push(makeCandidate({ entity, location, modifier }));
    }
  }
  const india = locations.find((location) => location.slug === "india") || locations[0];
  for (const entity of products) {
    raw.push(makeCandidate({ entity, location: india, productMode: true }));
    raw.push(makeCandidate({ entity, location: india, modifier: "custom", productMode: true }));
  }

  if (raw.length > capacity) throw new Error(`Generated ${raw.length} candidates, exceeding capacity ${capacity}`);
  const byPath = new Map();
  const duplicates = [];
  for (const candidate of raw) {
    if (byPath.has(candidate.proposedPath)) duplicates.push(candidate.proposedPath);
    else byPath.set(candidate.proposedPath, candidate);
  }
  return {
    candidates: [...byPath.values()],
    duplicatePaths: duplicates,
    metrics: {
      generated: raw.length,
      unique: byPath.size,
      exactDuplicates: duplicates.length,
      categoriesAndSubcategories: entities.length,
      products: products.length,
      locations: locations.length,
      modifiers: modifiers.length,
    },
  };
}

module.exports = {
  DEFAULT_LOCATIONS, DEFAULT_MODIFIERS, EXISTING_LOCATION_PATHS, cleanSlug,
  flattenCatalog, generateCandidateInventory, makeCandidate,
};
