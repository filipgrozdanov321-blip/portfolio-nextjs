import { NextResponse } from "next/server";

export async function GET() {
  const number = process.env.WHATSAPP_NUMBER;
  const text = encodeURIComponent(
    "Hi Filip, I'm interested in a website for my business"
  );

  return NextResponse.redirect(`https://wa.me/${number}?text=${text}`);
}