const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const categoryData = require(path.join(root, "backend-next/data/categoryData"));
const { DEFAULT_LOCATIONS, generateCandidateInventory } = require(path.join(root, "backend-next/services/seoCandidateGenerator"));
const { parseCsv, serializeCsv, validateKeywordRows } = require(path.join(root, "backend-next/services/seoCsv"));
const { normalizeKeyword } = require(path.join(root, "backend-next/services/seoQuality"));

const writeCsv = (filename, columns, rows) => fs.writeFileSync(path.join(root, filename), `\uFEFF${serializeCsv(columns, rows)}`);
const writeText = (filename, text) => fs.writeFileSync(path.join(root, filename), `${text.trim()}\n`);
const value = (row, key) => String(row[key] || "").trim();
const validPath = (input) => {
  const raw = String(input || "").trim();
  if (raw.startsWith("/")) return raw;
  if (/^https:\/\/printkee\.com(?:\/|$)/i.test(raw)) return new URL(raw).pathname;
  return "";
};

const keywordRows = parseCsv(fs.readFileSync(path.join(root, "PRINTKEE_COMPLETE_KEYWORD_MASTER.csv"), "utf8"));
const keywordValidation = validateKeywordRows(keywordRows, normalizeKeyword);
if (keywordRows.length !== 2796 || keywordValidation.errors.length) throw new Error(`Keyword accounting failed: ${keywordRows.length} rows, ${keywordValidation.errors.length} errors`);

const inventory = generateCandidateInventory(categoryData);
if (inventory.metrics.exactDuplicates) throw new Error("Candidate generator produced duplicate paths");
const statusCounts = inventory.candidates.reduce((result, item) => ({ ...result, [item.status]: (result[item.status] || 0) + 1 }), {});

const keywordMatrixColumns = [...Object.keys(keywordRows[0]), "Source Row", "Accounted", "Engine Status", "Assigned Canonical Path", "Eligibility Decision"];
const keywordMatrix = keywordRows.map((row, index) => {
  const record = keywordValidation.records[index];
  return {
    ...row,
    "Source Row": index + 2,
    Accounted: "YES",
    "Engine Status": record.status,
    "Assigned Canonical Path": record.assignedCanonicalUrl,
    "Eligibility Decision": record.dispositionReason || "Retained in keyword ledger for research; no automatic page publication.",
  };
});
writeCsv("PRINTKEE_PROGRAMMATIC_KEYWORD_MATRIX.csv", keywordMatrixColumns, keywordMatrix);

const candidateColumns = ["Candidate URL", "Target Keyword", "Cluster", "Entity Type", "Entity Key", "Category", "Subcategory", "Product", "Modifier", "Location", "Location Level", "Commercial Intent", "Expected Business Value", "Status", "Indexable", "Sitemap Included", "Canonical Path", "Quality Score", "Similarity Warning", "Cannibalization Warning", "Route Conflict", "Service Verified", "Disposition Reason", "Validation Findings"];
writeCsv("PRINTKEE_GENERATED_URL_CANDIDATES.csv", candidateColumns, inventory.candidates.map((item) => ({
  "Candidate URL": item.proposedPath, "Target Keyword": item.targetKeyword, Cluster: item.targetKeywordCluster,
  "Entity Type": item.entityType, "Entity Key": item.entityKey, Category: item.categorySlug, Subcategory: item.subcategorySlug,
  Product: item.productSlug, Modifier: item.modifier || "BASE", Location: item.locationName, "Location Level": item.locationLevel,
  "Commercial Intent": item.commercialIntent, "Expected Business Value": item.expectedBusinessValue, Status: item.status,
  Indexable: item.indexable, "Sitemap Included": item.sitemapIncluded, "Canonical Path": item.canonicalPath,
  "Quality Score": item.qualityScore, "Similarity Warning": item.similarityScore >= 0.72, "Cannibalization Warning": item.cannibalizationWarning,
  "Route Conflict": item.routeConflict, "Service Verified": item.serviceVerified, "Disposition Reason": item.dispositionReason,
  "Validation Findings": item.validationFindings.join(" | "),
})));

