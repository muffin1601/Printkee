# Product Creation Root Cause

## Confirmed causes

The failure was a combination of a write defect and a presentation defect.

1. `ProductManager` always submitted `sku: ""` when SKU was left blank.
2. `Product.sku` used a MongoDB sparse unique index. A sparse index omits missing fields, but it does not omit an empty string. Multiple empty-string SKUs therefore violate uniqueness.
3. The API checked only slug before insert and converted all database exceptions into a generic frontend “Save failed” alert.
4. The admin API and UI both defaulted to five rows, so records after the fifth were hidden on another page and reinforced the appearance of a five-product ceiling.
5. Successful creation did not update `Subcategory.products`, while the storefront subcategory route reads products through that array. A record could exist yet not appear publicly.

## Repair

- Blank SKU values are trimmed and removed before persistence; the schema setter also maps blank strings to `undefined`.
- Duplicate SKU and slug errors are explicit 409 responses.
- Page size defaults to 25 with accurate `totalItems` and `totalPages`.
- Create/import/category-change paths update `Subcategory.products` using idempotent `$addToSet` operations.
- A dry-run-by-default migration reports and can repair historical empty SKUs, missing statuses, and missing subcategory links.

## Verification

The isolated MongoDB integration suite created 100 products through the real Express route, all with a blank SKU submitted by the client. It asserted database counts at 1, 5, 6, 10, 50, and 100, retrieved all 100 through the admin listing, and confirmed all 100 subcategory references. No production database was used.
