# Admin Test Results

Date: 2026-10-16

## Automated integration tests

Command: `npm test` in `backend-next`

Result: 5 passed, 0 failed.

- Created products through the real Express route and asserted database counts at 1, 5, 6, 10, 50, and 100.
- Retrieved all 100 through authenticated pagination.
- Confirmed all 100 IDs were linked to the storefront subcategory relationship.
- Verified duplicate slug conflict and unauthorized create rejection.
- Verified 10 concurrent product creates and bulk-updated price/publication state for 1,000 products.
- Validated a CSV import preview.
- Verified CSV formula-injection neutralization.

The suite uses `mongodb-memory-server`; it does not read or modify production data.

## Build and static checks

- Backend `node --check` for changed JavaScript modules: passed.
- Frontend `next build`: passed (41 pages generated).
- Existing non-fatal warning: `/brands` static generation could not reach its configured backend and logged “failed to fetch brands”; build still completed.
- `npm audit`: 0 vulnerabilities after replacing the initially evaluated SheetJS package with ExcelJS, updating `proxy-addr`, replacing nodemon with Node's built-in watch mode, and overriding ExcelJS's transitive UUID to a patched release.

## Not executed

- Production/staging browser E2E login and media workflows: no isolated deployed environment or credentials were provided.
- Live storefront cache invalidation: no revalidation endpoint exists.
