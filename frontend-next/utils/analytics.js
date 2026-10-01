export const trackEvent = (name, parameters = {}) => {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, parameters);
};

export const trackContactClick = (method, location) =>
  trackEvent("contact_click", { contact_method: method, link_location: location });

export const trackQuoteRequest = (location) =>
  trackEvent("quote_request", { link_location: location });
