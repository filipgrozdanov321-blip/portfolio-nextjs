import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /robots.txt. The demos are NOT blocked here: they carry a noindex tag,
// and search engines can only see that tag if they're allowed to fetch the
// page. Only the API routes (contact form, WhatsApp redirect) are off limits.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
