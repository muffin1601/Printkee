// Read-only editorial flags for products that currently pass the old gate.
// Local contact-sheet observations and source-copy contradictions need supplier review.
module.exports = {
  "personalized-polo-t-shirts": { type: "confirmed_data_conflict", reason: "Description says available in white; recorded color is blue. Primary remote image was not visually checked locally." },
  "classic-silk-tie": { type: "needs_manual_verification", reason: "Primary tie photo appears black while recorded color is navy blue; verify variant." },
  "corporate-bomber-jacket": { type: "needs_manual_verification", reason: "Primary jacket photo appears black or charcoal while recorded color is navy blue; verify variant and dry-fit claims." },
  "leather-executive-file-folder": { type: "observed_image_record_disagreement", reason: "Primary image shows several colored files, not a brown PU-leather executive folder." },
  "executive-pen-gift-set": { type: "needs_manual_verification", reason: "Primary image shows an assorted pen display; exact executive gift-set contents are not established." },
  "premium-polyester-lanyard-id-card": { type: "needs_manual_verification", reason: "Primary image appears black while recorded lanyard color is blue; verify variant." },
  "essential-employee-welcome-kit": { type: "needs_manual_verification", reason: "Kit contents and blue color are not established by the current photo and record." },
  "classic-round-promotional-wall-clock": { type: "observed_image_record_disagreement", reason: "Primary wall clock appears pink or rose-toned while recorded color is white." },
  "economy-corporate-backpack": { type: "observed_image_record_disagreement", reason: "Primary backpack photo appears gray while recorded color is blue." },
  "classic-optical-usb-mouse": { type: "observed_image_record_disagreement", reason: "Primary mouse photo is white while recorded color is black." },
  "10000mah-slim-power-bank": { type: "observed_image_record_disagreement", reason: "Primary power-bank photo is green while recorded color is black." },
  "xl-desktop-mouse-pad": { type: "needs_manual_verification", reason: "Primary mouse-pad photo is multicolored while recorded color is black." },
  "premium-stainless-steel-sipper-bottle": { type: "observed_image_record_disagreement", reason: "Primary bottle photo is green while recorded color is silver." },
  "stainless-steel-double-wall-coffee-mug": { type: "confirmed_data_conflict", reason: "Visible description says approximately 460 ml while the recorded size is 660 ml; remote image was not visually checked locally." },
  "golden-excellence-award-trophy": { type: "observed_image_record_disagreement", reason: "Primary trophy photo appears silver/blue while the product identity says golden; verify finish and photo." },
};
