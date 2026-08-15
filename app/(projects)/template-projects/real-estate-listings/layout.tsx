import type { Metadata } from "next";
import RealEstateNavbar from "./components/RealEstateNavbar";
import RealEstateFooter from "./components/RealEstateFooter";
import "./styles/RealEstateGlobals.css";

export const metadata: Metadata = {
  title: "Meridian Realty | Austin Real Estate",
  description:
    "Meridian Realty is a residential real estate agency serving Austin, TX, offering straightforward pricing and local expertise.",
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <RealEstateNavbar />
      <main style={{ flex: 1 }}>{children}</main>
      <RealEstateFooter />
    </div>
  );
}