"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/ShopCartContext";
import ShopCheckoutSteps, {
  type CheckoutStep,
} from "../components/ShopCheckoutSteps";
import ShopShippingForm, {
  type ShippingData,
} from "../components/ShopShippingForm";
import ShopPaymentForm, {
  type PaymentData,
} from "../components/ShopPaymentForm";
import ShopOrderReview from "../components/ShopOrderReview";
import ShopOrderConfirmation from "../components/ShopOrderConfirmation";
import "../styles/ShopCheckoutPage.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

function generateFakeOrderNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `NR-${random}`;
}

export default function ShopCheckoutPage() {
  const { items, clearCart } = useCart();

  const [step, setStep] = useState<CheckoutStep>(1);
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    email: string;
  } | null>(null);

  const handleShippingNext = (data: ShippingData) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentNext = (data: PaymentData) => {
    setPaymentData(data);
    setStep(3);
  };

  const handlePlaceOrder = () => {
    if (!shippingData) return;

    const orderNumber = generateFakeOrderNumber();
    setConfirmedOrder({ orderNumber, email: shippingData.email });
    clearCart();
  };

  // Order placed — replace the checkout UI entirely
  if (confirmedOrder) {
    return (
      <div className="shop-checkout-page shop-container">
        <ShopOrderConfirmation
          orderNumber={confirmedOrder.orderNumber}
          email={confirmedOrder.email}
        />
      </div>
    );
  }

  // Guard against an empty cart reaching checkout (e.g. direct URL visit)
  if (items.length === 0) {
    return (
      <div className="shop-checkout-page shop-container">
        <div className="shop-checkout-empty">
          <p>Your cart is empty.</p>
          <Link href={`${BASE_PATH}/products`} className="shop-checkout-empty-link">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-checkout-page shop-container">
      <h1 className="shop-checkout-page-heading">Checkout</h1>
      <ShopCheckoutSteps currentStep={step} />

      {step === 1 && (
        <ShopShippingForm
          initialData={shippingData ?? undefined}
          onNext={handleShippingNext}
        />
      )}

      {step === 2 && (
        <ShopPaymentForm onNext={handlePaymentNext} onBack={() => setStep(1)} />
      )}

      {step === 3 && shippingData && paymentData && (
        <ShopOrderReview
          shippingData={shippingData}
          paymentData={paymentData}
          onPlaceOrder={handlePlaceOrder}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}