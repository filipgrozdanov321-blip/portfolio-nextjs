import type { Metadata } from "next";
import RealEstateAgentBio from "../components/RealEstateAgentBio";

export const metadata: Metadata = {
  title: "About | Meridian Realty",
  description: "Meet Alex Whitfield, listing agent at Meridian Realty in Austin, TX.",
};

export default function RealEstateAboutPage() {
  return <RealEstateAgentBio />;
}