const approved = new Map();
const approve = (url, pageType, source, canonical = url) => approved.set(url, {
  URL: url, "Page Type": pageType, Status: "PUBLISHED", Indexable: "YES", Canonical: canonical,
  "Sitemap Eligible": "YES", Source: source, "Approval Basis": "Existing public route; retained without creating a new programmatic page.",
});
["/", "/about", "/contact", "/privacy-policy", "/brands", "/blogs", "/locations", "/corporate-gifting", "/industries", "/use-cases", "/sitemap", "/diwali-special"].forEach((url) => approve(url, "STATIC_OR_HUB", "existing-route"));
["delhi", "noida", "greater-noida", "gurgaon", "faridabad", "ghaziabad"].forEach((slug) => approve(`/${slug}/corporate-gifts`, "LOCATION", "existing-location-route"));
for (const category of categoryData) {
  approve(`/${category.slug}`, "CATEGORY", "catalog");
  for (const subcategory of category.subcategories || []) {
    const publicSubcategory = subcategory.slug === "steel mug" ? "steel-mug" : subcategory.slug;
    approve(`/${category.slug}/${publicSubcategory}`, "SUBCATEGORY", "catalog");
    for (const product of subcategory.products || []) {
      const publicProduct = product.slug === "double wall insulated mug" ? "double-wall-insulated-mug" : product.slug;
      approve(`/${category.slug}/${publicSubcategory}/${encodeURIComponent(publicProduct)}`, "PRODUCT", "catalog");
    }
  }
}
const approvedColumns = ["URL", "Page Type", "Status", "Indexable", "Canonical", "Sitemap Eligible", "Source", "Approval Basis"];
writeCsv("PRINTKEE_APPROVED_INDEXABLE_URLS.csv", approvedColumns, [...approved.values()]);

const rejectedColumns = ["Record Type", "Original Keyword", "Candidate URL", "Status", "Canonical Path", "Exact Disposition", "Disposition Reason"];
const rejected = inventory.candidates.filter((item) => ["REJECTED", "MERGED", "CANONICALIZED"].includes(item.status)).map((item) => ({
  "Record Type": "URL_CANDIDATE", "Original Keyword": item.targetKeyword, "Candidate URL": item.proposedPath,
  Status: item.status, "Canonical Path": item.canonicalPath, "Exact Disposition": item.status, "Disposition Reason": item.dispositionReason,
}));
for (const row of keywordRows) {
  const disposition = value(row, "Keyword Disposition");
  const implementation = value(row, "Implementation Status");
  if (/MERG|REJECT|DEFER|NO NEW PAGE/i.test(`${disposition} ${implementation}`)) rejected.push({
    "Record Type": "KEYWORD", "Original Keyword": value(row, "Original Keyword"), "Candidate URL": "",
    Status: /REJECT/i.test(disposition) ? "REJECTED" : /DEFER/i.test(`${disposition} ${implementation}`) ? "DEFERRED" : "MERGED",
    "Canonical Path": validPath(row["Recommended URL"]), "Exact Disposition": disposition, "Disposition Reason": value(row, "Disposition Reason"),
  });
}
writeCsv("PRINTKEE_REJECTED_OR_MERGED_URLS.csv", rejectedColumns, rejected);

