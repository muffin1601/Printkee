# Product Import and Export Guide

## Import

1. Open Admin → Products and choose a `.csv` or `.xlsx` file (maximum 10 MB and 5,000 data rows).
2. Select **Preview**. The server parses and validates without writing.
3. Review the row/error count.
4. Choose **Create only**, **Update only**, or **Create or update** and confirm.

Existing products are matched in this order: valid `_id`, SKU, then exact slug. Similar names are never used. Processing occurs in batches of 100 and reports created, updated, skipped, failed, and row-level errors. Partial failures return HTTP 207 and are not reported as total success.

Supported template fields are `_id`, SKU, name, slug, category ID, subcategory ID, short/long description, price, sale price, stock, MOQ, image URLs, tags, SEO title/description/keywords/indexability, canonical URL, and status. Image URLs are stored as references; the importer does not fetch arbitrary remote files.

The template endpoint is `GET /api/product/import/template`. Column mapping is supported by the API through a JSON `mapping` multipart field; the current UI expects template headers directly.

## Export

Use CSV or XLSX from the Products screen. If rows are selected, only those IDs export; otherwise current filters determine scope. Exports contain stable `_id` and SKU values for safe re-import. CSV cells beginning with spreadsheet formula characters are neutralized.

## Operational limits

Imports are synchronous and resumable retry/cancellation is not implemented because the repository has no queue or worker infrastructure. For catalogues above 5,000 rows, split the file or add a durable queue before production-scale ingestion.
