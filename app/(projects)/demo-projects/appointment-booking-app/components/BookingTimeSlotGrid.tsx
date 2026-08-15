"use client";

import "../styles/BookingTimeSlotGrid.css";

interface BookingTimeSlotGridProps {
  allSlots: string[];
  availableSlots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function BookingTimeSlotGrid({
  allSlots,
  availableSlots,
  selectedTime,
  onSelectTime,
}: BookingTimeSlotGridProps) {
  const availableSet = new Set(availableSlots);

  if (availableSlots.length === 0) {
    return (
      <p className="booking-timeslot-empty">
        No times available on this date. Try another day.
      </p>
    );
  }

  return (
    <div
      className="booking-timeslot-grid"
      role="listbox"
      aria-label="Select a time"
    >
      {allSlots.map((slot) => {
        const isAvailable = availableSet.has(slot);
        const isSelected = slot === selectedTime;
        return (
          <button
            key={slot}
            type="button"
            role="option"
            aria-selected={isSelected}
            disabled={!isAvailable}
            className={[
              "booking-timeslot-pill",
              isSelected ? "booking-timeslot-pill--selected" : "",
              !isAvailable ? "booking-timeslot-pill--unavailable" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelectTime(slot)}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
