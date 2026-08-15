"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "../context/ShopCartContext";
import ShopCartLineItem from "./ShopCartLineItem";
import "../styles/ShopCartDrawer.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

export default function ShopCartDrawer() {
  const { items, subtotal, isDrawerOpen, closeDrawer } = useCart();

  return (
    <>
      <div
        className={`shop-cart-backdrop ${isDrawerOpen ? "shop-cart-backdrop-visible" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className={`shop-cart-drawer ${isDrawerOpen ? "shop-cart-drawer-open" : ""}`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="shop-cart-drawer-header">
          <h2 className="shop-cart-drawer-title">Your Cart</h2>
          <button
            type="button"
            className="shop-cart-drawer-close"
            onClick={closeDrawer}
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.75} />
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