"use client";

import { CircleCheck, RotateCcw } from "lucide-react";
import type { BookingState } from "../page";
import "../styles/BookingSuccessScreen.css";

interface BookingSuccessScreenProps {
  booking: BookingState;
  onReset: () => void;
}

function formatFullDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function BookingSuccessScreen({
  booking,
  onReset,
}: BookingSuccessScreenProps) {
  const { service, date, time } = booking;

  return (
    <div className="booking-success-screen">
      <CircleCheck className="booking-success-icon" size={56} />
      <h2>You&apos;re booked!</h2>
      <p className="booking-success-message">
        {service &&
          `Your ${service.name.toLowerCase()} is confirmed${
            date && time ? ` for ${time} on ${formatFullDate(date)}` : ""
          }.`}
      </p>
      <p className="booking-success-note">
        This is a demo — no real appointment has been booked and no data
        has been sent anywhere.
      </p>
      <button type="button" className="booking-btn-primary" onClick={onReset}>
        <RotateCcw size={18} />
        Book another appointment
      </button>
    </div>
  );
}
