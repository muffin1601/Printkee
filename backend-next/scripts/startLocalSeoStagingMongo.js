// Restore the existing full EJSON backup into a local-only MongoDB staging database.
// Never reads MONGO_URI and never opens a connection to the production cluster.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const { EJSON } = require("bson");

const workspace = path.resolve(__dirname, "../..");
const backupPath = path.join(workspace, ".local-backups/printkee-2026-11-14-pre-seo");
const stagePath = path.join(workspace, ".local-backups/printkee-seo-staging-2026-11-14");
const binary = path.join(__dirname, "../node_modules/.cache/mongodb-memory-server/mongod-x64-win32-7.0.14.exe");
const database = "printkee-seo-staging-20261114";
const port = 27028;

function checkBackup() {
  const manifest = JSON.parse(fs.readFileSync(path.join(backupPath, "manifest.json"), "utf8"));
  if (manifest.format !== "MongoDB Extended JSON v2 NDJSON" ||
      manifest.collections.find((c) => c.name === "products")?.count !== 234) throw new Error("Unexpected source backup");
  for (const entry of manifest.collections) {
    if (!/^[a-zA-Z0-9_-]+$/.test(entry.name) || entry.file !== `${entry.name}.ndjson`) throw new Error("Unsafe backup entry");
    const raw = fs.readFileSync(path.join(backupPath, entry.file));
    if (crypto.createHash("sha256").update(raw).digest("hex") !== entry.sha256) throw new Error(`Backup checksum failed: ${entry.name}`);
    if (raw.toString("utf8").split("\n").filter(Boolean).length !== entry.count) throw new Error(`Backup count failed: ${entry.name}`);
  }
  return manifest;
}

async function restore(db, manifest) {
  for (const entry of manifest.collections) {
    const collection = await db.createCollection(entry.name, entry.options || {});
    const lines = fs.readFileSync(path.join(backupPath, entry.file), "utf8").split("\n").filter(Boolean);
    for (let i = 0; i < lines.length; i += 250) {
      await collection.insertMany(lines.slice(i, i + 250).map((line) => EJSON.parse(line, { relaxed: false })), { ordered: true });
    }
    for (const index of entry.indexes || []) {
      if (index.name === "_id_") continue;
      const options = {};
      for (const key of ["name", "unique", "sparse", "expireAfterSeconds", "partialFilterExpression", "collation",
        "weights", "default_language", "language_override", "textIndexVersion", "2dsphereIndexVersion",
        "bits", "min", "max", "bucketSize", "wildcardProjection"]) {
        if (index[key] !== undefined) options[key] = index[key];
      }
      await collection.createIndex(index.key, options);
    }
    if (await collection.countDocuments({}) !== entry.count) throw new Error(`Staging restore count failed: ${entry.name}`);
  }
}

async function main() {
  if (!fs.existsSync(binary)) throw new Error("Cached local mongod binary is missing");
  const manifest = checkBackup();
  fs.mkdirSync(stagePath, { recursive: true });
  const dbPath = path.join(stagePath, "data");
  fs.mkdirSync(dbPath, { recursive: true });
  const marker = path.join(stagePath, "restore-complete.json");
  const server = await MongoMemoryServer.create({
    instance: { ip: "127.0.0.1", port, dbPath, storageEngine: "wiredTiger" },
    binary: { systemBinary: binary },
  });
  const uri = `mongodb://127.0.0.1:${port}/${database}`;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const db = client.db(database);
    if (!fs.existsSync(marker)) {
      // A failed first restore may leave only this dedicated local staging DB partially populated.
      await db.dropDatabase();
      await restore(db, manifest);
      fs.writeFileSync(marker, JSON.stringify({ database, backupCreatedAt: manifest.createdAt,
        collections: manifest.collections.length, documents: manifest.collections.reduce((n, e) => n + e.count, 0),
        products: 234, restoredAt: new Date().toISOString() }, null, 2), { flag: "wx" });
    }
    const products = await db.collection("products").countDocuments({});
    if (products !== 234) throw new Error(`Expected 234 staging products, found ${products}`);
    console.log(JSON.stringify({ ready: true, localOnly: true, uri, products,
      collections: (await db.listCollections().toArray()).length, marker }));
    process.stdin.resume();
    const close = async () => { await client.close(); await server.stop(); process.exit(0); };
    process.once("SIGINT", close);
    process.once("SIGTERM", close);
  } catch (error) {
    await client.close();
    await server.stop();
    throw error;
  }
}
main().catch((error) => { console.error(`${error.name}: ${error.message}`); process.exitCode = 1; });
