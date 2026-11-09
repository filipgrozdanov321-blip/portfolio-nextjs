import type { Metadata } from "next";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";
import ScrollManager from "./ScrollManager";

// Site-wide defaults. Every page sets its own title and description
// (see lib/metadata.ts); this fills in anything a page leaves out.
export const metadata: Metadata = {
  // All relative URLs in metadata (canonical, Open Graph image...) are made
  // absolute with this. Change SITE_URL in lib/site.ts to move domains.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} | ${site.headline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