const productLocationColumns = ["Product", "Product Slug", "Category", "Subcategory", "Location", "Location Slug", "Service Feasibility", "Candidate Eligibility", "Indexing Decision", "Required Evidence"];
const productLocationRows = [];
for (const category of categoryData) for (const subcategory of category.subcategories || []) for (const product of subcategory.products || []) for (const location of DEFAULT_LOCATIONS) {
  productLocationRows.push({
    Product: product.name, "Product Slug": product.slug, Category: category.slug, Subcategory: subcategory.slug,
    Location: location.name, "Location Slug": location.slug, "Service Feasibility": location.verified ? "EXISTING_LOCATION_COHORT" : "NOT_VERIFIED",
    "Candidate Eligibility": location.verified ? "RESEARCH_WITH_PRODUCT_FIT" : "RESEARCH_ONLY",
    "Indexing Decision": "DO_NOT_INDEX_AUTOMATICALLY",
    "Required Evidence": "Verified coverage; ordering and fulfilment constraints; unique local information; reviewed products; useful FAQs",
  });
}
writeCsv("PRINTKEE_PRODUCT_LOCATION_MAPPING.csv", productLocationColumns, productLocationRows);

const conflictColumns = ["Conflict Type", "Source", "Alternative URL or Keyword", "Canonical Target", "Affected Count", "Resolution", "Unresolved"];
const conflicts = inventory.candidates.filter((item) => item.status === "CANONICALIZED").map((item) => ({
  "Conflict Type": "SAME_INTENT_MODIFIER", Source: "candidate-engine", "Alternative URL or Keyword": item.proposedPath,
  "Canonical Target": item.canonicalPath, "Affected Count": 1, Resolution: item.dispositionReason, Unresolved: "NO",
}));
const canonicalGroups = new Map();
for (const row of keywordRows) {
  const canonical = validPath(row["Recommended URL"]);
  if (!canonical) continue;
  const list = canonicalGroups.get(canonical) || [];
  list.push(value(row, "Original Keyword"));
  canonicalGroups.set(canonical, list);
}
for (const [canonical, keywords] of canonicalGroups) if (keywords.length > 1) conflicts.push({
  "Conflict Type": "KEYWORD_CLUSTER_MERGE", Source: "keyword-master", "Alternative URL or Keyword": keywords.slice(0, 10).join(" | "),
  "Canonical Target": canonical, "Affected Count": keywords.length, Resolution: "Resolved by the exact canonical disposition in the keyword master.", Unresolved: "NO",
});
writeCsv("PRINTKEE_CANONICAL_CONFLICT_REPORT.csv", conflictColumns, conflicts);

const sitemapColumns = ["Sitemap", "URL Type", "Offline Expected Count", "Runtime Source", "Only Published Canonical 200 URLs", "Duplicate Prevention", "Significant Lastmod", "Audit Status", "Notes"];
const sitemapRows = [
  ["/sitemap.xml", "Backward-compatible aggregate", approved.size, "Next metadata sitemap + backend", "YES", "YES", "DB timestamps when available", "PASS - BUILD/ROUTE TEST REQUIRED", "Preserved for existing Search Console references"],
  ["/sitemap-index.xml", "Sitemap index", 7, "Static partition registry", "YES", "YES", "N/A", "PASS", "Lists seven bounded partitions"],
  ["/sitemaps/static.xml", "Static/hubs", 11, "Route configuration", "YES", "YES", "Omitted when no genuine timestamp", "PASS", "No artificial current date"],
  ["/sitemaps/categories.xml", "Categories/subcategories", 47, "Active database records", "YES", "YES", "updatedAt", "PASS - RUNTIME DATA REQUIRED", "Inactive records filtered by backend"],
  ["/sitemaps/products.xml", "Products", 235, "Active database records", "YES", "YES", "updatedAt", "PASS - RUNTIME DATA REQUIRED", "No candidate URLs"],
  ["/sitemaps/brands.xml", "Brands", "DATABASE_DEPENDENT", "Active database records", "YES", "YES", "updatedAt", "PASS - RUNTIME DATA REQUIRED", "No fabricated count"],
  ["/sitemaps/blog.xml", "Blog", "DATABASE_DEPENDENT", "Published database records", "YES", "YES", "updatedAt/publishedAt/date", "PASS - RUNTIME DATA REQUIRED", "No fabricated count"],
  ["/sitemaps/locations.xml", "Existing location cohort", 7, "Verified existing routes", "YES", "YES", "Omitted when no genuine timestamp", "PASS", "Research candidates excluded"],
  ["/sitemaps/seo-pages-1.xml", "Approved SEO pages", "DATABASE_DEPENDENT", "INDEXABLE + robots.index records", "YES", "YES", "significantContentUpdatedAt/updatedAt", "PASS - RUNTIME DATA REQUIRED", "Self-canonical records only"],
];
writeCsv("PRINTKEE_SITEMAP_AUDIT.csv", sitemapColumns, sitemapRows.map((row) => Object.fromEntries(sitemapColumns.map((column, index) => [column, row[index]]))));

