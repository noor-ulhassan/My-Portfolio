import { Resend } from "resend";
import { profile } from "@/content/site";

// Email needs the Node runtime (Resend SDK isn't edge-compatible) and must
// never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Record<string, string>;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (name.length < 2) errors.name = "Please tell me your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10) errors.message = "Please add a little more detail.";
  return errors;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const data = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill the hidden `company` field. Pretend success, send nothing.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  const errors = validate(name, email, message);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not wired up yet — tell the client so it can fall back to a mailto link.
    return Response.json(
      { ok: false, code: "not_configured", error: "Email is not configured yet." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#221d18">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p style="margin:0 0 4px"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
          <hr style="border:none;border-top:1px solid #e0d6c3;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false, error: "Could not send the message." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ ok: false, error: "Could not send the message." }, { status: 502 });
  }
}
