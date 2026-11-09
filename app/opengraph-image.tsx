import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_HOST, site } from "@/lib/site";

// The preview image shown when the site is shared (WhatsApp, LinkedIn,
// Slack, X...). Generated once at build time from lib/site.ts, so it stays
// in sync with the headline and price. Every page uses it.
export const alt = `${site.name}: ${site.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#1b1b1b",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(0, 123, 255, 0.35), transparent 55%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
          <img src={logoSrc} width={88} height={88} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</span>
            <span style={{ fontSize: 24, color: "#bdbdbd" }}>Web developer</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            {site.headline}
          </span>
          <span style={{ fontSize: 30, color: "#d6d6d6" }}>
            Booking systems · Online shops · Dashboards
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              display: "flex",
              padding: "14px 28px",
              borderRadius: 10,
              backgroundImage: "linear-gradient(135deg, #FFEB3B, #FFB300)",
              color: "#111111",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            Websites from {site.pricing.websitesFrom}
          </span>
          <span style={{ fontSize: 26, color: "#bdbdbd" }}>{SITE_HOST}</span>
        </div>
      </div>
    ),
    size
  );
}
