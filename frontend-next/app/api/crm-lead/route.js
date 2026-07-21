import { NextResponse } from "next/server";

export async function POST(request) {
  if (!process.env.CRM_API_URL || !process.env.CRM_API_KEY) {
    console.error("crm-lead: CRM_API_URL/CRM_API_KEY not configured");
    return NextResponse.json({ success: false, message: "CRM not configured" }, { status: 500 });
  }

  const body = await request.json();

  try {
    const res = await fetch(process.env.CRM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CRM_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("crm-lead: CRM API returned", res.status, data);
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("crm-lead: request to CRM API failed:", err.message);
    return NextResponse.json({ success: false, message: "CRM request failed" }, { status: 502 });
  }
}
