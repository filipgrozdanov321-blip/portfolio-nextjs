import type { Metadata } from "next";
import DemoBanner from "@/components/ComponentsUsedAroundTheWebSite/DemoBanner/DemoBanner";

// Every demo uses a fictional business with made-up data (an "Austin real
// estate agency", a "homeware shop"). Keeping them out of search results
// stops those businesses from showing up in Google as if they were real.
// The /projects page, which explains them, is what should rank instead.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: {
    template: "%s · Demo by Filip Grozdanov",
    default: "Demo by Filip Grozdanov",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoBanner />
      {children}
    </>
  );
}
