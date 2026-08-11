import { Resend } from "resend";
import { NextResponse } from "next/server";
import { waitlistConfirmEmail } from "@/lib/waitlistConfirmEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEAM_NOTIFY = "info@dryamfoods.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !segmentId || !from) {
    return NextResponse.json(
      { error: "Email signup is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const { error: contactError } = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });

  // Already on the list is fine — still confirm and notify as needed
  const contactAlreadyExists =
    contactError?.message?.toLowerCase().includes("already exists") ||
    contactError?.message?.toLowerCase().includes("already been added");

  if (contactError && !contactAlreadyExists) {
    console.error("Resend contacts.create failed:", contactError.message);
    return NextResponse.json(
      { error: "Could not save your email. Please try again." },
      { status: 502 }
    );
  }

  const confirm = waitlistConfirmEmail();

  const { error: confirmError } = await resend.emails.send(
    {
      from,
      to: [email],
      replyTo: TEAM_NOTIFY,
      subject: "You're on the DRYAM FOODS list",
      html: confirm.html,
      text: confirm.text,
    },
    { idempotencyKey: `waitlist-confirm/v2/${email}` }
  );

  if (confirmError) {
    console.error("Resend confirmation email failed:", confirmError.message);
    return NextResponse.json(
      { error: "Could not send confirmation. Please try again." },
      { status: 502 }
    );
  }

  const { error: notifyError } = await resend.emails.send(
    {
      from,
      to: [TEAM_NOTIFY],
      subject: `Waitlist signup: ${email}`,
      html: `<p>New coming-soon waitlist signup:</p><p><strong>${email}</strong></p>`,
      text: `New coming-soon waitlist signup: ${email}`,
    },
    { idempotencyKey: `waitlist-notify/${email}` }
  );

  if (notifyError) {
    // Contact + confirmation already succeeded; log but don't fail the user
    console.error("Resend team notify failed:", notifyError.message);
  }

  return NextResponse.json({ ok: true });
}