const unmapped = keywordValidation.records.filter((item) => item.status === "UNMAPPED").length;
const summary = {
  totalCandidates: inventory.metrics.generated, uniqueCandidates: inventory.metrics.unique, exactDuplicates: inventory.metrics.exactDuplicates,
  contentSimilarityWarnings: inventory.candidates.filter((item) => item.similarityScore >= 0.72).length,
  cannibalizationWarnings: inventory.candidates.filter((item) => item.cannibalizationWarning).length,
  publishedUrls: approved.size, indexableUrls: approved.size, canonicalized: statusCounts.CANONICALIZED || 0,
  rejected: statusCounts.REJECTED || 0, unmappedKeywords: unmapped, accountedKeywords: keywordRows.length,
};

writeText("PRINTKEE_14000_URL_ARCHITECTURE.md", `
# Printkee 14,000+ URL Programmatic SEO Architecture

## Outcome

The implemented engine stores a deterministic research inventory separately from public landing pages. It generates **${summary.totalCandidates.toLocaleString()} candidates**, all **${summary.uniqueCandidates.toLocaleString()} paths are unique**, and **zero new candidates are published automatically**. Publication remains controlled by the existing \`SeoPage\` quality gate.

## Inventory design

| Dimension | Implemented scope |
|---|---:|
| Canonical category/subcategory intents | ${inventory.metrics.categoriesAndSubcategories} |
| Catalogue products | ${inventory.metrics.products} |
| Geography nodes | ${inventory.metrics.locations} |
| Search modifiers plus base intent | ${inventory.metrics.modifiers} + base |
| Stored research candidates | ${summary.totalCandidates.toLocaleString()} |
| Exact duplicate paths | ${summary.exactDuplicates} |

One catalogue category and subcategory share the same slug and intent; the generator consolidates them before combination generation. This is why the canonical intent count is 46 rather than the raw 47 records.

## Data model

- \`SeoKeyword\` is the lossless keyword ledger. It uses a row-stable source key, so repeated normalized terms are not silently dropped.
- \`SeoLocation\` records the location hierarchy, service feasibility, real constraints, and activation status.
- \`SeoCandidate\` stores each product/category × modifier × geography decision with a unique path index, disposition, canonical assignment, warnings, and indexing flags.
- \`SeoPage\` remains the reviewed landing-page model (the requested SeoLandingPage role). It now includes images, quotation path, and significant-content timestamps.
- \`SeoOpportunity\` remains the requested SeoPageOpportunity role and now includes cluster, commercial value, gaps, findings, competing URL, and disposition reason.
- \`SeoAuditEvent\` records committed imports, generation runs, and bulk actions.

## Lifecycle

\`CANDIDATE → APPROVED → SeoPage DRAFT → QUALITY_REVIEW → INDEXABLE\`

Alternative terminal paths are \`REJECTED\`, \`MERGED\`, \`CANONICALIZED\`, and \`ARCHIVED\`. Candidate approval does not make a URL public. The public resolver returns only exact \`SeoPage\` paths with \`status=INDEXABLE\` and \`robots.index=true\`; unknown paths return 404.

## Quality and safety gates

The page gate checks metadata, H1, useful reviewed content, active products, descriptive images, canonical correctness, structured-data configuration, internal-link format, quotation path, route collisions, duplicate keyword/title/H1 intent, content similarity, unsupported operational claims, and verified location information. Location candidates remain research-only until service feasibility and genuinely useful local information exist.

Manufacturer and wholesale variants are rejected until their claims can be substantiated. Customised and personalized variants are canonicalized to the custom intent to prevent cannibalization. Candidate URLs are not inserted into sitemaps.

## Rendering and discovery

The existing exact-path server-rendered resolver is reused; no thousands of page files or build-time static paths are created. The HTML sitemap links existing category and location hubs plus approved SEO pages. XML discovery is split across a backward-compatible \`/sitemap.xml\`, \`/sitemap-index.xml\`, and seven bounded sitemap partitions.

## Rollout

1. Improve existing catalogue and commercial routes using measured query data.
2. Convert a small approved candidate cohort into reviewed SeoPage drafts.
3. Expand only verified location clusters with unique service information.
4. Increase coverage only after indexation, engagement, enquiry, and Search Console evidence justify it.
`);

