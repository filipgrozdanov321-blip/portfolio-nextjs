"use client";

import { isNoPreference } from "../data/bookingData";
import type { BookingState } from "../page";
import "../styles/BookingSummarySidebar.css";

interface BookingSummarySidebarProps {
  booking: BookingState;
  onEditStep: (step: BookingState["step"]) => void;
}

function formatShortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function BookingSummarySidebar({
  booking,
  onEditStep,
}: BookingSummarySidebarProps) {
  const { service, staff, date, time, customerDetails } = booking;

  return (
    <aside className="booking-summary-sidebar" aria-label="Booking summary">
      <h3>Your appointment</h3>

      {service && (
        <div className="booking-summary-item">
          <div className="booking-summary-item-header">
            <span className="booking-summary-item-label">Service</span>
            <button
              type="button"
              className="booking-summary-edit"
              onClick={() => onEditStep(1)}
            >
              Change
            </button>
          </div>
          <p className="booking-summary-item-value">{service.name}</p>
        </div>
      )}

      {staff && (
        <div className="booking-summary-item">
          <div className="booking-summary-item-header">
            <span className="booking-summary-item-label">Staff</span>
            <button
              type="button"
              className="booking-summary-edit"
              onClick={() => onEditStep(2)}
            >
              Change
            </button>
          </div>
          <p className="booking-summary-item-value">
            {isNoPreference(staff) ? "No preference" : staff.name}
          </p>
        </div>
      )}

      {date && time && (
        <div className="booking-summary-item">
          <div className="booking-summary-item-header">
            <span className="booking-summary-item-label">Date &amp; time</span>
            <button
              type="button"
              className="booking-summary-edit"
              onClick={() => onEditStep(3)}
            >
              Change
            </button>
          </div>
          <p className="booking-summary-item-value">
            {formatShortDate(date)} · {time}
          </p>
        </div>
      )}

      {customerDetails?.name && (
        <div className="booking-summary-item">
          <div className="booking-summary-item-header">
            <span className="booking-summary-item-label">Contact</span>
            <button
              type="button"
              className="booking-summary-edit"
              onClick={() => onEditStep(4)}
            >
              Change
            </button>
          </div>
          <p className="booking-summary-item-value">{customerDetails.name}</p>
        </div>
      )}

      {service && (
        <div className="booking-summary-total">
          <span>Total</span>
          <span>{service.price === 0 ? "Free" : `$${service.price}`}</span>
        </div>
      )}
    </aside>
  );
}
