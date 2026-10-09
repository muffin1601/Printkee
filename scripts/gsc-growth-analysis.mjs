import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(root, "seo-data", "gsc-last-3-months");
const outputDir = path.join(root, "seo", "03-keywords-and-search-data");
await mkdir(outputDir, { recursive: true });

function parseCsv(text) {
  const rows = [];
  let row = [], value = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { value += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else value += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(value); value = ""; }
    else if (char === "\n") { row.push(value.replace(/\r$/, "")); rows.push(row); row = []; value = ""; }
    else value += char;
  }
  if (value.length || row.length) { row.push(value.replace(/\r$/, "")); rows.push(row); }
  const headers = rows.shift();
  return rows.filter((item) => item.some(Boolean)).map((item) => Object.fromEntries(headers.map((header, index) => [header, item[index] ?? ""])));
}

function csv(rows, columns) {
  const escape = (value) => {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  return `${columns.join(",")}\n${rows.map((row) => columns.map((column) => escape(row[column])).join(",")).join("\n")}\n`;
}

const clean = (value) => value.toLowerCase().trim().replace(/\s+/g, " ");
const pct = (value) => Number(String(value).replace("%", ""));

const clusters = [
  { name: "Files & Folders", test: /\b(files?|folders?|folio|document folder|certificate folder|conference folder|presentation folder)\b/i, url: "https://printkee.com/office-and-writing/file-and-folder" },
  { name: "Aprons", test: /\baprons?\b/i, url: "https://printkee.com/apparel-and-accessories/aprons" },
  { name: "Lanyards & ID Cards", test: /\b(lanyards?|id cards?|identity cards?|badge holders?)\b/i, url: "https://printkee.com/office-and-writing/lanyard-and-id-card" },
  { name: "Employee Welcome Kits", test: /\b(welcome kits?|onboarding kits?|joining kits?|joinee kits?|employee kits?)\b/i, url: "https://printkee.com/collection/welcome-kits" },
  { name: "Ties", test: /\b(ties|tie|neckties?)\b/i, url: "https://printkee.com/apparel-and-accessories/ties" },
  { name: "Tote Bags", test: /\b(tote bags?|shopping bags?)\b/i, url: "https://printkee.com/bags-and-travel/tote-bags" },
  { name: "Winter Wear", test: /\b(winter wear|winter jackets?|jackets?|hoodies|sweatshirts?|staff jackets?)\b/i, url: "https://printkee.com/apparel-and-accessories/winter-wear" },
  { name: "Duffle Bags", test: /\b(duffle|duffel)\b/i, url: "https://printkee.com/bags-and-travel/duffle-bags" },
  { name: "Backpacks & Bags", test: /\b(backpacks?|laptop bags?|travel bags?|promotional bags?)\b/i, url: "https://printkee.com/bags-and-travel/backpacks" },
  { name: "Wireless Charging", test: /\b(wireless charg(?:er|ing)|magsafe charg)/i, url: "https://printkee.com/technology-accessories/wireless-charging" },
  { name: "Power Banks", test: /\bpower ?banks?\b/i, url: "https://printkee.com/technology-accessories/power-banks" },
  { name: "Custom Apparel", test: /\b(t-?shirts?|polo|uniforms?|corporate shirts?|apparel)\b/i, url: "https://printkee.com/apparel-and-accessories" },
  { name: "Event Merchandise", test: /\b(event merchandise|conference merchandise|conference giveaways?|event giveaways?|expo merchandise|conference gifts?)\b/i, url: "https://printkee.com/collection" },
  { name: "Sustainable Gifts", test: /\b(eco[- ]?friendly|sustainable|cork|jute|reusable)\b/i, url: "https://printkee.com/eco-products" },
  { name: "Diwali Gifting", test: /\bdiwali\b/i, url: "https://printkee.com/diwali-special" },
  { name: "Corporate & Promotional Merchandise", test: /\b(corporate gift|corporate gifting|promotional products?|promotional merchandise|branded merchandise|custom merchandise|corporate merchandise|business gifts?|employee gifting|client gifting)\b/i, url: "https://printkee.com/" },
];

const commercialModifiers = /\b(custom|customi[sz]ed|branded|printed|printing|logo|bulk|supplier|manufacturer|corporate|promotional|buy|order|company|delhi|india|near me|gifts?)\b/i;
const brandNoise = /\b(logo png|png logo|wiki|wikipedia|which country|owner|founder|meaning|customer care|service center|hsn(?: code)?|gst(?: code)?)\b/i;
const knownBrand = /\b(portronics|boat|adidas|puma|wildcraft|american tourister|noise|jack & jones|swiss military|rare rabbit|fuzo)\b/i;
const brandSlugs = { portronics: "portronics", boat: "boat", adidas: "adidas", puma: "puma", wildcraft: "wildcraft", "american tourister": "american-tourister", noise: "noise", "jack & jones": "jack-and-jones", "swiss military": "swiss-military", "rare rabbit": "rare-rabbit", fuzo: "fuzo" };

function classify(query) {
  const brand = Object.keys(brandSlugs).find((name) => query.toLowerCase().includes(name));
  if (/\bprintkee\b/i.test(query)) return { cluster: "Printkee branded", intent: "Navigational", relevance: "Medium", url: "https://printkee.com/" };
  if (brand && /\blogo(?:\s+(?:official|png))?\b/i.test(query)) {
    return { cluster: "Brand/navigation noise", intent: "Navigational / informational", relevance: "Low", url: "" };
  }
  if (brand && /corporate|gift|bulk|branded|supplier/i.test(query) && !brandNoise.test(query)) {
    return { cluster: "Brand corporate gifting", intent: "Commercial", relevance: "High", url: `https://printkee.com/brands/${brandSlugs[brand]}` };
  }
  const matched = clusters.find((cluster) => cluster.test.test(query));
  if (brandNoise.test(query) || (knownBrand.test(query) && !/corporate|gift|bulk|branded|supplier/i.test(query))) {
    return { cluster: "Brand/navigation noise", intent: "Navigational / informational", relevance: "Low", url: "" };
  }
  if (matched) {
    const intent = /delhi|noida|gurgaon|gurugram|faridabad|ghaziabad|near me/i.test(query) ? "Local commercial" : "Commercial";
    return { cluster: matched.name, intent, relevance: "High", url: matched.url };
  }
  if (commercialModifiers.test(query)) return { cluster: "Other commercial products", intent: "Commercial", relevance: "Medium", url: "" };
  if (/\b(how|what|why|ideas|guide|types|difference|meaning)\b/i.test(query)) return { cluster: "Informational research", intent: "Informational", relevance: "Medium", url: "" };
  return { cluster: "Unclassified / low signal", intent: "Ambiguous", relevance: "Low", url: "" };
}

function tier({ impressions, position, ctr, relevance }) {
  if (relevance === "Low") return "Deprioritize";
  if (position >= 8 && position <= 20 && impressions >= 5) return "Tier 1";
  if (position > 20 && position <= 40 && impressions >= 10) return "Tier 2";
  if (position < 8 && impressions >= 10 && ctr < 3) return "Tier 3";
  return "Monitor";
}

function score({ impressions, position, ctr, relevance }) {
  const relevanceWeight = relevance === "High" ? 1 : relevance === "Medium" ? 0.55 : 0.1;
  const positionWeight = position >= 8 && position <= 20 ? 1 : position > 20 && position <= 40 ? 0.7 : position < 8 ? 0.45 : 0.2;
  const ctrGap = Math.max(0.25, 1 - Math.min(ctr, 10) / 10);
  return Math.round(Math.log10(impressions + 1) * 100 * relevanceWeight * positionWeight * ctrGap);
}

const queries = parseCsv(await readFile(path.join(dataDir, "Queries.csv"), "utf8"));
const pages = parseCsv(await readFile(path.join(dataDir, "Pages.csv"), "utf8"));

const baseline = queries.map((row) => {
  const query = row["Top queries"];
  const classification = classify(query);
  const metrics = { impressions: Number(row.Impressions), position: Number(row.Position), ctr: pct(row.CTR), relevance: classification.relevance };
  return {
    Query: query, Clicks: Number(row.Clicks), Impressions: metrics.impressions, CTR: row.CTR, Position: metrics.position,
    Cluster: classification.cluster, Intent: classification.intent, "Commercial Relevance": classification.relevance,
    "Target URL": classification.url, "Opportunity Tier": tier({ ...metrics, relevance: classification.relevance }),
    "Opportunity Score": score({ ...metrics, relevance: classification.relevance }),
  };
});

await writeFile(path.join(outputDir, "SEO_GSC_BASELINE.csv"), csv(baseline, ["Query","Clicks","Impressions","CTR","Position","Cluster","Intent","Commercial Relevance","Target URL","Opportunity Tier"]));
await writeFile(path.join(outputDir, "SEO_GSC_OPPORTUNITIES.csv"), csv([...baseline].sort((a, b) => b["Opportunity Score"] - a["Opportunity Score"]), ["Query","Clicks","Impressions","CTR","Position","Cluster","Intent","Commercial Relevance","Target URL","Opportunity Tier","Opportunity Score"]));

const pageQueryMap = baseline.map((row) => ({
  "Target URL": row["Target URL"], Query: row.Query, Clicks: row.Clicks, Impressions: row.Impressions, CTR: row.CTR, Position: row.Position,
  Intent: row.Intent, "Commercial Relevance": row["Commercial Relevance"],
  "Primary/Secondary": row["Commercial Relevance"] === "High" && row["Target URL"] ? "Primary cluster" : "Secondary or unassigned",
  "Recommended Action": row["Commercial Relevance"] === "Low" ? "Do not optimize commercial pages for this query" : row["Opportunity Tier"] === "Tier 1" ? "Strengthen the mapped page and protect canonical ownership" : row["Opportunity Tier"] === "Tier 2" ? "Improve intent coverage and internal authority" : row["Opportunity Tier"] === "Tier 3" ? "Test a clearer title and description after recording the baseline" : "Monitor in GSC before changing content",
}));
await writeFile(path.join(outputDir, "SEO_GSC_PAGE_QUERY_MAP.csv"), csv(pageQueryMap, ["Target URL","Query","Clicks","Impressions","CTR","Position","Intent","Commercial Relevance","Primary/Secondary","Recommended Action"]));

const pageClusters = new Map(clusters.map((item) => [item.url, item.name]));
const focus = new Map([
  ["https://printkee.com/office-and-writing/file-and-folder", ["Missing procurement-oriented file/folder detail", "Expand one canonical page for office files and folder variants", "1"]],
  ["https://printkee.com/apparel-and-accessories/aprons", ["High impressions, low CTR and page-two average position", "Align title/H1 and add useful apron printing buying content", "1"]],
  ["https://printkee.com/office-and-writing/lanyard-and-id-card", ["High impressions with weak average position", "Clarify lanyard-printing intent, buyer inputs and available formats", "1"]],
  ["https://printkee.com/collection/welcome-kits", ["Commercial page-two visibility", "Expand onboarding-kit composition, personalization and requirement guidance", "1"]],
  ["https://printkee.com/apparel-and-accessories/ties", ["Near-page-one commercial variants", "Improve title/H1 and buying information without splitting variants", "2"]],
  ["https://printkee.com/bags-and-travel/tote-bags", ["Page-two visibility", "Clarify use cases, material confirmation and branding inputs", "2"]],
  ["https://printkee.com/apparel-and-accessories/winter-wear", ["Strong existing visibility", "Protect rankings and improve requirement guidance conservatively", "2"]],
  ["https://printkee.com/technology-accessories/wireless-charging", ["Page-one strength", "Protect intent; remove unsupported specifications and improve enquiry guidance", "3"]],
  ["https://printkee.com/bags-and-travel/duffle-bags", ["Page-one strength", "Protect current rankings; make only restrained CTR/content improvements", "3"]],
  ["https://printkee.com/", ["High impressions but broad average position", "Strengthen broad corporate gifting and branded merchandise pathways", "2"]],
]);

const priorityPages = pages.map((row) => {
  const url = row["Top pages"];
  const details = focus.get(url);
  const position = Number(row.Position), impressions = Number(row.Impressions), ctr = pct(row.CTR);
  const genericPriority = position >= 8 && position <= 20 && impressions >= 100 ? "2" : position > 20 && position <= 40 && impressions >= 250 ? "2" : position <= 10 && impressions >= 100 && ctr < 2 ? "3" : "Monitor";
  return { URL: url, Clicks: Number(row.Clicks), Impressions: impressions, CTR: row.CTR, Position: position,
    "Primary Cluster": pageClusters.get(url) || (url === "https://printkee.com/" ? "Corporate & Promotional Merchandise" : "Existing page"),
    "Current Issue": details?.[0] || "No focused change supported by the current page-level export",
    "Recommended Action": details?.[1] || "Monitor; use a combined query-page GSC export before rewriting",
    Priority: details?.[2] || genericPriority };
}).sort((a, b) => String(a.Priority).localeCompare(String(b.Priority)) || b.Impressions - a.Impressions);
await writeFile(path.join(outputDir, "SEO_PRIORITY_PAGES.csv"), csv(priorityPages, ["URL","Clicks","Impressions","CTR","Position","Primary Cluster","Current Issue","Recommended Action","Priority"]));

const universe = `
corporate gifts|Corporate & Promotional Merchandise
corporate gifting|Corporate & Promotional Merchandise
corporate gifts India|Corporate & Promotional Merchandise
corporate gifting India|Corporate & Promotional Merchandise
corporate gifts Delhi|Corporate & Promotional Merchandise
corporate gifting Delhi|Corporate & Promotional Merchandise
corporate gifts Delhi NCR|Corporate & Promotional Merchandise
corporate gifting company|Corporate & Promotional Merchandise
corporate gifting company India|Corporate & Promotional Merchandise
corporate gifting company Delhi|Corporate & Promotional Merchandise
corporate gift supplier|Corporate & Promotional Merchandise
corporate gifts supplier India|Corporate & Promotional Merchandise
corporate gifting supplier Delhi|Corporate & Promotional Merchandise
customized corporate gifts|Corporate & Promotional Merchandise
custom corporate gifts|Corporate & Promotional Merchandise
branded corporate gifts|Corporate & Promotional Merchandise
premium corporate gifts|Corporate & Promotional Merchandise
bulk corporate gifts|Corporate & Promotional Merchandise
corporate gifts for employees|Corporate & Promotional Merchandise
corporate gifts for clients|Corporate & Promotional Merchandise
employee gifting|Corporate & Promotional Merchandise
client gifting|Corporate & Promotional Merchandise
business gifts|Corporate & Promotional Merchandise
business gifting solutions|Corporate & Promotional Merchandise
promotional products|Corporate & Promotional Merchandise
promotional products India|Corporate & Promotional Merchandise
promotional products Delhi|Corporate & Promotional Merchandise
promotional products supplier|Corporate & Promotional Merchandise
promotional products manufacturer|Corporate & Promotional Merchandise
custom promotional products|Corporate & Promotional Merchandise
customized promotional products|Corporate & Promotional Merchandise
branded promotional products|Corporate & Promotional Merchandise
corporate promotional products|Corporate & Promotional Merchandise
promotional merchandise|Corporate & Promotional Merchandise
promotional merchandise India|Corporate & Promotional Merchandise
promotional merchandise supplier|Corporate & Promotional Merchandise
branded merchandise|Corporate & Promotional Merchandise
branded merchandise India|Corporate & Promotional Merchandise
custom merchandise|Corporate & Promotional Merchandise
custom merchandise India|Corporate & Promotional Merchandise
corporate merchandise|Corporate & Promotional Merchandise
corporate merchandise India|Corporate & Promotional Merchandise
bulk merchandise supplier|Corporate & Promotional Merchandise
employee welcome kit|Employee Welcome Kits
employee welcome kits|Employee Welcome Kits
employee onboarding kit|Employee Welcome Kits
employee onboarding kits|Employee Welcome Kits
new employee welcome kit|Employee Welcome Kits
employee joining kit|Employee Welcome Kits
corporate joining kit|Employee Welcome Kits
welcome kit for employees|Employee Welcome Kits
custom employee welcome kits|Employee Welcome Kits
branded employee kits|Employee Welcome Kits
new joinee kit|Employee Welcome Kits
employee joining gifts|Employee Welcome Kits
custom t shirts|Custom Apparel
corporate t shirts|Custom Apparel
custom polo t shirts|Custom Apparel
bulk t shirt printing|Custom Apparel
custom t shirts with logo|Custom Apparel
branded apparel|Custom Apparel
corporate uniforms|Custom Apparel
custom uniforms|Custom Apparel
custom jackets|Winter Wear
branded jackets|Winter Wear
custom hoodies|Winter Wear
corporate hoodies|Winter Wear
employee apparel|Custom Apparel
staff uniforms|Custom Apparel
custom aprons|Aprons
apron printing|Aprons
customized aprons|Aprons
customised aprons|Aprons
printed aprons|Aprons
aprons with logo|Aprons
branded aprons|Aprons
bulk apron printing|Aprons
custom aprons India|Aprons
apron printing Delhi|Aprons
apron with logo|Aprons
apron with logo printed|Aprons
custom files|Files & Folders
customized files|Files & Folders
customized files for office|Files & Folders
custom file folders|Files & Folders
custom printed folders|Files & Folders
custom printed file folders India|Files & Folders
corporate folders|Files & Folders
conference folders|Files & Folders
certificate folders|Files & Folders
presentation folders|Files & Folders
document folders with logo|Files & Folders
office file printing|Files & Folders
file folder printing|Files & Folders
branded office files|Files & Folders
custom lanyards|Lanyards & ID Cards
lanyard printing|Lanyards & ID Cards
bulk lanyard printing|Lanyards & ID Cards
ID card lanyard printing|Lanyards & ID Cards
custom ID card lanyards|Lanyards & ID Cards
lanyards with logo|Lanyards & ID Cards
corporate lanyards|Lanyards & ID Cards
event lanyards|Lanyards & ID Cards
office lanyards|Lanyards & ID Cards
custom duffle bags|Duffle Bags
customized duffle bag|Duffle Bags
customised duffle bag|Duffle Bags
duffle bag customized|Duffle Bags
branded duffle bags|Duffle Bags
duffle bag with logo|Duffle Bags
corporate duffle bags|Duffle Bags
duffle bag manufacturers Delhi|Duffle Bags
bulk duffle bags|Duffle Bags
custom backpacks|Backpacks & Bags
custom backpack India|Backpacks & Bags
custom backpacks with logo|Backpacks & Bags
branded backpacks|Backpacks & Bags
corporate backpacks|Backpacks & Bags
custom laptop bags|Backpacks & Bags
corporate laptop bags|Backpacks & Bags
custom tote bags|Tote Bags
branded tote bags|Tote Bags
promotional bags|Backpacks & Bags
custom travel bags|Backpacks & Bags
custom wireless charger|Wireless Charging
customized wireless charger|Wireless Charging
personalised wireless charger|Wireless Charging
branded wireless charger|Wireless Charging
wireless charger with logo|Wireless Charging
printed power bank|Power Banks
custom power bank|Power Banks
branded power bank|Power Banks
corporate tech gifts|Wireless Charging
technology corporate gifts|Wireless Charging
custom tech gifts|Wireless Charging
branded electronics|Wireless Charging
corporate electronics gifts|Wireless Charging
custom winter jackets|Winter Wear
corporate jackets|Winter Wear
branded jackets|Winter Wear
staff jackets|Winter Wear
employee jackets|Winter Wear
logo printed jackets|Winter Wear
custom hoodies|Winter Wear
corporate winter wear|Winter Wear
company winter uniforms|Winter Wear
customised winter wear|Winter Wear
custom ties|Ties
custom printed ties|Ties
custom printed ties India|Ties
corporate ties|Ties
ties with company logo|Ties
custom neckties|Ties
branded ties|Ties
eco friendly corporate gifts|Sustainable Gifts
sustainable corporate gifts|Sustainable Gifts
eco friendly promotional products|Sustainable Gifts
cork corporate gifts|Sustainable Gifts
custom cork coasters|Sustainable Gifts
printed cork coasters|Sustainable Gifts
eco friendly merchandise|Sustainable Gifts
sustainable promotional products|Sustainable Gifts
event merchandise|Event Merchandise
event merchandise India|Event Merchandise
conference merchandise|Event Merchandise
conference giveaways|Event Merchandise
event giveaways|Event Merchandise
custom event merchandise|Event Merchandise
expo merchandise|Event Merchandise
conference gifts|Event Merchandise
event promotional products|Event Merchandise
corporate Diwali gifts|Diwali Gifting
corporate Diwali gifts India|Diwali Gifting
corporate Diwali gifts Delhi|Diwali Gifting
corporate Diwali gifts Delhi NCR|Diwali Gifting
Diwali gifts for employees|Diwali Gifting
Diwali gifts for clients|Diwali Gifting
bulk Diwali gifts|Diwali Gifting
customized Diwali gifts|Diwali Gifting
corporate Diwali hampers|Diwali Gifting
employee Diwali hampers|Diwali Gifting`.trim().split("\n").map((line) => line.split("|"));

const byQuery = new Map(baseline.map((row) => [clean(row.Query), row]));
const uniqueUniverse = [...new Map(universe.map(([keyword, clusterName]) => [clean(keyword), [keyword, clusterName]])).values()];
const competitive = uniqueUniverse.map(([keyword, clusterName]) => {
  const match = byQuery.get(clean(keyword));
  const target = clusters.find((item) => item.name === clusterName)?.url || "https://printkee.com/";
  const isHead = clusterName === "Corporate & Promotional Merchandise";
  return { Keyword: keyword, Cluster: clusterName, Intent: "Commercial", "Current GSC Position": match?.Position ?? "Not present in top 1,000 export", "Target URL": target,
    "Existing/New": "Existing page", Priority: match?.["Opportunity Tier"] || (isHead ? "Tier 4" : "Monitor"),
    "Content Required": match ? "Align existing page with observed query intent" : "Validate demand in GSC; build depth on the existing canonical page",
    "Authority Required": isHead || !match ? "High" : match.Position > 10 ? "Medium" : "Protect existing authority",
    Notes: match ? `${match.Impressions} impressions; ${match.Clicks} clicks; ${match.CTR} CTR` : "No position inferred; absence from this export is not proof of no impressions" };
});
await writeFile(path.join(outputDir, "SEO_COMPETITIVE_KEYWORD_MAP.csv"), csv(competitive, ["Keyword","Cluster","Intent","Current GSC Position","Target URL","Existing/New","Priority","Content Required","Authority Required","Notes"]));

const counts = baseline.reduce((acc, row) => { acc[row["Opportunity Tier"]] = (acc[row["Opportunity Tier"]] || 0) + 1; return acc; }, {});
console.log(JSON.stringify({ queries: baseline.length, pages: pages.length, pageOne: baseline.filter((row) => row.Position <= 10).length, positions11to20: baseline.filter((row) => row.Position > 10 && row.Position <= 20).length, tiers: counts }, null, 2));
