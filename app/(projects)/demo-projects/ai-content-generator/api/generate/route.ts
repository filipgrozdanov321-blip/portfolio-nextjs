// app/(projects)/demo-projects/ai-content-generator/api/generate/route.ts
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildPrompt, ContentType } from "../../lib/promptTemplates";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env automatically — NEVER hardcode a key here

const VALID_TYPES: ContentType[] = ["blog-intro", "product-description", "social-caption"];

const requestLog = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 8;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now > entry.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  const { type, fields } = await req.json();

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 400 });
  }

  if (!fields || typeof fields !== "object") {
    return NextResponse.json({ error: "Missing form fields." }, { status: 400 });
  }

  for (const key in fields) {
    if (typeof fields[key] === "string" && fields[key].length > 300) {
      return NextResponse.json({ error: "One of your inputs is too long." }, { status: 400 });
    }
  }

  const prompt = buildPrompt(type, fields);

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    const result = textBlock && "text" in textBlock ? textBlock.text : "";

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json(
      { error: "Something went wrong generating content." },
      { status: 500 }
    );
  }
}