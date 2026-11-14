// Read-only, restorable Extended JSON backup of every application collection.
// Run from backend-next: node scripts/backupMongoDatabase.js <new-directory>
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const mongoose = require("mongoose");
const { EJSON } = require("bson");

async function backupDatabase(db, output) {
  fs.mkdirSync(output, { recursive: false });
  const collections = await db.listCollections({}, { nameOnly: false }).toArray();
  const manifest = { format: "MongoDB Extended JSON v2 NDJSON", createdAt: new Date().toISOString(),
    database: db.databaseName, collections: [] };
  for (const collection of collections.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!/^[a-zA-Z0-9_-]+$/.test(collection.name)) throw new Error(`Unsafe collection name: ${collection.name}`);
    const filename = `${collection.name}.ndjson`;
    const file = path.join(output, filename);
    const writer = fs.createWriteStream(file, { flags: "wx" });
    const digest = crypto.createHash("sha256");
    let count = 0;
    for await (const document of db.collection(collection.name).find({})) {
      const line = EJSON.stringify(document, { relaxed: false }) + "\n";
      if (!writer.write(line)) await new Promise((resolve) => writer.once("drain", resolve));
      digest.update(line);
      count++;
    }
    await new Promise((resolve, reject) => { writer.end(resolve); writer.once("error", reject); });
    manifest.collections.push({ name: collection.name, file: filename, count,
      sha256: digest.digest("hex"), options: collection.options || {},
      indexes: await db.collection(collection.name).indexes() });
  }
  fs.writeFileSync(path.join(output, "manifest.json"), JSON.stringify(manifest, null, 2), { flag: "wx" });
  return manifest;
}

async function main() {
  const output = process.argv[2];
  if (!output) throw new Error("Provide a new backup directory");
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    const result = await backupDatabase(mongoose.connection.db, path.resolve(output));
    console.log(JSON.stringify({ directory: path.resolve(output), collections: result.collections.length,
      documents: result.collections.reduce((sum, item) => sum + item.count, 0),
      products: result.collections.find((item) => item.name === "products")?.count || 0 }));
  } finally { await mongoose.disconnect(); }
}
if (require.main === module) main().catch((error) => {
  console.error(`${error.name}: ${error.message.replace(/mongodb(?:\+srv)?:\/\/[^@ ]+@/g, "mongodb://[redacted]@")}`);
  process.exitCode = 1;
});
module.exports = { backupDatabase };
