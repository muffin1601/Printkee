export const SITE_URL = "https://printkee.com";

export const BUSINESS = {
  name: "Printkee",
  legalName: "MF Global Services",
  phoneDisplay: "+91 88009 04543",
  phoneE164: "+918800904543",
  email: "sales@printkee.com",
  address: {
    street: "F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1",
    locality: "New Delhi",
    region: "Delhi",
    postalCode: "110020",
    country: "India",
  },
};

export const absoluteUrl = (path = "") =>
  `${SITE_URL}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;

export const absoluteTitle = (title) => ({ absolute: title });

export const brandedTitle = (title) =>
  `${String(title || "").replace(/\s*\|\s*Printkee\s*$/i, "").trim()} | Printkee`;
