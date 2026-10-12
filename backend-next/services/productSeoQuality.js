const textOnly = (value = "") =>
  String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const hasText = (value) => textOnly(value).length > 0;

const hasMeaningfulValue = (value) => {
  if (Array.isArray(value)) return value.some(hasMeaningfulValue);
  if (value && typeof value === "object") return Object.values(value).some(hasMeaningfulValue);
  return hasText(value);
};

function evaluateProductSeo(productInput = {}) {
  const product = typeof productInput.toObject === "function"
    ? productInput.toObject()
    : productInput;
  const issues = [];
  const description = [product.description?.short, product.description?.long]
    .map(textOnly)
    .filter(Boolean)
    .join(" ");
  const wordCount = description.split(/\s+/).filter(Boolean).length;

  const attributes = product.attributes || {};
  const detailCount = [
    attributes.material,
    attributes.size,
    attributes.color,
    attributes.dimensions,
    attributes.weight,
    attributes.gsm,
    attributes.capacity,
    attributes.printingMethods,
    attributes.brandingAreas,
    attributes.packaging,
    attributes.moq,
    attributes.leadTime,
    attributes.sampleAvailability,
    attributes.customization,
    attributes.careInstructions,
    product.features,
    product.idealFor,
    product.specifications,
    product.additionalInfo,
  ].filter(hasMeaningfulValue).length;

  if (product.isActive !== true) issues.push("Product is not active");
  if (product.seo?.indexable === false) issues.push("Product is explicitly marked noindex");
  if (wordCount < 80) issues.push("Product needs at least 80 words of product-specific description");
  if (detailCount < 3) issues.push("Product needs at least three useful product-specific details");
  if (textOnly(product.seo?.metaTitle).length < 30) issues.push("SEO title needs at least 30 useful characters");
  if (textOnly(product.seo?.metaDescription).length < 70) issues.push("Meta description needs at least 70 useful characters");
  if (!(product.images || []).some((image) => image?.url && textOnly(image.altText).length >= 8)) {
    issues.push("Product needs a descriptive primary image");
  }

  return {
    eligible: issues.length === 0,
    issues,
    wordCount,
    detailCount,
  };
}

module.exports = { evaluateProductSeo, textOnly };
