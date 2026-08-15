"use client";

import { useEffect, useMemo, useState } from "react";
import BookingDateGrid from "./BookingDateGrid";
import BookingTimeSlotGrid from "./BookingTimeSlotGrid";
import { ALL_TIME_SLOTS, generateTimeSlots } from "../data/bookingData";
import "../styles/BookingDateTimeStep.css";

interface DayOption {
  iso: string;
  label: string;
  weekday: string;
}

interface BookingDateTimeStepProps {
  staffId: string;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDateTime: (date: string, time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function toLocalISODate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNext14Days(): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      iso: toLocalISODate(d),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }
  return days;
}

export default function BookingDateTimeStep({
  staffId,
  selectedDate,
  selectedTime,
  onSelectDateTime,
  onNext,
  onBack,
}: BookingDateTimeStepProps) {
  const days = useMemo(() => getNext14Days(), []);

  // "viewingDate" is which date's grid is currently being browsed. It's
  // separate from the committed selectedDate/selectedTime in the parent:
  // clicking a date only changes what you're looking at. A date/time
  // pair is only committed to parent state once an available time slot
  // is actually clicked (see BookingTimeSlotGrid's onSelectTime below).
  const [viewingDate, setViewingDate] = useState<string>(
    selectedDate ?? days[0].iso
  );

  // Re-sync only when the committed date changes from OUTSIDE this
  // component (e.g. going back to the staff step and picking someone
  // whose availability invalidates the old date, resetting it to null).
  // Browsing locally never touches selectedDate, so it won't re-trigger this.
  useEffect(() => {
    setViewingDate(selectedDate ?? days[0].iso);
  }, [selectedDate, days]);

  const availableTimes = useMemo(
    () => generateTimeSlots(viewingDate, staffId),
    [viewingDate, staffId]
  );

  const viewingDateLabel = useMemo(() => {
    const match = days.find((d) => d.iso === viewingDate);
    return match ? `${match.weekday}, ${match.label}` : "";
  }, [days, viewingDate]);

  const isViewingCommittedDate = viewingDate === selectedDate;
  const canProceed = isViewingCommittedDate && !!selectedTime;

  return (
    <section
      className="booking-datetime-step"
      aria-labelledby="datetime-step-heading"
    >
      <h2 id="datetime-step-heading">Choose a date &amp; time</h2>
      <p className="booking-step-subtitle">
        Pick a day, then an available time slot.
      </p>

      <div className="booking-datetime-section">
        <h3 className="booking-datetime-section-title">Date</h3>
        <BookingDateGrid
          days={days}
          activeDate={viewingDate}
          onSelectDate={setViewingDate}
        />
      </div>

      <div className="booking-datetime-section">
        <h3 className="booking-datetime-section-title">
          Times for {viewingDateLabel}
        </h3>
        <BookingTimeSlotGrid
          allSlots={ALL_TIME_SLOTS}
          availableSlots={availableTimes}
          selectedTime={isViewingCommittedDate ? selectedTime : null}
          onSelectTime={(time) => onSelectDateTime(viewingDate, time)}
        />
      </div>

      <div className="booking-step-actions">
        <button type="button" className="booking-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="booking-btn-primary"
          onClick={onNext}
          disabled={!canProceed}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
