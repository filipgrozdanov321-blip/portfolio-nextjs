"use client";

import { useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import "../styles/ShopShippingForm.css";

export interface ShippingData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const EMPTY_SHIPPING_DATA: ShippingData = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

// The order the fields appear in, so a failed submit can jump to the first one
const FIELD_ORDER: (keyof ShippingData)[] = [
  "fullName",
  "email",
  "address",
  "city",
  "postalCode",
  "country",
];

const fieldId = (field: keyof ShippingData) => `shop-shipping-${field}`;

type ShippingErrors = Partial<Record<keyof ShippingData, string>>;

interface ShopShippingFormProps {
  initialData?: ShippingData;
  onNext: (data: ShippingData) => void;
}

export default function ShopShippingForm({
  initialData,
  onNext,
}: ShopShippingFormProps) {
  const [formData, setFormData] = useState<ShippingData>(
    initialData ?? EMPTY_SHIPPING_DATA
  );
  const [errors, setErrors] = useState<ShippingErrors>({});

  const handleChange = (field: keyof ShippingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): ShippingErrors => {
    const nextErrors: ShippingErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!formData.address.trim()) nextErrors.address = "Address is required";
    if (!formData.city.trim()) nextErrors.city = "City is required";
    if (!formData.postalCode.trim()) nextErrors.postalCode = "Postal code is required";
    if (!formData.country.trim()) nextErrors.country = "Country is required";

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

    onNext(formData);
  };

  // One labeled field. The markup is the same as before; it was written out six
  // times. autoComplete lets the phone offer to fill the field in.
  const renderField = (
    field: keyof ShippingData,
    label: string,
    inputProps: Pick<
      InputHTMLAttributes<HTMLInputElement>,
      "type" | "autoComplete" | "inputMode"
    >
  ) => {
    const error = errors[field];
    return (
      <div className="shop-shipping-form-field">
        <label htmlFor={fieldId(field)} className="shop-shipping-form-label">
          {label}
        </label>
        <input
          id={fieldId(field)}
          className="shop-shipping-form-input"
          value={formData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId(field)}-error` : undefined}
          {...inputProps}
        />
        {error && (
          <span
            id={`${fieldId(field)}-error`}
            className="shop-shipping-form-error"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  };

  return (
    <form className="shop-shipping-form" onSubmit={handleSubmit} noValidate>
      <h2 className="shop-shipping-form-heading">Shipping Information</h2>

      {renderField("fullName", "Full Name", {
        type: "text",
        autoComplete: "name",
      })}

      {renderField("email", "Email", {
        type: "email",
        autoComplete: "email",
        inputMode: "email",
      })}

      {renderField("address", "Address", {
        type: "text",
        autoComplete: "street-address",
      })}

      <div className="shop-shipping-form-row">
        {renderField("city", "City", {
          type: "text",
          autoComplete: "address-level2",
        })}
        {renderField("postalCode", "Postal Code", {
          type: "text",
          autoComplete: "postal-code",
        })}
      </div>

      {renderField("country", "Country", {
        type: "text",
        autoComplete: "country-name",
      })}

      <button type="submit" className="shop-shipping-form-submit">
        Continue to Payment
      </button>
    </form>
  );
}