"use client";

import { ReactNode } from "react";
import { ShopCartProvider } from "./context/ShopCartContext";
import ShopNavbar from "./components/ShopNavbar";
import ShopCartDrawer from "./components/ShopCartDrawer";
import ShopFooter from "./components/ShopFooter";
import "./styles/ShopGlobals.css";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <ShopCartProvider>
      <ShopNavbar />
      <ShopCartDrawer />
      <main>{children}</main>
      <ShopFooter />
    </ShopCartProvider>
  );
}