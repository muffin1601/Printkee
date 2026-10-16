# Admin Deployment Checklist

Do not deploy until each checkbox has an owner and evidence.

## Before deployment

- [ ] Create and verify a restorable MongoDB backup.
- [ ] Run `npm audit` in both applications and accept/remediate remaining findings.
- [ ] Run `npm test` in `backend-next`.
- [ ] Run `npm run build` in `frontend-next` with the staging backend reachable.
- [ ] Run `node scripts/migrateProductAdminV2.js` and review dry-run counts.
- [ ] Check for duplicate non-empty slug/SKU values and estimate index build impact.
- [ ] Test login, create #6 and #10, edit conflict, publish, archive, bulk actions, import, export, and image upload in staging.
- [ ] Confirm published products appear on product and subcategory storefront routes.
- [ ] Confirm sitemap eligibility, canonical URL, metadata, robots, and redirects.
- [ ] Set `ADMIN_ROLE=super_admin` for the existing environment-backed account.
- [ ] Verify `BASE_URL`, CORS origins, proxy hop count, Mongo pool settings, upload persistence, and secret-manager values.

## Migration and release

1. Put catalogue writes into a brief maintenance window.
2. Run `node scripts/migrateProductAdminV2.js --apply` only after approving the dry run.
3. Deploy backend first; confirm health and authenticated `/api/product/all`.
4. Deploy frontend; perform the critical smoke tests.
5. Monitor structured error/audit logs for duplicate keys, authorization failures, and relationship errors.

## Rollback

- Roll back application artifacts to the prior backend/frontend versions.
- The migration is backward compatible: status/canonical/deleted fields can remain without affecting older code; empty SKU removal and restored relationship references are safe.
- Do not restore the whole database unless data corruption is proven. If needed, restore from the verified pre-release backup using the database provider’s documented procedure.

Production deployment and migration require explicit approval and were not performed.
