import type { Metadata } from "next";
import StartupOriginStory from "../components/StartupOriginStory";

export const metadata: Metadata = {
  title: "Our Story — Rivet",
  description:
    "How two engineers who kept getting paged for the wrong things built the on-call tool they wished they had.",
};

export default function StartupStoryPage() {
  return <StartupOriginStory />;
}