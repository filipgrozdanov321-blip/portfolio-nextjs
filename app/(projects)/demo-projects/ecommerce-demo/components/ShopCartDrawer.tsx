"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "../context/ShopCartContext";
import ShopCartLineItem from "./ShopCartLineItem";
import "../styles/ShopCartDrawer.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

export default function ShopCartDrawer() {
  const { items, subtotal, isDrawerOpen, closeDrawer } = useCart();

  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // While the drawer is open: Escape closes it, Tab stays inside it, the page
  // behind it can't scroll, and focus moves in. When it closes, focus goes back
  // to whatever opened it (the cart button).
  useEffect(() => {
    if (!isDrawerOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input, select, textarea"
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      <div
        className={`shop-cart-backdrop ${isDrawerOpen ? "shop-cart-backdrop-visible" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* A real dialog now: closed, it is hidden from the keyboard and screen
          readers (the CSS makes it "visibility: hidden" after the slide-out
          finishes). Before, a closed drawer was only moved off-screen, so Tab
          still stepped through its invisible buttons. */}
      <aside
        ref={drawerRef}
        className={`shop-cart-drawer ${isDrawerOpen ? "shop-cart-drawer-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isDrawerOpen}
      >
        <div className="shop-cart-drawer-header">
          <h2 className="shop-cart-drawer-title">Your Cart</h2>
          <button
            ref={closeRef}
            type="button"
            className="shop-cart-drawer-close"
            onClick={closeDrawer}
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="shop-cart-drawer-empty">
            <p>Your cart is empty.</p>
            <Link
              href={`${BASE_PATH}/products`}
              className="shop-cart-drawer-empty-link"
              onClick={closeDrawer}
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="shop-cart-drawer-items">
              {items.map((item) => (
                <ShopCartLineItem
                  key={`${item.product.slug}-${item.variant ?? "default"}`}
                  item={item}
                />
              ))}
            </div>

            <div className="shop-cart-drawer-footer">
              <div className="shop-cart-drawer-subtotal">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="shop-cart-drawer-shipping-note">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href={`${BASE_PATH}/checkout`}
                className="shop-cart-drawer-checkout-button"
                onClick={closeDrawer}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}