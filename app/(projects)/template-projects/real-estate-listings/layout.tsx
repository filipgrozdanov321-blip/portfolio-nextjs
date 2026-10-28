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
  // The flex column + full-height styles that used to be inline now live in
  // RealEstateGlobals.css (.realestate-root and .realestate-main). The
  // "realestate-root" class is also what keeps all of this template's global
  // styles from leaking onto the rest of the site.
  return (
    <div className="realestate-root">
      <RealEstateNavbar />
      <main className="realestate-main">{children}</main>
      <RealEstateFooter />
    </div>
  );
}