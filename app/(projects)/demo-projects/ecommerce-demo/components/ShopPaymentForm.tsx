"use client";

import { useState } from "react";
import type { FormEvent } from "react";
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

// The order the fields appear in, so a failed submit can jump to the first one
const FIELD_ORDER: (keyof PaymentErrors)[] = [
  "cardholderName",
  "cardNumber",
  "expiry",
  "cvc",
];

const fieldId = (field: keyof PaymentErrors) => `shop-payment-${field}`;

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

  const validate = (): PaymentErrors => {
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

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    // On a phone the first problem can be scrolled out of sight, so the first
    // invalid field gets the focus (and the phone scrolls to it)
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    const digitsOnly = cardNumber.replace(/\D/g, "");
    onNext({
      cardholderName,
      cardNumberLast4: digitsOnly.slice(-4),
    });
  };

  // aria props shared by the four fields: mark a problem field and link it to
  // its message
  const a11y = (field: keyof PaymentErrors) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${fieldId(field)}-error` : undefined,
  });

  const renderError = (field: keyof PaymentErrors) =>
    errors[field] ? (
      <span
        id={`${fieldId(field)}-error`}
        className="shop-payment-form-error"
        role="alert"
      >
        {errors[field]}
      </span>
    ) : null;

  return (
    <form className="shop-payment-form" onSubmit={handleSubmit} noValidate>
      <h2 className="shop-payment-form-heading">Payment</h2>

      <div className="shop-payment-form-demo-note">
        <Lock size={14} strokeWidth={2} aria-hidden="true" />
        <span>Demo only — no real payment is processed.</span>
      </div>

      <div className="shop-payment-form-field">
        <label htmlFor={fieldId("cardholderName")} className="shop-payment-form-label">
          Name on Card
        </label>
        <input
          id={fieldId("cardholderName")}
          type="text"
          className="shop-payment-form-input"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          autoComplete="off"
          {...a11y("cardholderName")}
        />
        {renderError("cardholderName")}
      </div>

      <div className="shop-payment-form-field">
        <label htmlFor={fieldId("cardNumber")} className="shop-payment-form-label">
          Card Number
        </label>
        <input
          id={fieldId("cardNumber")}
          type="text"
          inputMode="numeric"
          placeholder="0000 0000 0000 0000"
          className="shop-payment-form-input"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          autoComplete="off"
          {...a11y("cardNumber")}
        />
        {renderError("cardNumber")}
      </div>

      <div className="shop-payment-form-row">
        <div className="shop-payment-form-field">
          <label htmlFor={fieldId("expiry")} className="shop-payment-form-label">
            Expiry
          </label>
          <input
            id={fieldId("expiry")}
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            className="shop-payment-form-input"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            autoComplete="off"
            {...a11y("expiry")}
          />
          {renderError("expiry")}
        </div>

        <div className="shop-payment-form-field">
          <label htmlFor={fieldId("cvc")} className="shop-payment-form-label">
            CVC
          </label>
          <input
            id={fieldId("cvc")}
            type="text"
            inputMode="numeric"
            placeholder="123"
            className="shop-payment-form-input"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            autoComplete="off"
            {...a11y("cvc")}
          />
          {renderError("cvc")}
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