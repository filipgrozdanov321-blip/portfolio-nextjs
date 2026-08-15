"use client";

import BookingServiceCard from "./BookingServiceCard";
import type { Service } from "../data/bookingData";
import "../styles/BookingServiceStep.css";

interface BookingServiceStepProps {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

export default function BookingServiceStep({
  services,
  selectedService,
  onSelect,
  onNext,
}: BookingServiceStepProps) {
  return (
    <section
      className="booking-service-step"
      aria-labelledby="service-step-heading"
    >
      <h2 id="service-step-heading">Choose a service</h2>
      <p className="booking-step-subtitle">
        Select the service you&apos;d like to book.
      </p>

      <div className="booking-service-grid">
        {services.map((service) => (
          <BookingServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService?.id === service.id}
            onSelect={() => onSelect(service)}
          />
        ))}
      </div>

      <div className="booking-step-actions booking-step-actions--single">
        <button
          type="button"
          className="booking-btn-primary"
          onClick={onNext}
          disabled={!selectedService}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
