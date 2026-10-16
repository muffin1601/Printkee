/*
 * Backward-compatible catalogue repair. Dry-run is the default.
 * Apply only after a verified backup:
 *   node scripts/migrateProductAdminV2.js --apply
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Subcategory = require("../models/Subcategory");

async function run() {
  const apply = process.argv.includes("--apply");
  await mongoose.connect(process.env.MONGO_URI);

  const [blankSkuCount, missingStatusCount, products] = await Promise.all([
    Product.countDocuments({ sku: "" }),
    Product.countDocuments({ status: { $exists: false } }),
    Product.find({ deletedAt: null }).select("_id subcategory isActive").lean(),
  ]);

  const existingLinks = await Subcategory.aggregate([
    { $project: { count: { $size: { $ifNull: ["$products", []] } } } },
    { $group: { _id: null, total: { $sum: "$count" } } },
  ]);

  console.log(JSON.stringify({
    mode: apply ? "apply" : "dry-run",
    blankSkuCount,
    missingStatusCount,
    activeProductCount: products.length,
    currentSubcategoryLinks: existingLinks[0]?.total || 0,
  }, null, 2));

  if (!apply) return;

  await Product.updateMany({ sku: "" }, { $unset: { sku: 1 } });
  await Product.updateMany(
    { status: { $exists: false }, isActive: false },
    { $set: { status: "draft" } }
  );
  await Product.updateMany(
    { status: { $exists: false }, isActive: { $ne: false } },
    { $set: { status: "published", isActive: true } }
  );

  // Rebuild only missing references. $addToSet is idempotent and does not
  // disturb existing order or remove any relationship.
  for (let offset = 0; offset < products.length; offset += 500) {
    const operations = products.slice(offset, offset + 500).map((product) => ({
      updateOne: {
        filter: { _id: product.subcategory },
        update: { $addToSet: { products: product._id } },
      },
    }));
    if (operations.length) await Subcategory.bulkWrite(operations, { ordered: false });
  }

  await Product.syncIndexes();
  console.log("Migration applied successfully.");
}

run()
  .catch((error) => { console.error(error); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
