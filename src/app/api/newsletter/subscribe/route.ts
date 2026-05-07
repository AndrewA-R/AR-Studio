import { NextResponse } from "next/server";
import crypto from "node:crypto";

// Mailchimp Marketing API: members endpoint with PUT (idempotent upsert by md5(email)).
// Env vars (set in Vercel + .env.local):
//   MAILCHIMP_API_KEY         — token from Mailchimp → Account → Extras → API keys
//   MAILCHIMP_LIST_ID         — Audience ID (Audience → Settings → Audience name & defaults)
//   MAILCHIMP_DC              — datacenter prefix; the part after the dash in your API key (e.g. "us21")
export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const dc = process.env.MAILCHIMP_DC || apiKey?.split("-")[1];

  if (!apiKey || !listId || !dc) {
    console.warn("[newsletter] Mailchimp env vars missing");
    return NextResponse.json(
      { error: "Newsletter signup is not yet configured. Email andrew@a-r.studio to subscribe." },
      { status: 503 },
    );
  }

  const memberHash = crypto.createHash("md5").update(email).digest("hex");
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${memberHash}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({ email_address: email, status_if_new: "pending" }),
  });

  if (res.ok) {
    return NextResponse.json({ message: "Thanks — check your inbox to confirm." });
  }

  const errBody = await res.json().catch(() => ({}));
  // Mailchimp returns 400 with title "Member Exists" if already subscribed
  if (errBody?.title === "Member Exists") {
    return NextResponse.json({ message: "You're already on the list — thanks." });
  }
  console.warn("[newsletter] Mailchimp error", res.status, errBody);
  return NextResponse.json(
    { error: errBody?.detail || "Couldn't subscribe right now. Please try again." },
    { status: 500 },
  );
}
