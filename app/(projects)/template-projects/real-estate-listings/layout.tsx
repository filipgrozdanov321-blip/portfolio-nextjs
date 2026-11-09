import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import RealEstateNavbar from "./components/RealEstateNavbar";
import RealEstateFooter from "./components/RealEstateFooter";
import "./styles/RealEstateGlobals.css";

// Self-hosted by Next.js at build time: visitors never connect to Google
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Meridian Realty | Austin Real Estate",
  description:
    "Demo website for Meridian Realty, a fictional real estate agency in Austin, TX: property search, filters and listing pages. Sample data only.",
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
    <div className={`realestate-root ${inter.variable} ${jakarta.variable}`}>
      <RealEstateNavbar />
      <main className="realestate-main">{children}</main>
      <RealEstateFooter />
    </div>
  );
}
