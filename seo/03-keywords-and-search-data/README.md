# Keywords and Search Data

## Authoritative files

- `PRINTKEE_COMPLETE_KEYWORD_MASTER_CATALOG_MAPPED.csv`: current complete keyword source of truth.
- `PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv`: only file intended for `/admin/seo` upload.
- `PRINTKEE_CATALOG_KEYWORD_MAP.csv`: 483 catalogue mapping changes.
- `PRINTKEE_TSHIRT_KEYWORD_MAP.csv`: 208 T-shirt mapping changes.

## Source and intermediate files

- `PRINTKEE_COMPLETE_KEYWORD_MASTER.csv`: original reconciled master before curated page remapping.
- `PRINTKEE_COMPLETE_KEYWORD_MASTER_TSHIRT_MAPPED.csv`: intermediate input used to build the final catalogue master.
- `PurplePalette_Printo_SEO_Keyword_Universe.csv`: supplied research source.
- `SEO_GSC_*.csv`: point-in-time Search Console evidence; refresh before making current performance claims.

Never upload a complete master file through the admin interface. Use the compact final import only.
