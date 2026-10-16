# Printkee Admin Panel — Initial Audit

Date: 2026-10-16

## Architecture observed

- Frontend: Next.js 16.3.6 App Router, React 19.2.4, client-rendered admin screens.
- Backend: Express 5.1 API, Mongoose 8.15, MongoDB.
- Authentication: one environment-backed admin credential issuing one-hour JWTs; bearer token stored in browser local storage.
- Media: Multer writes local files under `backend-next/uploads`; 5 MB JPEG/PNG/WEBP validation.
- Admin areas present: dashboard, products, categories, subcategories, banners, blogs, and SEO.
- Not present as admin modules: admin-user management, inventory movements, lead/enquiry inbox, centralized media library, settings/integrations.
- Tests before this change: SEO scripts only; no product CRUD or admin E2E suite.
- Deployment manifests/CI configuration: none found in the repository.

## Verified findings

| Severity | Finding | Reproduction/evidence | Impact | Resolution |
|---|---|---|---|---|
| Critical | Blank SKU is sent as `""` while `sku` has a sparse unique index. Sparse indexes index an empty string. | Create repeated products without entering SKU; inserts collide on the unique SKU value. | Catalogue creation stops after an existing blank SKU is encountered. | Normalize blank SKU to an omitted field in API and schema; add dry-run migration. |
| Critical | Product creation did not add the new ID to `Subcategory.products`. | Create a product, then fetch the public subcategory route; that route populates `Subcategory.products`. | A successful admin insert can be missing from storefront category listings and sitemap-derived catalogue data. | Creation/import/update now synchronize the relationship. |
| High | Admin list defaulted to five records in both API and UI. | `limit || 5` in the API and `useState(5)` in ProductManager. | Looked like creation stopped after five even when records existed on later pages. | Default page size is 25; response includes accurate totals; UI displays total count. |
| High | Product mutations had authentication but no roles. | Any valid JWT could call all product write endpoints. | No least-privilege separation. | Server-side roles added for product read/write/permanent-delete paths. |
| High | Product delete was permanent. | Admin Delete called `findByIdAndDelete`. | Accidental irreversible data and SEO loss. | Default delete now archives; permanent deletion is an explicit super-admin operation. |
| High | Category/subcategory compatibility was not validated on product writes. | Send IDs for a subcategory belonging to a different category. | Broken navigation and associations. | Server validates parent-child membership for create, edit, bulk move, and import. |
| High | Updates silently overwrote concurrent edits. | Two admins edit the same version; last request wins. | Data loss. | `__v` optimistic version check and 409 conflict response added. |
| Medium | Tags and SEO keywords were sent as comma strings to array fields. | Inspect ProductManager payload. | Inconsistent data shapes and search behavior. | Central payload normalization converts strings to trimmed arrays. |
| Medium | Admin product errors were generic alerts. | Duplicate slug returned “Save failed”. | Operators could not correct the problem. | API messages are shown in an accessible status region. |
| Medium | Admin product list endpoint was public. | `GET /api/product/all` had no token check. | Draft catalogue data could be enumerated. | Authentication and read-role enforcement added. |
| Medium | No import/export protection against spreadsheet formulas. | Export a value beginning with `=`. | CSV formula injection when opened in a spreadsheet. | Formula-leading cells are prefixed with an apostrophe. |
| Medium | Audit trail did not cover catalogue mutations. | No product audit model or calls. | Weak accountability and diagnostics. | Structured product audit events include actor, role, request ID, IDs, outcome, and safe details. |
| Medium | Admin-only banner `get-all`, category `all`, and subcategory `all` remain public. | Route inspection shows no `verifyToken` on these reads. | Inactive content can be enumerated. | Remaining work; changing these needs storefront/client regression confirmation. |
| Medium | Local-disk uploads are not horizontally durable. | Multer disk storage and Express static directory. | Files can disappear on ephemeral deployments and do not replicate across instances. | Remaining infrastructure limitation; move to managed object storage before horizontal scaling. |
| Low | Blog/banner/category deletion is still hard delete. | Route inspection. | Content recovery and auditability are limited. | Remaining work outside the repaired product scope. |

## Feature audit summary

- Login/logout: login is rate-limited; logout is client token removal. No refresh-token revocation or server-side session registry.
- Dashboard: database counts exist.
- Products: repaired create/list/edit/archive, status, pagination, filters, selection, bulk actions, CSV/XLSX import/export.
- Categories/subcategories: CRUD exists with duplicate and deletion guards; product counts are not exposed.
- Media: validated image upload and multi-image form exist; no primary-image reorder, shared-media usage graph, or orphan cleanup job.
- Variants: no first-class variant schema exists. Color/size arrays are attributes only.
- Price/MOQ: single base/sale price and text MOQ are supported; no multi-tier price model.
- Inventory: only a numeric stock field; no ledger/reservations.
- Enquiries/leads: public submission routes exist; no admin management UI found.
- Blogs/SEO: management routes and screens exist; role enforcement remains token-only outside products.
- Admin users/settings: not implemented.

No production records were changed during this audit.
