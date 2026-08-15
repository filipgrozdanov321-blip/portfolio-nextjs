"use client";

import { Check } from "lucide-react";
import { isNoPreference } from "../data/bookingData";
import type { CustomerDetails, Service, StaffMember } from "../data/bookingData";
import "../styles/BookingConfirmStep.css";

interface ConfirmedBooking {
  service: Service;
  staff: StaffMember;
  date: string;
  time: string;
  customerDetails: CustomerDetails;
}

interface BookingConfirmStepProps {
  booking: ConfirmedBooking;
  onConfirm: () => void;
  onBack: () => void;
}

function formatFullDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function BookingConfirmStep({
  booking,
  onConfirm,
  onBack,
}: BookingConfirmStepProps) {
  const { service, staff, date, time, customerDetails } = booking;

  return (
    <section
      className="booking-confirm-step"
      aria-labelledby="confirm-step-heading"
    >
      <h2 id="confirm-step-heading">Review &amp; confirm</h2>
      <p className="booking-step-subtitle">
        Please check the details below before confirming.
      </p>

      <div className="booking-confirm-card">
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">Service</span>
          <span className="booking-confirm-value">{service.name}</span>
        </div>
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">With</span>
          <span className="booking-confirm-value">
            {isNoPreference(staff) ? "No preference" : staff.name}
          </span>
        </div>
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">When</span>
          <span className="booking-confirm-value">
            {formatFullDate(date)} at {time}
          </span>
        </div>
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">Duration</span>
          <span className="booking-confirm-value">{service.duration} min</span>
        </div>
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">Price</span>
          <span className="booking-confirm-value">
            {service.price === 0 ? "Free" : `$${service.price}`}
          </span>
        </div>

        <div className="booking-confirm-divider" />

        <div className="booking-confirm-row">
          <span className="booking-confirm-label">Name</span>
          <span className="booking-confirm-value">{customerDetails.name}</span>
        </div>
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">Email</span>
          <span className="booking-confirm-value">{customerDetails.email}</span>
        </div>
        <div className="booking-confirm-row">
          <span className="booking-confirm-label">Phone</span>
          <span className="booking-confirm-value">{customerDetails.phone}</span>
        </div>
        {customerDetails.notes && (
          <div className="booking-confirm-row">
            <span className="booking-confirm-label">Notes</span>
            <span className="booking-confirm-value">
              {customerDetails.notes}
            </span>
          </div>
        )}
      </div>

      <div className="booking-step-actions">
        <button type="button" className="booking-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="booking-btn-primary" onClick={onConfirm}>
          <Check size={18} />
          Confirm appointment
        </button>
      </div>
    </section>
  );
}
