import { NextResponse } from "next/server";
import site from "@/site.config";

/**
 * Receives the plan form. Validates it, then forwards it as JSON to
 * `contact.enquiryWebhook` (ENQUIRY_WEBHOOK_URL) when one is set.
 * Without a webhook the enquiry is only logged, so connect one before launch.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const fields: Record<string, string> = {};
  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  if (!str("month")) fields.month = "Choose a month, or “Flexible”";
  if (!str("name")) fields.name = "Please tell us your name";
  if (!/^\S+@\S+\.\S+$/.test(str("email"))) fields.email = "Please check your email address";
  if (str("contact") === "phone" && str("phone").length < 6) fields.phone = "Please add a phone number so we can reach you that way";
  if (Object.keys(fields).length) return NextResponse.json({ ok: false, fields }, { status: 422 });

  const enquiry = { ...body, brand: site.brand.name, receivedAt: new Date().toISOString() };
  const hook = site.contact.enquiryWebhook;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(enquiry) });
      if (!r.ok) throw new Error(String(r.status));
    } catch {
      return NextResponse.json({ ok: false, error: "We couldn’t send that. Please try again, or email us." }, { status: 502 });
    }
  } else {
    console.info("[enquiry] No ENQUIRY_WEBHOOK_URL set. Enquiry received:", JSON.stringify(enquiry));
  }
  return NextResponse.json({ ok: true });
}
