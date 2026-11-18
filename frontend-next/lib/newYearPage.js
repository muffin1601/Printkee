import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { defaultSettings, resolvePageSections } from "../data/new-year-page-layout";

export async function getNewYearPage() {
  let settings = defaultSettings();
  let products = [];
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (api) {
    try {
      const response = await fetch(`${api.replace(/\/$/, "")}/new-year-page`, {
        cache: "no-store", signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`API returned ${response.status}`);
      const data = await response.json();
      if (data.settings?.rows) settings = data.settings;
      products = data.products || [];
    } catch (error) {
      console.error("New Year page settings unavailable; using existing collection:", error.message);
    }
  }
  const defaultBanner = "/printkee-new-yea-banner.webp";
  const banner = settings.bannerMode === "custom" ? settings.banner
    : settings.bannerMode === "none" ? null
      : existsSync(path.join(process.cwd(), "public", defaultBanner)) ? {
        url: defaultBanner, width: 2048, height: 768,
        alt: "Welcome New Year 2027. Customized merchandise for your team, clients and events: corporate gifts, branded apparel, drinkware and event merchandise. Explore New Year Collection.",
      } : null;
  return { sections: resolvePageSections(settings, products), banner };
}
