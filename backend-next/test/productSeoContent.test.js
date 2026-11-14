const test = require("node:test");
const assert = require("node:assert/strict");
const { sourceFacts, validateEditedContent, editedSnapshot, generateDraft, normalize, similarity, editorialFlags } = require("../services/productSeoContent");

const product = {
  name: "A5 Branded Notebook", slug: "a5-branded-notebook",
  category: { name: "Office and Writing" }, subcategory: { name: "Notebooks" },
  description: { short: "Old copy", long: "<p>Old copy</p>" },
  attributes: { material: "PU", size: ["A5"], color: ["Black"] },
  specifications: [{ key: "HSN Code", value: "123" }, { key: "Page count", value: "100" }],
  images: [{ url: "/notebook.webp", altText: "A5 black notebook" }],
  seo: { metaTitle: "Old notebook title", metaDescription: "Old meta" },
};

test("AI input uses product facts and omits existing marketing copy and tax fields", () => {
  const facts = sourceFacts(product);
  assert.equal(facts["attributes.material"], "PU");
  assert.equal(facts["specifications.1"], "Page count: 100");
  assert.equal(facts["specifications.0"], undefined);
  assert.equal(JSON.stringify(facts).includes("Old copy"), false);
  assert.ok(editorialFlags["classic-steel-coffee-mug"]);
});

test("preview validation and update snapshot do not mutate the product", () => {
  const input = {
    description: { short: "This black A5 notebook has a PU cover for office use.",
      long: "The A5 notebook has a black PU cover and a documented page count of 100. Its listed size and cover material let buyers compare it with other notebooks before requesting a quotation." },
    seo: { metaTitle: "Black A5 PU Notebook for Office Use", metaDescription: "Review the black A5 PU notebook with a documented 100-page count for office use." },
    imageAlts: ["Black A5 PU notebook cover"],
  };
  assert.deepEqual(validateEditedContent(product, input), []);
  const next = editedSnapshot(product, input);
  assert.equal(next.images[0].altText, "Black A5 PU notebook cover");
  assert.match(next.description.long, /^<p>/);
  assert.equal(product.description.long, "<p>Old copy</p>");
  assert.equal(normalize("<p>Black &amp; white</p>"), normalize("Black white"));
  assert.ok(similarity("A black A5 PU notebook for offices", "A black A5 PU notebook for offices") > 0.99);
  assert.ok(similarity("A black A5 PU notebook for offices", "A green ceramic mug for home use") < 0.2);
  assert.ok(validateEditedContent(product, { ...input, imageAlts: ["short"] }).length);
});

test("AI draft is returned for review without a write", async () => {
  const previous = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "test-key";
  let request;
  const mockFetch = async (url, options) => {
    request = { url, ...options };
    return { ok: true, json: async () => ({ status: "completed", output: [{ content: [{ type: "output_text", text: JSON.stringify({
      shortDescription: "Black A5 PU notebook with 100 pages.",
      longDescription: "This black A5 notebook has a PU cover and 100 pages.",
      metaTitle: "Black A5 PU Notebook for Office Use",
      metaDescription: "Black A5 PU notebook with 100 pages for office use.",
      usedFactKeys: ["attributes.material", "specifications.1"], reviewNotes: [], insufficientFacts: false,
    }) }] }] }) };
  };
  try {
    const draft = await generateDraft(product, ["product.name", "attributes.material", "specifications.1"], mockFetch);
    assert.equal(draft.sourceFacts["attributes.material"], "PU");
    assert.match(draft.notice, /Draft only/);
    assert.equal(request.url, "https://api.openai.com/v1/responses");
    assert.equal(JSON.parse(request.body).store, false);
    assert.equal(JSON.parse(request.body).input.includes("Old copy"), false);
  } finally {
    if (previous === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previous;
  }
});
