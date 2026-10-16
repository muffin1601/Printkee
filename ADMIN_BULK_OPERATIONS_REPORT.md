# Admin Bulk Operations Report

## Supported server operations

- Publish, unpublish, archive.
- Category and compatible subcategory reassignment.
- Fixed, percentage increase/decrease, and fixed-amount increase/decrease for base price.
- MOQ, tags, visibility, SEO fields, and supported scalar attributes.
- Selected IDs or all records matching the current search/status/category filters.
- Selected, filtered, or all export to CSV/XLSX.

Requests are limited to 1,000 mutated products. The server validates selection, taxonomy, roles, and numeric price operations, rounds currency to two decimal places, increments document versions, and records an audit event. Category moves repair subcategory reference arrays.

## UI exposure

The current UI exposes visible/all-matching selection, publish, unpublish, archive, fixed price, MOQ, CSV/XLSX export, and import. The remaining supported API actions can be surfaced with richer dialogs without changing backend semantics.

## Limitations

- Bulk operations are request-batched database writes, not durable background jobs.
- The 1,000-item mutation cap is intentional until queue infrastructure is introduced.
- A bulk write reports MongoDB matched/modified counts; per-item result download is currently specific to import.
