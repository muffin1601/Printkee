# Admin Security Audit

## Controls present or added

- JWT signature and expiry validation.
- Login rate limit (10 attempts per 15 minutes).
- Product endpoint roles: `super_admin`, `admin`, `catalog_manager`, `content_editor`, and `viewer`; write operations exclude editor/viewer.
- Permanent product deletion restricted to super admin.
- Product write allowlist and server-side numeric/taxonomy validation.
- Upload extension/MIME/size checks; import file type/size checks.
- CORS allowlist, Helmet, two-megabyte JSON body limit.
- Request IDs and safe structured audit events.
- CSV formula-injection mitigation.

## Open risks

| Severity | Risk | Recommendation |
|---|---|---|
| High | One shared environment password; no persisted admin identities, MFA, disablement, or per-user role administration. | Add an AdminUser collection or managed identity provider, password hashing, MFA, and revocable sessions. |
| High | JWT is stored in local storage and is exposed to successful XSS. | Move to Secure, HttpOnly, SameSite cookies and add CSRF tokens for state changes. |
| High | Roles outside product APIs are not yet enforced. | Apply the same server-side authorization matrix to categories, banners, blogs, and SEO. |
| Medium | Public admin-list reads exist for banners/categories/subcategories. | Split public active endpoints from authenticated admin endpoints after regression testing callers. |
| Medium | No product mutation-specific rate limiter/idempotency key store. | Add Redis-backed rate limiting and idempotency before multi-instance deployment. |
| Medium | Upload validation trusts declared MIME plus extension. | Inspect file signatures, decode/re-encode images, and scan files in object storage. |
| Medium | Secrets are environment files without repository-defined rotation process. | Use a deployment secret manager and documented rotation. |

No secrets were printed or added to source control.
