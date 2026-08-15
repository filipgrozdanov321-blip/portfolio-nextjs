"use client";

import { Check, User } from "lucide-react";
import type { StaffMember } from "../data/bookingData";
import "../styles/BookingStaffCard.css";

interface BookingStaffCardProps {
  staff: StaffMember;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BookingStaffCard({
  staff,
  isSelected,
  onSelect,
}: BookingStaffCardProps) {
  return (
    <button
      type="button"
      className={`booking-staff-card${
        isSelected ? " booking-staff-card--selected" : ""
      }`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <span className="booking-staff-card-check">
          <Check size={12} />
        </span>
      )}
      <span className="booking-staff-card-avatar">
        <User size={22} />
      </span>
      <span className="booking-staff-card-name">{staff.name}</span>
      <span className="booking-staff-card-role">{staff.role}</span>
    </button>
  );
}
