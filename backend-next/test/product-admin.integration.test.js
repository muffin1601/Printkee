const test = require("node:test");
const assert = require("node:assert/strict");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

process.env.JWT_SECRET = "isolated-test-secret";
process.env.BASE_URL = "http://localhost:5031";

const Product = require("../models/product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const productRoutes = require("../routes/productRoutes");

let mongo;
let app;
let token;
let category;
let subcategory;

test.before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  await Promise.all([Product.syncIndexes(), Category.syncIndexes(), Subcategory.syncIndexes()]);
  category = await Category.create({ name: "Integration Category", slug: "integration-category" });
  subcategory = await Subcategory.create({ name: "Integration Subcategory", slug: "integration-subcategory", category: category._id });
  await Category.findByIdAndUpdate(category._id, { $addToSet: { subcategories: subcategory._id } });

  token = jwt.sign({ email: "test@printkee.local", role: "super_admin" }, process.env.JWT_SECRET);
  app = express();
  app.use(express.json());
  app.use("/api/product", productRoutes);
  app.use((err, req, res, next) => {
    res.status(err.code === 11000 ? 409 : 500).json({ message: err.message });
  });
});

test.after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("creates and retrieves 1, 5, 6, 10, 50 and 100 products without blank-SKU collisions", async () => {
  const checkpoints = new Set([1, 5, 6, 10, 50, 100]);
  for (let index = 1; index <= 100; index += 1) {
    const response = await request(app)
      .post("/api/product/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Test Product ${index}`,
        slug: `test-product-${index}`,
        sku: "",
        price: index,
        category: category._id.toString(),
        subcategory: subcategory._id.toString(),
        status: "published",
      });
    assert.equal(response.status, 201, response.text);
    assert.equal(response.body.sku, undefined);
    if (checkpoints.has(index)) assert.equal(await Product.countDocuments(), index);
  }

  const list = await request(app)
    .get("/api/product/all?limit=100")
    .set("Authorization", `Bearer ${token}`);
  assert.equal(list.status, 200, list.text);
  assert.equal(list.body.totalItems, 100);
  assert.equal(list.body.items.length, 100);

  const refreshedSubcategory = await Subcategory.findById(subcategory._id).lean();
  assert.equal(refreshedSubcategory.products.length, 100);
});

test("rejects duplicate slugs and unauthorized creation with actionable status codes", async () => {
  const duplicate = await request(app)
    .post("/api/product/create")
    .set("Authorization", `Bearer ${token}`)
    .send({ name: "Duplicate", slug: "test-product-1", price: 20, category: category._id, subcategory: subcategory._id });
  assert.equal(duplicate.status, 409);
  assert.match(duplicate.body.message, /slug/i);

  const unauthorized = await request(app).post("/api/product/create").send({});
  assert.equal(unauthorized.status, 401);
});

test("accepts concurrent product creation without duplicate requests", async () => {
  const responses = await Promise.all(Array.from({ length: 10 }, (_, offset) => request(app)
    .post("/api/product/create")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: `Concurrent Product ${offset}`,
      slug: `concurrent-product-${offset}`,
      sku: "",
      price: 25,
      category: category._id,
      subcategory: subcategory._id,
    })));
  assert.ok(responses.every((response) => response.status === 201));
});

test("bulk price and publication operations update 1,000 selected products", async () => {
  const fixtures = Array.from({ length: 890 }, (_, offset) => ({
    name: `Bulk Fixture ${offset}`,
    slug: `bulk-fixture-${offset}`,
    price: 10,
    category: category._id,
    subcategory: subcategory._id,
    status: "published",
    isActive: true,
  }));
  await Product.insertMany(fixtures);
  const ids = (await Product.find().select("_id").lean()).map((product) => product._id.toString());
  assert.equal(ids.length, 1000);
  const price = await request(app)
    .post("/api/product/bulk")
    .set("Authorization", `Bearer ${token}`)
    .send({ ids, action: "price", changes: { operation: "increase_percent", value: 10 } });
  assert.equal(price.status, 200, price.text);
  assert.equal(price.body.matched, 1000);

  const unpublish = await request(app)
    .post("/api/product/bulk")
    .set("Authorization", `Bearer ${token}`)
    .send({ ids, action: "unpublish" });
  assert.equal(unpublish.status, 200, unpublish.text);
  assert.equal(await Product.countDocuments({ status: "draft", isActive: false }), 1000);
});

test("CSV import preview validates rows and export neutralizes spreadsheet formulas", async () => {
  const csv = [
    "sku,name,slug,category,subcategory,price,status",
    `,Imported Product,imported-product,${category._id},${subcategory._id},99,published`,
  ].join("\n");
  const preview = await request(app)
    .post("/api/product/import/preview")
    .set("Authorization", `Bearer ${token}`)
    .attach("file", Buffer.from(csv), "products.csv");
  assert.equal(preview.status, 200, preview.text);
  assert.equal(preview.body.totalRows, 1);
  assert.deepEqual(preview.body.preview[0].errors, []);

  await Product.updateOne({ slug: "test-product-1" }, { $set: { name: "=HYPERLINK(\"bad\")" } });
  const exported = await request(app)
    .get("/api/product/export/file?format=csv")
    .set("Authorization", `Bearer ${token}`);
  assert.equal(exported.status, 200, exported.text);
  assert.match(exported.text, /'=HYPERLINK/);
});
