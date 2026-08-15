"use client";

import "../styles/BookingDateGrid.css";

interface DayOption {
  iso: string;
  label: string;
  weekday: string;
}

interface BookingDateGridProps {
  days: DayOption[];
  activeDate: string;
  onSelectDate: (date: string) => void;
}

export default function BookingDateGrid({
  days,
  activeDate,
  onSelectDate,
}: BookingDateGridProps) {
  return (
    <div className="booking-date-grid" role="listbox" aria-label="Select a date">
      {days.map((day) => {
        const isActive = day.iso === activeDate;
        return (
          <button
            key={day.iso}
            type="button"
            role="option"
            aria-selected={isActive}
            className={`booking-date-cell${
              isActive ? " booking-date-cell--active" : ""
            }`}
            onClick={() => onSelectDate(day.iso)}
          >
            <span className="booking-date-weekday">{day.weekday}</span>
            <span className="booking-date-label">{day.label}</span>
          </button>
        );
      })}
    </div>
  );
}
