const publicReplacements = [
  [/\bBPA[- ]free\b/gi, "plastic"],
];

export function neutralizeUnverifiedClaims(value) {
  if (typeof value === "string") {
    return publicReplacements.reduce(
      (text, [pattern, replacement]) => text.replace(pattern, replacement),
      value
    );
  }

  if (Array.isArray(value)) return value.map(neutralizeUnverifiedClaims);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, neutralizeUnverifiedClaims(item)])
    );
  }

  return value;
}