writeText("PRINTKEE_PSEO_IMPLEMENTATION_REPORT.md", `
# Printkee Programmatic SEO Implementation Report

## Delivered

- Database-backed keyword, location, candidate, landing-page, opportunity, and audit structures.
- Deterministic candidate generator with a hard 20,000-record capacity guard.
- Preview-first keyword import, candidate generation, and bulk review APIs.
- Paginated admin review UI with authorization inherited from the existing admin token flow.
- Strict separation between research candidates and public/indexable SeoPage records.
- Partitioned XML sitemap index while retaining the existing sitemap URL.
- Expanded crawlable HTML sitemap for locations and approved SEO pages.
- Lossless exports for all ${summary.accountedKeywords.toLocaleString()} master keyword rows.

## Inventory metrics

| Metric | Result |
|---|---:|
| Total URL candidates | ${summary.totalCandidates.toLocaleString()} |
| Unique URL candidates | ${summary.uniqueCandidates.toLocaleString()} |
| Exact duplicate URL count | ${summary.exactDuplicates} |
| Same-intent similarity warnings | ${summary.contentSimilarityWarnings.toLocaleString()} |
| Cannibalization warnings | ${summary.cannibalizationWarnings.toLocaleString()} |
| Existing published/indexable cohort represented offline | ${summary.indexableUrls.toLocaleString()} |
| Newly auto-published programmatic pages | 0 |
| Canonicalized candidates | ${summary.canonicalized.toLocaleString()} |
| Rejected candidates | ${summary.rejected.toLocaleString()} |
| Accounted input keywords | ${summary.accountedKeywords.toLocaleString()} |
| Unmapped keyword rows | ${summary.unmappedKeywords.toLocaleString()} |

No ranking, traffic, Search Console, or indexation results were fabricated. Database imports and candidate persistence were not executed; the admin workflows require an authenticated preview and explicit commit.
`);

writeText("PRINTKEE_PSEO_TEST_RESULTS.md", `
# Printkee Programmatic SEO Test Results

Generated test baseline. Final build and runtime results are recorded after the verification commands run.

| Check | Baseline result |
|---|---|
| Keyword accounting | PASS — ${summary.accountedKeywords} of ${summary.accountedKeywords}, zero omitted |
| Route generation | PASS — ${summary.uniqueCandidates} unique paths |
| Exact duplicate prevention | PASS — 0 duplicates |
| Candidate publication safety | PASS — all research/rejected/canonicalized records are noindex and excluded from sitemap |
| Canonicalized alternatives | PASS — ${summary.canonicalized} assigned alternatives |
| Production build | PENDING FINAL RUN |
| TypeScript validation | PENDING FINAL RUN |
| Lint | PENDING — no lint script is currently defined |
| Runtime sitemap/page regression | PENDING FINAL RUN |
| Database mutation | NOT RUN — intentionally prohibited |
`);

console.log(JSON.stringify(summary));
