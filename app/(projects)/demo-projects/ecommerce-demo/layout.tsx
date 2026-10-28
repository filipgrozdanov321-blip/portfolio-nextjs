"use client";

import { ReactNode } from "react";
import { ShopCartProvider } from "./context/ShopCartContext";
import ShopNavbar from "./components/ShopNavbar";
import ShopCartDrawer from "./components/ShopCartDrawer";
import ShopFooter from "./components/ShopFooter";
import "./styles/ShopGlobals.css";

export default function ShopLayout({ children }: { children: ReactNode }) {
  // The "shop-root" wrapper is what keeps this demo's global styles (variables,
  // box-sizing, link and button resets, the font) from leaking onto the rest
  // of the site. The drawer is inside it too, so it sees the same variables.
  return (
    <div className="shop-root">
      <ShopCartProvider>
        <ShopNavbar />
        <ShopCartDrawer />
        <main className="shop-main">{children}</main>
        <ShopFooter />
      </ShopCartProvider>
    </div>
  );
}