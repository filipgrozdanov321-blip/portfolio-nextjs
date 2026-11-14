import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import AboutContent from "./AboutContent";

export const metadata: Metadata = pageMetadata({
  title: "About Filip Grozdanov | Web developer in Kranj, Slovenia",
  description:
    "Filip Grozdanov is a web developer based in Kranj, Slovenia, building fast websites and web apps for small businesses and doing development work for agencies.",
  path: "/about",
  absoluteTitle: true,
});

export default function AboutPage() {
  return <AboutContent />;
}
