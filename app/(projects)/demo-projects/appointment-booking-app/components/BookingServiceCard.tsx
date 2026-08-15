"use client";

import { Check } from "lucide-react";
import type { Service } from "../data/bookingData";
import "../styles/BookingServiceCard.css";

interface BookingServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BookingServiceCard({
  service,
  isSelected,
  onSelect,
}: BookingServiceCardProps) {
  return (
    <button
      type="button"
      className={`booking-service-card${
        isSelected ? " booking-service-card--selected" : ""
      }`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <span className="booking-service-card-check">
          <Check size={14} />
        </span>
      )}
      <span className="booking-service-card-name">{service.name}</span>
      <span className="booking-service-card-meta">
        {service.duration} min ·{" "}
        {service.price === 0 ? "Free" : `$${service.price}`}
      </span>
      <span className="booking-service-card-description">
        {service.description}
      </span>
    </button>
  );
}
