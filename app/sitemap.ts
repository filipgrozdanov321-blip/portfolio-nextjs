import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /sitemap.xml: the portfolio's own pages. The demos are left out on
// purpose: they're marked noindex (fictional businesses), and /projects
// links to them.
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms-and-conditions", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map(({ path, priority }) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
