"use client";

import { useState, FormEvent } from "react";
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

  const validate = (): boolean => {
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

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <form className="shop-shipping-form" onSubmit={handleSubmit} noValidate>
      <h2 className="shop-shipping-form-heading">Shipping Information</h2>

      <div className="shop-shipping-form-field">
        <label htmlFor="fullName" className="shop-shipping-form-label">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          className="shop-shipping-form-input"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        {errors.fullName && (
          <span className="shop-shipping-form-error">{errors.fullName}</span>
        )}
      </div>

      <div className="shop-shipping-form-field">
        <label htmlFor="email" className="shop-shipping-form-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="shop-shipping-form-input"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && (
          <span className="shop-shipping-form-error">{errors.email}</span>
        )}
      </div>

      <div className="shop-shipping-form-field">
        <label htmlFor="address" className="shop-shipping-form-label">
          Address
        </label>
        <input
          id="address"
          type="text"
          className="shop-shipping-form-input"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        {errors.address && (
          <span className="shop-shipping-form-error">{errors.address}</span>
        )}
      </div>

      <div className="shop-shipping-form-row">
        <div className="shop-shipping-form-field">
          <label htmlFor="city" className="shop-shipping-form-label">
            City
          </label>
          <input
            id="city"
            type="text"
            className="shop-shipping-form-input"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          {errors.city && (
            <span className="shop-shipping-form-error">{errors.city}</span>
          )}
        </div>

        <div className="shop-shipping-form-field">
          <label htmlFor="postalCode" className="shop-shipping-form-label">
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            className="shop-shipping-form-input"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
          {errors.postalCode && (
            <span className="shop-shipping-form-error">{errors.postalCode}</span>
          )}
        </div>
      </div>

      <div className="shop-shipping-form-field">
        <label htmlFor="country" className="shop-shipping-form-label">
          Country
        </label>
        <input
          id="country"
          type="text"
          className="shop-shipping-form-input"
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value)}
        />
        {errors.country && (
          <span className="shop-shipping-form-error">{errors.country}</span>
        )}
      </div>

      <button type="submit" className="shop-shipping-form-submit">
        Continue to Payment
      </button>
    </form>
  );
}