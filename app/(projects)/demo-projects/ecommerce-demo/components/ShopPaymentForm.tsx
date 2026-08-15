"use client";

import { useState, FormEvent } from "react";
import { Lock } from "lucide-react";
import "../styles/ShopPaymentForm.css";

export interface PaymentData {
  cardholderName: string;
  cardNumberLast4: string;
}

type PaymentErrors = {
  cardholderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
};

interface ShopPaymentFormProps {
  onNext: (data: PaymentData) => void;
  onBack: () => void;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function ShopPaymentForm({ onNext, onBack }: ShopPaymentFormProps) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<PaymentErrors>({});

  const validate = (): boolean => {
    const nextErrors: PaymentErrors = {};
    const digitsOnly = cardNumber.replace(/\D/g, "");

    if (!cardholderName.trim()) {
      nextErrors.cardholderName = "Name on card is required";
    }
    if (digitsOnly.length !== 16) {
      nextErrors.cardNumber = "Enter a 16-digit card number";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      nextErrors.expiry = "Use MM/YY format";
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      nextErrors.cvc = "Enter a valid CVC";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const digitsOnly = cardNumber.replace(/\D/g, "");
      onNext({
        cardholderName,
        cardNumberLast4: digitsOnly.slice(-4),
      });
    }
  };

  return (
    <form className="shop-payment-form" onSubmit={handleSubmit} noValidate>
      <h2 className="shop-payment-form-heading">Payment</h2>

      <div className="shop-payment-form-demo-note">
        <Lock size={14} strokeWidth={2} />
        <span>Demo only — no real payment is processed.</span>
      </div>

      <div className="shop-payment-form-field">
        <label htmlFor="cardholderName" className="shop-payment-form-label">
          Name on Card
        </label>
        <input
          id="cardholderName"
          type="text"
          className="shop-payment-form-input"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          autoComplete="off"
        />
        {errors.cardholderName && (
          <span className="shop-payment-form-error">{errors.cardholderName}</span>
        )}
      </div>

      <div className="shop-payment-form-field">
        <label htmlFor="cardNumber" className="shop-payment-form-label">
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          inputMode="numeric"
          placeholder="0000 0000 0000 0000"
          className="shop-payment-form-input"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          autoComplete="off"
        />
        {errors.cardNumber && (
          <span className="shop-payment-form-error">{errors.cardNumber}</span>
        )}
      </div>

      <div className="shop-payment-form-row">
        <div className="shop-payment-form-field">
          <label htmlFor="expiry" className="shop-payment-form-label">
            Expiry
          </label>
          <input
            id="expiry"
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            className="shop-payment-form-input"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            autoComplete="off"
          />
          {errors.expiry && (
            <span className="shop-payment-form-error">{errors.expiry}</span>
          )}
        </div>

        <div className="shop-payment-form-field">
          <label htmlFor="cvc" className="shop-payment-form-label">
            CVC
          </label>
          <input
            id="cvc"
            type="text"
            inputMode="numeric"
            placeholder="123"
            className="shop-payment-form-input"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            autoComplete="off"
          />
          {errors.cvc && <span className="shop-payment-form-error">{errors.cvc}</span>}
        </div>
      </div>

      <div className="shop-payment-form-actions">
        <button
          type="button"
          className="shop-payment-form-back"
          onClick={onBack}
        >
          Back
        </button>
        <button type="submit" className="shop-payment-form-submit">
          Review Order
        </button>
      </div>
    </form>
  );
}