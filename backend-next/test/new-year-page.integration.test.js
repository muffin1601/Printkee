const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('node:fs/promises');
const path = require('node:path');
process.env.JWT_SECRET = 'isolated-new-year-tests';
process.env.BASE_URL = 'http://localhost:5031';
const NewYearPage = require('../models/NewYearPage');
const Product = require('../models/product');
const router = require('../routes/newYearPageRoutes');
let mongo, app, token, diary, calendar, kit, uploaded;
const row = (id, items = [], title = '') => ({ id, title, items });
const defaults = () => ({ bannerMode: 'default', layout: [row('r1', ['legacy:2027-diary-pen-set-1'], 'Gifts')] });
const auth = (method, route) => request(app)[method](route).set('Authorization', `Bearer ${token}`);
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a3XcAAAAASUVORK5CYII=', 'base64');
const uploadFile = (name) => auth('post', '/page/upload').attach('file', png, { filename: name, contentType: 'image/png' });
const fileOf = (url) => path.join(process.cwd(), 'uploads/new-year', new URL(url).pathname.split('/').pop());
test.before(async () => {
  mongo = await MongoMemoryServer.create(); await mongoose.connect(mongo.getUri()); await NewYearPage.syncIndexes();
  const category = new mongoose.Types.ObjectId(), subcategory = new mongoose.Types.ObjectId();
  const create = (name, slug, image) => Product.create({ name, slug, price: 10, category, subcategory, images: [{ url: image }], status: 'published', isActive: true });
  diary = await create('Test Corporate Diary', 'test-corporate-diary', '/assets/products/notebooks/7.webp');
  calendar = await create('Test Desk Calendar', 'test-desk-calendar', '/assets/products/cork/desk (4).webp');
  kit = await create('Test Gift Kit', 'test-gift-kit', '/assets/2027%20diary%20(1).jpg');
  token = jwt.sign({ email: 'new-year-test@printkee.local', role: 'admin' }, process.env.JWT_SECRET);
  app = express(); app.use(express.json()); app.use('/page', router);
  app.use((err, req, res, next) => res.status(500).json({ message: err.message }));
});
test.after(async () => {
  if (uploaded) await fs.unlink(fileOf(uploaded)).catch(() => {});
  await mongoose.disconnect(); await mongo?.stop();
});
test('requires authentication and write permissions', async () => {
  assert.equal((await request(app).get('/page')).body.settings, null);
  assert.equal((await request(app).get('/page/admin')).status, 401);
  assert.equal((await request(app).put('/page/admin').send(defaults())).status, 401);
  assert.equal((await request(app).post('/page/upload')).status, 401);
  const viewer = jwt.sign({ role: 'viewer' }, process.env.JWT_SECRET);
  assert.equal((await request(app).put('/page/admin').set('Authorization', `Bearer ${viewer}`).send(defaults())).status, 403);
});
test('persists any number of rows in order and resolves product references', async () => {
  const payload = { bannerMode: 'default', layout: [
    row('a', [`product:${kit.id}`, 'legacy:2027-diary-pen-set-1'], 'Gifts'), row('b', [`product:${diary.id}`]), row('c', [`product:${calendar.id}`], 'Calendars'), row('d'),
  ] };
  const response = await auth('put', '/page/admin').send(payload);
  assert.equal(response.status, 200, response.text); assert.deepEqual(response.body.settings.layout, payload.layout);
  const publicPage = await request(app).get('/page'); assert.equal(publicPage.body.products.length, 3);
  assert.equal(publicPage.body.products.find((p) => p.id === `product:${diary.id}`).name, diary.name);
  assert.equal(await Product.countDocuments(), 3);
});
test('rejects rows over four items, duplicates, bad rows and invalid references', async () => {
  const five = defaults(); five.layout[0].items = ['legacy:a', 'legacy:b', 'legacy:c', 'legacy:d', 'legacy:e']; assert.equal((await auth('put', '/page/admin').send(five)).status, 400);
  const duplicate = defaults(); duplicate.layout.push(row('r2', [...duplicate.layout[0].items])); assert.equal((await auth('put', '/page/admin').send(duplicate)).status, 400);
  const sameId = defaults(); sameId.layout.push(row('r1')); assert.equal((await auth('put', '/page/admin').send(sameId)).status, 400);
  const badId = defaults(); badId.layout[0].id = 'Bad Id!'; assert.equal((await auth('put', '/page/admin').send(badId)).status, 400);
  const missing = defaults(); delete missing.layout; assert.equal((await auth('put', '/page/admin').send(missing)).status, 400);
  const invalid = defaults(); invalid.layout[0].items = ['product:invalid']; assert.equal((await auth('put', '/page/admin').send(invalid)).status, 400);
});
test('rejects missing and unpublished products', async () => {
  const payload = defaults(); payload.layout[0].items = [`product:${new mongoose.Types.ObjectId()}`]; assert.equal((await auth('put', '/page/admin').send(payload)).status, 400);
  await Product.findByIdAndUpdate(kit.id, { status: 'draft' }); payload.layout[0].items = [`product:${kit.id}`]; assert.equal((await auth('put', '/page/admin').send(payload)).status, 400);
  await Product.findByIdAndUpdate(kit.id, { status: 'published' });
});
test('hides products made inactive after selection', async () => {
  const payload = defaults(); payload.layout[0].items = [`product:${diary.id}`]; await auth('put', '/page/admin').send(payload);
  await Product.findByIdAndUpdate(diary.id, { isActive: false });
  const response = await request(app).get('/page'); assert.deepEqual(response.body.products.find((p) => p.id === `product:${diary.id}`), { id: `product:${diary.id}`, available: false });
  await Product.findByIdAndUpdate(diary.id, { isActive: true });
});
test('uses database records matching legacy slugs and rejects cross-source duplicates', async () => {
  const slug = 'executive-a5-pu-leather-diary'; await Product.findByIdAndUpdate(diary.id, { slug });
  const payload = defaults(); payload.layout[0].items = [`legacy:${slug}`]; assert.equal((await auth('put', '/page/admin').send(payload)).status, 200);
  const response = await request(app).get('/page'); assert.equal(response.body.products.find((p) => p.id === `legacy:${slug}`).name, diary.name);
  payload.layout[0].items.push(`product:${diary.id}`); assert.equal((await auth('put', '/page/admin').send(payload)).status, 400);
  payload.layout[0].items = [`legacy:${slug}`];
  await Product.findByIdAndUpdate(diary.id, { isActive: false });
  assert.equal((await auth('put', '/page/admin').send(payload)).status, 400);
  await Product.findByIdAndUpdate(diary.id, { isActive: true, slug: 'test-corporate-diary' });
});
test('uploads and saves a banner; validates its URL, dimensions and file type', async () => {
  const response = await uploadFile('banner.png'); assert.equal(response.status, 200, response.text); uploaded = response.body.url;
  const payload = { ...defaults(), bannerMode: 'custom', banner: { url: uploaded, alt: 'New Year gifting', width: 1, height: 1 } };
  const saved = await auth('put', '/page/admin').send(payload); assert.equal(saved.status, 200, saved.text); assert.equal(saved.body.settings.banner.url, uploaded);
  payload.banner.url = 'https://example.com/image.png'; assert.equal((await auth('put', '/page/admin').send(payload)).status, 400);
  payload.banner.url = uploaded; payload.banner.width = 0; assert.equal((await auth('put', '/page/admin').send(payload)).status, 400);
  assert.equal((await auth('post', '/page/upload').attach('file', Buffer.from('test'), { filename: 'image.svg', contentType: 'image/svg+xml' })).status, 400);
});
test('preserves a deliberately empty page and text introduction without deleting products', async () => {
  const payload = { bannerMode: 'none', layout: [] };
  const response = await auth('put', '/page/admin').send(payload); assert.equal(response.status, 200, response.text);
  assert.deepEqual(response.body.settings.layout, []); assert.equal(response.body.settings.banner, undefined); assert.equal(await Product.countDocuments(), 3);
});
test('creates and deletes custom products, removing their image file', async () => {
  const upload = await uploadFile('cal.png'); assert.equal(upload.status, 200, upload.text);
  const file = fileOf(upload.body.url);
  const id = new mongoose.Types.ObjectId().toString();
  const payload = { bannerMode: 'none', layout: [row('x', [`custom:${id}`])], customProducts: [{ id, name: 'Anything I like', image: upload.body.url }] };
  let saved = await auth('put', '/page/admin').send(payload); assert.equal(saved.status, 200, saved.text);
  assert.equal(saved.body.settings.customProducts[0].name, 'Anything I like');
  const publicPage = await request(app).get('/page');
  assert.equal(publicPage.body.settings.customProducts, undefined);
  assert.equal(publicPage.body.products.find((p) => p.id === `custom:${id}`).image, upload.body.url);
  await fs.access(file);
  assert.equal((await auth('put', '/page/admin').send({ ...payload, customProducts: [{ id, name: '', image: upload.body.url }] })).status, 400);
  assert.equal((await auth('put', '/page/admin').send({ ...payload, customProducts: [{ id, name: 'X', image: 'https://example.com/a.png' }] })).status, 400);
  assert.equal((await auth('put', '/page/admin').send({ ...payload, customProducts: [] })).status, 400);
  saved = await auth('put', '/page/admin').send({ bannerMode: 'none', layout: [row('x')], customProducts: [] });
  assert.equal(saved.status, 200, saved.text); assert.deepEqual(saved.body.settings.customProducts, []);
  await assert.rejects(fs.access(file));
});
test('deleting an existing product hides it from the page and keeps the catalogue record', async () => {
  const hidden = `product:${kit.id}`;
  let saved = await auth('put', '/page/admin').send({ bannerMode: 'none', layout: [row('x', ['legacy:2027-diary-pen-set-1'])], deletedProducts: [hidden, 'legacy:gifta-guru-set-1'] });
  assert.equal(saved.status, 200, saved.text);
  assert.deepEqual(saved.body.settings.deletedProducts, [hidden, 'legacy:gifta-guru-set-1']);
  assert.equal(saved.body.products.find((p) => p.id === hidden).name, kit.name);
  assert.equal((await request(app).get('/page')).body.settings.deletedProducts, undefined);
  assert.equal(await Product.countDocuments(), 3);
  assert.equal((await auth('put', '/page/admin').send({ bannerMode: 'none', layout: [row('x', [hidden])] })).status, 400);
  assert.equal((await auth('put', '/page/admin').send({ bannerMode: 'none', layout: [], deletedProducts: ['custom:' + 'a'.repeat(24)] })).status, 400);
  saved = await auth('put', '/page/admin').send({ bannerMode: 'none', layout: [row('x', [hidden])], deletedProducts: [] });
  assert.equal(saved.status, 200, saved.text);
});
test('converts a page saved as three sections into rows of four', async () => {
  const gifts = Array.from({ length: 6 }, (_, i) => `legacy:gifta-guru-set-${i + 1}`);
  await NewYearPage.collection.replaceOne({ key: 'new-year-2027' }, { key: 'new-year-2027', bannerMode: 'none', rows: { gifts, diaries: ['legacy:cork-fabric-diary'], calendars: [] } });
  const response = await request(app).get('/page');
  assert.deepEqual(response.body.settings.layout, [
    row('gifts-1', gifts.slice(0, 4), 'New Year 2027 Gift Sets'), row('gifts-2', gifts.slice(4)),
    row('diaries-1', ['legacy:cork-fabric-diary'], 'Corporate Diaries 2027'),
  ]);
});
