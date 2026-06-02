import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(process.env.CRM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.CRM_API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
