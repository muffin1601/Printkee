# Admin Database Reliability and Performance

## Current database

MongoDB through Mongoose. Existing indexes cover slug/SKU uniqueness, category, subcategory, and active status. This upgrade adds lifecycle/creation and text-search indexes.

## Changes

- Admin listing uses database pagination, bounded page size (10–100), server filters, count, deterministic sort, and field-specific population.
- Bulk mutations are capped at 1,000 and use unordered `bulkWrite`.
- Imports process rows in batches of 100 and preserve partial-failure detail.
- Optimistic version checks prevent silent edit overwrites.
- Relationship repair uses `$addToSet` and `$pull` to remain idempotent.
- Product audits have actor/request/operation and descending-time indexes.

## Migration

No production migration was executed. `backend-next/scripts/migrateProductAdminV2.js` is dry-run by default. With `--apply`, it unsets historical empty SKUs, backfills status from `isActive`, restores missing subcategory product references, and synchronizes indexes.

Before applying, verify a recent backup and inspect duplicate non-empty SKU/slug values. `syncIndexes()` may be operationally expensive on a large collection and should run in a maintenance window.

## Scale notes

Offset pagination is acceptable for the current admin but becomes slower on very deep pages. For a 10,000+ frequently browsed catalogue, migrate to cursor pagination using `(sortField, _id)`. Regex substring search cannot fully use the text index; use anchored prefix search or a search service for large catalogues. Import jobs above the current cap require a durable worker/queue and progress collection.
