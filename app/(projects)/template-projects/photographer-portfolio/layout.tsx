import type { Metadata } from "next";
import PhotographerNavbar from "./components/PhotographerNavbar";
import PhotographerFooter from "./components/PhotographerFooter";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Wren Ashby Photography",
  description:
    "Portrait, editorial, and personal branding photography by Wren Ashby.",
};

export default function PhotographerPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PhotographerNavbar />
      <main className="portfolio-main">{children}</main>
      <PhotographerFooter />
    </>
  );
}