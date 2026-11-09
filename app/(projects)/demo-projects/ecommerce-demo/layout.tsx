import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import { ShopCartProvider } from "./context/ShopCartContext";
import ShopNavbar from "./components/ShopNavbar";
import ShopCartDrawer from "./components/ShopCartDrawer";
import ShopFooter from "./components/ShopFooter";
import "./styles/ShopGlobals.css";

// Self-hosted by Next.js at build time: visitors never connect to Google
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Norrland E-commerce Demo",
  description:
    "An e-commerce demo for a fictional homeware shop: product filters, product pages, cart and a three-step checkout. No real orders or payments.",
};

// A server layout: the cart provider, navbar, drawer and footer are client
// components themselves, so this file doesn't need "use client".
export default function ShopLayout({ children }: { children: ReactNode }) {
  // The "shop-root" wrapper is what keeps this demo's global styles (variables,
  // box-sizing, link and button resets, the font) from leaking onto the rest
  // of the site. The drawer is inside it too, so it sees the same variables.
  return (
    <div className={`shop-root ${manrope.variable}`}>
      <ShopCartProvider>
        <ShopNavbar />
        <ShopCartDrawer />
        <main className="shop-main">{children}</main>
        <ShopFooter />
      </ShopCartProvider>
    </div>
  );
}
