import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Body = {
  name?: string; firstName?: string; lastName?: string;
  email?: string; company?: string; role?: string;
  subject?: string; message?: string; kind?: "general" | "roster";
  // Honeypot — bots fill this; humans don't see it.
  website?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true }); // silently drop bots

  // Accept either `name` (legacy) or firstName/lastName (current form).
  const name = (body.name?.trim()) || [body.firstName, body.lastName].filter(Boolean).join(" ").trim();
  if (!body.email || !name) return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return NextResponse.json({ error: "Email looks invalid" }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "andrew@a-r.studio";
  const from = process.env.CONTACT_FROM_EMAIL || "andrew@a-r.studio";

  if (!apiKey) {
    // No Resend key yet — log to server and accept submission so the form
    // still works in dev. Replace with real send once the key is set.
    console.log("[contact] (no RESEND_API_KEY set) submission:", body);
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(apiKey);
  const subject = `[a-r.studio] ${body.kind === "roster" ? "Roster" : "Inquiry"} — ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${body.email}`,
    body.company && `Company: ${body.company}`,
    body.role && `Role: ${body.role}`,
    body.subject && `Subject: ${body.subject}`,
    "",
    "Message:",
    body.message || "(none)",
  ].filter(Boolean).join("\n");

  const { error } = await resend.emails.send({
    from: `A+R Studio <${from}>`,
    to: [to],
    replyTo: body.email,
    subject,
    text: lines,
  });

  if (error) {
    console.error("[contact] resend error:", error);
    return NextResponse.json({ error: "Could not send. Try emailing andrew@a-r.studio directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
