export type ContentType = "blog-intro" | "product-description" | "social-caption";

export interface BlogIntroFields {
  topic: string;
  audience: string;
  tone: string;
}

export interface ProductDescriptionFields {
  productName: string;
  keyFeatures: string;
  tone: string;
}

export interface SocialCaptionFields {
  platform: string;
  topic: string;
  tone: string;
}

export type ToneOption = "Professional" | "Casual" | "Playful" | "Persuasive";
export type PlatformOption = "Instagram" | "LinkedIn" | "Twitter/X";

const CLEAN_OUTPUT_INSTRUCTION =
  'Return ONLY the requested content itself. Do not include any preamble, introduction, explanation, labels, or commentary such as "Here\'s your intro:" or "Sure, here is...". Do not wrap the output in quotation marks. Output nothing except the final copy, ready to be copied and used as-is.';

export function buildPrompt(type: ContentType, fields: Record<string, string>): string {
  switch (type) {
    case "blog-intro":
      return buildBlogIntroPrompt(fields as unknown as BlogIntroFields);
    case "product-description":
      return buildProductDescriptionPrompt(fields as unknown as ProductDescriptionFields);
    case "social-caption":
      return buildSocialCaptionPrompt(fields as unknown as SocialCaptionFields);
    default:
      throw new Error(`Unknown content type: ${type}`);
  }
}

function buildBlogIntroPrompt(fields: BlogIntroFields): string {
  const { topic, audience, tone } = fields;
  return `Write a short, engaging blog post introduction (2-4 sentences) about the following topic: "${topic}".
Target audience: ${audience}.
Tone: ${tone}.
The introduction should hook the reader and make them want to keep reading.

${CLEAN_OUTPUT_INSTRUCTION}`;
}

function buildProductDescriptionPrompt(fields: ProductDescriptionFields): string {
  const { productName, keyFeatures, tone } = fields;
  return `Write a short, persuasive product description (2-4 sentences) for a product called "${productName}".
Key features/benefits to highlight: ${keyFeatures}.
Tone: ${tone}.
The description should be suitable for an e-commerce product page.

${CLEAN_OUTPUT_INSTRUCTION}`;
}

function buildSocialCaptionPrompt(fields: SocialCaptionFields): string {
  const { platform, topic, tone } = fields;
  return `Write a short social media caption for ${platform} about: "${topic}".
Tone: ${tone}.
Keep the length and style appropriate for ${platform} (concise for Twitter/X, slightly more relaxed for Instagram, more professional for LinkedIn). Include relevant hashtags only if appropriate for the platform.

${CLEAN_OUTPUT_INSTRUCTION}`;
}