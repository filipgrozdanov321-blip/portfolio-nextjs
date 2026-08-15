"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import "../styles/ShopFooter.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

export default function ShopFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="shop-footer">
      <div className="shop-footer-inner shop-container">
        <div className="shop-footer-brand">
          <span className="shop-footer-logo">Norrland</span>
          <p className="shop-footer-blurb">
            Considered homeware for a quieter home. Kitchen, textiles,
            lighting, and decor — chosen with care, built to last.
          </p>
        </div>

        <div className="shop-footer-links">
          <span className="shop-footer-heading">Shop</span>
          <Link href={BASE_PATH} className="shop-footer-link">
            Home
          </Link>
          <Link href={`${BASE_PATH}/products`} className="shop-footer-link">
            All Products
          </Link>
        </div>

        <div className="shop-footer-newsletter">
          <span className="shop-footer-heading">Stay in the loop</span>
          {subscribed ? (
            <p className="shop-footer-newsletter-success">
              You're on the list — thank you.
            </p>
          ) : (
            <form className="shop-footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shop-footer-newsletter-input"
                aria-label="Email address"
              />
              <button type="submit" className="shop-footer-newsletter-button">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="shop-footer-bottom shop-container">
        <span className="shop-footer-copyright">
          © {new Date().getFullYear()} Norrland. All rights reserved.
        </span>
        <span className="shop-footer-demo-note">
          UI demo project — no real store, no real payments.
        </span>
      </div>
    </footer>
  );
}