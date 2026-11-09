import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Filip Grozdanov is a self-taught web developer building websites and web apps for small businesses and agencies. One person from first call to launch, a fixed price agreed upfront, and you own the code and the domain.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  // Checked when the page is built: the photo shows up automatically once
  // public/images/filip.jpg exists (rebuild/redeploy after adding it).
  const hasPhoto = fs.existsSync(
    path.join(process.cwd(), "public", site.about.photo)
  );

  return <AboutContent hasPhoto={hasPhoto} />;
}
