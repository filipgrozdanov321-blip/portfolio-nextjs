"use client";

import { Check } from "lucide-react";
import "../styles/BookingStepIndicator.css";

interface BookingStepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}

const STEP_LABELS = ["Service", "Staff", "Time", "Details", "Confirm"];

export default function BookingStepIndicator({
  currentStep,
}: BookingStepIndicatorProps) {
  return (
    <nav className="booking-step-indicator" aria-label="Booking progress">
      {STEP_LABELS.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isLast = stepNumber === STEP_LABELS.length;

        return (
          <div key={label} className="booking-step-indicator-item">
            <div
              className={[
                "booking-step-indicator-circle",
                isCompleted ? "booking-step-indicator-circle--completed" : "",
                isActive ? "booking-step-indicator-circle--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isCompleted ? <Check size={14} /> : stepNumber}
            </div>
            <span
              className={[
                "booking-step-indicator-label",
                isActive ? "booking-step-indicator-label--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </span>
            {!isLast && (
              <div
                className={[
                  "booking-step-indicator-connector",
                  isCompleted
                    ? "booking-step-indicator-connector--completed"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
