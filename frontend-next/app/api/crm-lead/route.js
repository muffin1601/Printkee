import { NextResponse } from "next/server";

/**
 * Normalises the several lead shapes the site produces into the contract the
 * CRM's /printkee/capture-lead endpoint actually reads.
 *
 * Three different payloads arrive here and each used to lose most of its
 * content, because the CRM stores `requirements` (plural) and `company`:
 *
 *   ContactForm / EnquiryModal / DiwaliClient → { name, company, requirement }
 *   Chatbot                                   → { productType, quantity,
 *                                                 budgetRange, location, source }
 *   Customize (PDF/PNG export)                → { companyname, message, sizes }
 *
 * Everything that does not map to a first-class CRM column is folded into a
 * single readable `requirements` line so the sales team still sees it.
 */
const normalizeLead = (body = {}) => {
  const value = (v) =>
    v === undefined || v === null || String(v).trim() === "" ? "" : String(v).trim();

  const details = [];
  const add = (label, v) => {
    const val = value(v);
    if (val) details.push(`${label}: ${val}`);
  };

  add("Requirement", body.requirement || body.message);
  add("Product", body.productType || body.productCode);
  add("Quantity", body.quantity);
  add("Budget", body.budgetRange);

  // Customize flow sends sizes as a JSON string; skip the empty "{}" case.
  const sizes = value(body.sizes);
  if (sizes && sizes !== "{}") add("Sizes", sizes);

  add("Source", body.source);

  return {
    // `companyname` is the Customize flow's only identifier — fall back to it
    // so those leads don't land in the CRM as a bare phone number.
    name: value(body.name) || value(body.companyname) || "Website visitor",
    company: value(body.company) || value(body.companyname),
    email: value(body.email),
    phone: value(body.phone),
    location: value(body.location),
    requirements: details.join(" | "),
  };
};

export async function POST(request) {
  if (!process.env.CRM_API_URL || !process.env.CRM_API_KEY) {
    console.error("crm-lead: CRM_API_URL/CRM_API_KEY not configured");
    return NextResponse.json({ success: false, message: "CRM not configured" }, { status: 500 });
  }

  const body = await request.json();
  const lead = normalizeLead(body);

  try {
    const res = await fetch(process.env.CRM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CRM_API_KEY,
      },
      body: JSON.stringify(lead),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("crm-lead: CRM API returned", res.status, data);
    } else {
      console.log(
        `crm-lead: captured name="${lead.name}" phone="${lead.phone || "N/A"}" email="${lead.email || "N/A"}"`
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("crm-lead: request to CRM API failed:", err.message);
    return NextResponse.json({ success: false, message: "CRM request failed" }, { status: 502 });
  }
}
