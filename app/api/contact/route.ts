import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// How the contact form works:
// 1. ContactForm (components/ComponentsUsedAroundTheWebSite/ContactForm)
//    POSTs the fields as JSON to this route.
// 2. This route checks them, then sends ONE email through Gmail's SMTP
//    server, using GMAIL_USER and GMAIL_APP_PASSWORD (.env.local locally,
//    Vercel project settings → Environment Variables in production).
// 3. The email goes to your own inbox (GMAIL_USER), with Reply-To set to the
//    visitor, so you can answer with a normal reply.
// Nothing is stored on the server or in a database.

const LIMITS = {
  name: 200,
  email: 320,
  projectType: 100,
  budget: 100,
  timeline: 100,
  message: 5000,
} as const;

type Field = keyof typeof LIMITS;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(body: Record<string, unknown>, field: Field) {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Spam trap: the form has a hidden field people never see. Bots fill it
  // in. Pretend it worked, so the bot has no reason to try again.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const fields = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((field) => [field, readField(body, field)])
  ) as Record<Field, string>;

  if (!fields.name || !fields.email || !fields.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(fields.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  for (const field of Object.keys(LIMITS) as Field[]) {
    if (fields[field].length > LIMITS[field]) {
      return NextResponse.json({ error: `${field} is too long.` }, { status: 400 });
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: fields.email,
      subject: `New project inquiry from ${fields.name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${fields.name}
Email: ${fields.email}
Project Type: ${fields.projectType || "Not specified"}
Budget: ${fields.budget || "Not specified"}
Timeline: ${fields.timeline || "Not specified"}

Message:
${fields.message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
