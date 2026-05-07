import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Roster signups feed the existing "Site Freelancer Roster" Google Sheet
// via a small Apps Script Web App. The script reads the header row and
// places each form field in the column whose header matches — so renaming
// or reordering columns in the sheet won't break it. Manual columns
// (Discipline, Rating, US Based, etc.) are left blank for triage.
//
// === SETUP (one-time, by the sheet owner) ===
//
// 1. Open the "Site Freelancer Roster" Google Sheet.
// 2. Extensions → Apps Script (a new tab opens).
// 3. Replace the contents of Code.gs with:
//
//    const SHEET_NAME = "Roster";
//
//    function doPost(e) {
//      const body = JSON.parse(e.postData.contents);
//      const ss = SpreadsheetApp.getActiveSpreadsheet();
//      const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
//      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//
//      const fullName = [body.firstName, body.lastName].filter(Boolean).join(" ").trim();
//      // Header text → value. Header text must match the sheet exactly
//      // (case-insensitive). Headers without a mapping stay blank for
//      // manual triage (Discipline, Rating, US Based, etc).
//      const map = {
//        "Name":              fullName,
//        "Area of Expertise": body.expertise || "",
//        "Email":             body.email     || "",
//        "LinkedIn Profile":  body.linkedin  || "",
//        "Portfolio Site":    body.portfolio || "",
//        "Submitted On":      new Date(),
//        "Message":           body.message   || "",
//      };
//
//      const lookup = {};
//      Object.keys(map).forEach(k => { lookup[k.toLowerCase()] = map[k]; });
//      const row = headers.map(h => {
//        const v = lookup[String(h || "").trim().toLowerCase()];
//        return v === undefined ? "" : v;
//      });
//      sheet.appendRow(row);
//      return ContentService
//        .createTextOutput(JSON.stringify({ ok: true }))
//        .setMimeType(ContentService.MimeType.JSON);
//    }
//
// 4. Click Deploy → New deployment → choose type "Web app".
//    - "Execute as": Me
//    - "Who has access": Anyone
//    - Click Deploy. Authorize when prompted.
// 5. Copy the Web app URL (ends in /exec).
// 6. In Vercel → Settings → Environment Variables, add:
//      GOOGLE_SHEET_ROSTER_URL = <the /exec URL>
//    Mark as Sensitive. Redeploy.
//
// Until that env var is set, this endpoint returns a friendly error so we
// don't silently swallow signups.

type Body = {
  firstName?: string;
  lastName?: string;
  expertise?: string;
  email?: string;
  linkedin?: string;
  portfolio?: string;
  message?: string;
  // honeypot
  website?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  // Bots fill the hidden honeypot. Silently accept without forwarding.
  if (body.website) return NextResponse.json({ ok: true });

  // Required-field validation
  const missing = (["firstName", "lastName", "expertise", "email", "linkedin"] as const)
    .filter((k) => !body[k]?.trim());
  if (missing.length) {
    return NextResponse.json({ error: `Missing required: ${missing.join(", ")}` }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
    return NextResponse.json({ error: "Email looks invalid" }, { status: 400 });
  }
  if (!/^https?:\/\//i.test(body.linkedin!)) {
    return NextResponse.json({ error: "LinkedIn must be a full URL (https://…)" }, { status: 400 });
  }

  const sheetUrl = process.env.GOOGLE_SHEET_ROSTER_URL;
  if (!sheetUrl) {
    console.warn("[roster] GOOGLE_SHEET_ROSTER_URL not configured. Submission:", body);
    return NextResponse.json(
      { error: "Roster signup is not yet configured. Email andrew@a-r.studio with your details." },
      { status: 503 },
    );
  }

  const payload = {
    firstName: (body.firstName || "").trim(),
    lastName:  (body.lastName  || "").trim(),
    expertise: (body.expertise || "").trim(),
    email:     (body.email     || "").trim(),
    linkedin:  (body.linkedin  || "").trim(),
    portfolio: (body.portfolio || "").trim(),
    message:   (body.message   || "").trim(),
  };

  try {
    const res = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script web apps redirect once; fetch follows by default.
      redirect: "follow",
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      console.error("[roster] Apps Script returned", res.status, txt);
      return NextResponse.json({ error: "Sheet write failed. Try again or email us." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[roster] fetch failed:", err);
    return NextResponse.json({ error: "Could not reach the sheet. Try again later." }, { status: 502 });
  }
}
