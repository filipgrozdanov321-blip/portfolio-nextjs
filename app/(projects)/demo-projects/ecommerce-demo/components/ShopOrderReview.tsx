"use client";

import Image from "next/image";
import { useCart } from "../context/ShopCartContext";
import type { ShippingData } from "./ShopShippingForm";
import type { PaymentData } from "./ShopPaymentForm";
import "../styles/ShopOrderReview.css";

export const FLAT_SHIPPING_FEE = 8;

interface ShopOrderReviewProps {
  shippingData: ShippingData;
  paymentData: PaymentData;
  onPlaceOrder: () => void;
  onBack: () => void;
}

export default function ShopOrderReview({
  shippingData,
  paymentData,
  onPlaceOrder,
  onBack,
}: ShopOrderReviewProps) {
  const { items, subtotal } = useCart();
  const total = subtotal + FLAT_SHIPPING_FEE;

  return (
    <div className="shop-order-review">
      <h2 className="shop-order-review-heading">Review Your Order</h2>

      <div className="shop-order-review-items">
        {items.map((item) => (
          <div
            key={`${item.product.slug}-${item.variant ?? "default"}`}
            className="shop-order-review-item"
          >
            <div className="shop-order-review-item-image-wrapper">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="shop-order-review-item-image"
                sizes="64px"
              />
            </div>
            <div className="shop-order-review-item-details">
              <span className="shop-order-review-item-name">
                {item.product.name}
              </span>
              {item.variant && (
                <span className="shop-order-review-item-variant">
                  {item.variant}
                </span>
              )}
              <span className="shop-order-review-item-qty">
                Qty {item.quantity}
              </span>
            </div>
            <span className="shop-order-review-item-price">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="shop-order-review-panels">
        <div className="shop-order-review-panel">
          <span className="shop-order-review-panel-label">Ship To</span>
          <p className="shop-order-review-panel-text">
            {shippingData.fullName}
            <br />
            {shippingData.address}
            <br />
            {shippingData.city}, {shippingData.postalCode}
            <br />
            {shippingData.country}
          </p>
        </div>

        <div className="shop-order-review-panel">
          <span className="shop-order-review-panel-label">Payment</span>
          <p className="shop-order-review-panel-text">
            {paymentData.cardholderName}
            <br />
            Card ending in {paymentData.cardNumberLast4}
          </p>
        </div>
      </div>

      <div className="shop-order-review-totals">
        <div className="shop-order-review-totals-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="shop-order-review-totals-row">
          <span>Shipping</span>
          <span>${FLAT_SHIPPING_FEE.toFixed(2)}</span>
        </div>
        <div className="shop-order-review-totals-row shop-order-review-totals-final">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="shop-order-review-actions">
        <button type="button" className="shop-order-review-back" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="shop-order-review-submit"
          onClick={onPlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}