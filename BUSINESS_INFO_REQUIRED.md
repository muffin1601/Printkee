# Business information requiring owner confirmation

The public UI and Organization schema now consistently use the contact identity already present in the site's navbar, contact page and structured data:

- Brand: Printkee
- Legal/alternate name currently in schema: MF Global Services
- Phone: +91 88009 04543
- Email: sales@printkee.com
- Address: F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1, New Delhi, Delhi 110020, India

Before the next production release, the owner should confirm:

1. Whether MF Global Services is the correct legal entity and whether it should remain in Organization schema and policy text.
2. Whether the phone, email and postal address above are the canonical public business details.
3. Whether +91 87507 08222 and sales@mfglobalservices.com are valid departmental contacts. They were removed from public CTAs because their purpose was not labelled and they conflicted with the primary details.
4. Whether 9990590321 in customizer validation is an internal test/control value and should be replaced by authenticated logic.
5. Ownership of the current Facebook and Instagram profiles. LinkedIn and X links remain omitted until official profile URLs are supplied.
6. Evidence and permission for any client counts, client logos, testimonials, manufacturing claims, guarantees, fixed MOQ/pricing, or turnaround promises before they are republished.

Do not add unverified details to structured data. Update `frontend-next/lib/siteConfig.js` after approval so public references remain consistent.
