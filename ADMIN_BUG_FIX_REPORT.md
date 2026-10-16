# Admin Bug Fix Report

Date: 2026-10-16

## Implemented

- Removed the effective blank-SKU uniqueness collision.
- Repaired storefront relationship synchronization after create, import, edit, and bulk category reassignment.
- Increased default product page size from 5 to 25 and exposed total count.
- Added status/category/search filters and deterministic sorting support.
- Added draft, published, and archived lifecycle states.
- Changed ordinary deletion to recoverable archive; permanent deletion requires super-admin role and an explicit query flag.
- Preserved existing images, attributes, specifications, and other fields during full-form edits.
- Added optimistic concurrency using the Mongoose version key.
- Added taxonomy validation and allowlisted product write fields to reduce mass-assignment risk.
- Added actionable API errors and request IDs.
- Added mutation audit events.
- Added compact selection, bulk action, import, and export controls to the existing admin design.

## Known limitations

- Cache/path revalidation is not available because the Express backend has no authenticated Next.js revalidation endpoint. Public pages currently fetch with their existing caching rules.
- Local image files are not transactional with product saves and are not backed by an object-store lifecycle.
- Product preview-before-publish is represented by draft status but there is no private storefront preview route.
- First-class variants, tiered prices, media ordering, lead management, and admin-user CRUD do not exist in the current data model and were not invented.
- Role checks are applied to the upgraded product APIs. Other admin modules still need the same role matrix.
