import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ServicesContent from "./ServicesContent";

// Server component, so it can set the page's title and description. The
// page itself (with its scroll animations) is a client component, which
// Next.js still renders to HTML on the server.
export const metadata: Metadata = pageMetadata({
  title: "Services and Pricing",
  description:
    "Business websites from €700 (up to 5 pages, custom design, works on phones, contact form, basic SEO, launch on your domain) and custom web apps: booking systems, online shops and dashboards.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
