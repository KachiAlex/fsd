import { NextRequest, NextResponse } from "next/server";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "";
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || "";
const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID || "";

interface HubSpotField {
  name: string;
  value: string;
}

function buildHubSpotPayload(body: Record<string, unknown>, pageUri: string): Record<string, unknown> {
  const fields: HubSpotField[] = [];

  if (body.firstName) fields.push({ name: "firstname", value: String(body.firstName) });
  if (body.lastName) fields.push({ name: "lastname", value: String(body.lastName) });
  if (body.email) fields.push({ name: "email", value: String(body.email) });
  if (body.organisation) fields.push({ name: "company", value: String(body.organisation) });
  if (body.enquiryType) fields.push({ name: "enquiry_type", value: String(body.enquiryType) });
  if (body.message) fields.push({ name: "message", value: String(body.message) });

  return {
    fields,
    context: { pageUri },
  };
}

async function submitToHubSpot(body: Record<string, unknown>, pageUri: string) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildHubSpotPayload(body, pageUri)),
  });
  return res.ok;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pageUri = request.headers.get("referer") || "https://fsdafrica.org/contact";

    const results: Record<string, boolean | string> = {};

    // 1. Forward to WordPress custom endpoint if configured
    if (WORDPRESS_API_URL) {
      const wpRes = await fetch(`${WORDPRESS_API_URL}/wp-json/fsd/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      results.wordpress = wpRes.ok;
      if (!wpRes.ok) {
        const wpData = await wpRes.json().catch(() => ({}));
        return NextResponse.json(
          { message: wpData.message || "WordPress submission failed" },
          { status: wpRes.status }
        );
      }
    }

    // 2. Forward to HubSpot CRM if configured
    if (HUBSPOT_PORTAL_ID && HUBSPOT_FORM_GUID) {
      const hsOk = await submitToHubSpot(body, pageUri);
      results.hubspot = hsOk;
    }

    // If neither WP nor HubSpot configured, log locally
    if (!WORDPRESS_API_URL && !(HUBSPOT_PORTAL_ID && HUBSPOT_FORM_GUID)) {
      console.log("[Contact Form Submission]", body);
      results.note = "Submission logged. Configure WORDPRESS_API_URL or HUBSPOT_PORTAL_ID + HUBSPOT_FORM_GUID.";
    }

    return NextResponse.json({ success: true, ...results });
  } catch (error) {
    return NextResponse.json(
      { message: "Submission failed", error: String(error) },
      { status: 500 }
    );
  }
}
