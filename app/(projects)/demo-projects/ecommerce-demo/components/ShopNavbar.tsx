"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/ShopCartContext";
import "../styles/ShopNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

const BASE_PATH = "/demo-projects/ecommerce-demo";

export default function ShopNavbar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <header className="shop-navbar">
      <div className="shop-navbar-back-wrapper">
        <BackButton />
      </div>

      <div className="shop-navbar-inner">
        <Link href={BASE_PATH} className="shop-navbar-logo">
          Norrland
        </Link>

        <nav className="shop-navbar-links" aria-label="Main navigation">
          <Link href={`${BASE_PATH}/products`} className="shop-navbar-link">
            Shop
          </Link>
        </nav>

        <button
          type="button"
          className="shop-navbar-cart-button"
          onClick={openDrawer}
          aria-label={
            itemCount > 0
              ? `Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`
              : "Open cart"
          }
        >
          <ShoppingBag size={20} strokeWidth={1.75} aria-hidden="true" />
          {itemCount > 0 && (
            <span className="shop-navbar-cart-badge" aria-hidden="true">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}