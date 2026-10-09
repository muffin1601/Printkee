export const trackEvent = (name, parameters = {}) => {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, parameters);
};

const safeText = (value, maxLength = 100) => {
  const text = String(value || "").trim().slice(0, maxLength);
  if (!text || /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.test(text)) return undefined;
  if (/(?:\+?\d[\s().-]*){8,}/.test(text)) return undefined;
  return text;
};

const item = ({ id, name, category, subcategory }) => ({
  item_id: safeText(id),
  item_name: safeText(name),
  item_category: safeText(category),
  item_category2: safeText(subcategory),
});

export const trackContactClick = (method, location) => {
  const parameters = { contact_method: safeText(method), link_location: safeText(location) };
  trackEvent("contact", parameters);
  trackEvent("contact_click", parameters);
};

export const trackQuoteRequest = (location) =>
  trackEvent("quote_request", { link_location: location });

export const trackViewItem = (product) =>
  trackEvent("view_item", { items: [item(product)] });

export const trackSelectItem = (product, listName = "product_listing") =>
  trackEvent("select_item", { item_list_name: safeText(listName), items: [item(product)] });

export const trackSearch = (searchTerm, resultCount) => {
  const safeSearchTerm = safeText(searchTerm);
  if (!safeSearchTerm) return;
  trackEvent("search", {
    search_term: safeSearchTerm,
    result_count: Number.isFinite(resultCount) ? resultCount : undefined,
  });
};
