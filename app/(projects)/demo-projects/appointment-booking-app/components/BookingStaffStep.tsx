"use client";

import BookingStaffCard from "./BookingStaffCard";
import { NO_PREFERENCE_STAFF } from "../data/bookingData";
import type { StaffMember } from "../data/bookingData";
import "../styles/BookingStaffStep.css";

interface BookingStaffStepProps {
  eligibleStaff: StaffMember[];
  selectedStaff: StaffMember | null;
  onSelect: (staff: StaffMember) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BookingStaffStep({
  eligibleStaff,
  selectedStaff,
  onSelect,
  onNext,
  onBack,
}: BookingStaffStepProps) {
  return (
    <section className="booking-staff-step" aria-labelledby="staff-step-heading">
      <h2 id="staff-step-heading">Choose a staff member</h2>
      <p className="booking-step-subtitle">
        Pick someone specific, or let us assign the first available person.
      </p>

      <div className="booking-staff-grid">
        <BookingStaffCard
          staff={NO_PREFERENCE_STAFF}
          isSelected={selectedStaff?.id === NO_PREFERENCE_STAFF.id}
          onSelect={() => onSelect(NO_PREFERENCE_STAFF)}
        />
        {eligibleStaff.map((staff) => (
          <BookingStaffCard
            key={staff.id}
            staff={staff}
            isSelected={selectedStaff?.id === staff.id}
            onSelect={() => onSelect(staff)}
          />
        ))}
      </div>

      <div className="booking-step-actions">
        <button type="button" className="booking-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="booking-btn-primary"
          onClick={onNext}
          disabled={!selectedStaff}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
