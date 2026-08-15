"use client";

import { useCallback, useState } from "react";
import {
  Service,
  StaffMember,
  CustomerDetails,
  SERVICES,
  getEligibleStaff,
  generateTimeSlots,
  isNoPreference,
} from "./data/bookingData";
import BookingStepIndicator from "./components/BookingStepIndicator";
import BookingServiceStep from "./components/BookingServiceStep";
import BookingStaffStep from "./components/BookingStaffStep";
import BookingDateTimeStep from "./components/BookingDateTimeStep";
import BookingDetailsStep from "./components/BookingDetailsStep";
import BookingConfirmStep from "./components/BookingConfirmStep";
import BookingSummarySidebar from "./components/BookingSummarySidebar";
import BookingSuccessScreen from "./components/BookingSuccessScreen";

export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5;
  service: Service | null;
  staff: StaffMember | null;
  date: string | null;
  time: string | null;
  customerDetails: CustomerDetails | null;
}

const INITIAL_STATE: BookingState = {
  step: 1,
  service: null,
  staff: null,
  date: null,
  time: null,
  customerDetails: null,
};

export default function AppointmentBookingPage() {
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const goToStep = useCallback((step: BookingState["step"]) => {
    setBooking((prev) => ({ ...prev, step }));
  }, []);

  // Step 1 — service. Changing service only clears staff/date/time if
  // the previously chosen staff member can't actually perform the new
  // service. Customer details are never touched by an earlier-step change.
  const handleSelectService = useCallback((service: Service) => {
    setBooking((prev) => {
      if (prev.service?.id === service.id) return prev;

      const staffStillEligible =
        prev.staff === null ||
        isNoPreference(prev.staff) ||
        prev.staff.serviceIds.includes(service.id);

      if (staffStillEligible) {
        return { ...prev, service };
      }
      return { ...prev, service, staff: null, date: null, time: null };
    });
  }, []);

  // Step 2 — staff. Changing staff only clears date/time if the
  // previously chosen time isn't actually available for the new staff
  // member (checked against the same deterministic slot generator the
  // date/time grid itself uses).
  const handleSelectStaff = useCallback((staff: StaffMember) => {
    setBooking((prev) => {
      if (prev.staff?.id === staff.id) return prev;
      if (!prev.date || !prev.time) return { ...prev, staff };

      const stillAvailable = generateTimeSlots(prev.date, staff.id).includes(
        prev.time
      );
      if (stillAvailable) return { ...prev, staff };
      return { ...prev, staff, date: null, time: null };
    });
  }, []);

  // Step 3 — date + time are always committed together, atomically, so
  // there's never a moment where one is set without the other.
  const handleSelectDateTime = useCallback((date: string, time: string) => {
    setBooking((prev) => ({ ...prev, date, time }));
  }, []);

  // Step 4 — details save as the user types, so the sidebar stays live.
  const handleSaveDetails = useCallback((details: CustomerDetails) => {
    setBooking((prev) => ({ ...prev, customerDetails: details }));
  }, []);

  const handleConfirm = useCallback(() => setIsConfirmed(true), []);

  const handleReset = useCallback(() => {
    setBooking(INITIAL_STATE);
    setIsConfirmed(false);
  }, []);

  if (isConfirmed) {
    return <BookingSuccessScreen booking={booking} onReset={handleReset} />;
  }

  const eligibleStaff = booking.service
    ? getEligibleStaff(booking.service.id)
    : [];

  return (
    <div className="booking-page">
      <div className="booking-page-header">
        <h1 className="booking-page-title">Book an Appointment</h1>
        <p className="booking-page-subtitle">
          Demo booking flow — fake data only, no real submissions.
        </p>
      </div>

      <BookingStepIndicator currentStep={booking.step} />

      <div className="booking-layout">
        <div className="booking-main">
          {booking.step === 1 && (
            <BookingServiceStep
              services={SERVICES}
              selectedService={booking.service}
              onSelect={handleSelectService}
              onNext={() => goToStep(2)}
            />
          )}

          {booking.step === 2 && booking.service && (
            <BookingStaffStep
              eligibleStaff={eligibleStaff}
              selectedStaff={booking.staff}
              onSelect={handleSelectStaff}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}

          {booking.step === 3 && booking.service && booking.staff && (
            <BookingDateTimeStep
              staffId={booking.staff.id}
              selectedDate={booking.date}
              selectedTime={booking.time}
              onSelectDateTime={handleSelectDateTime}
              onNext={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}

          {booking.step === 4 && (
            <BookingDetailsStep
              details={booking.customerDetails}
              onSave={handleSaveDetails}
              onNext={() => goToStep(5)}
              onBack={() => goToStep(3)}
            />
          )}

          {booking.step === 5 &&
            booking.service &&
            booking.staff &&
            booking.date &&
            booking.time &&
            booking.customerDetails && (
              <BookingConfirmStep
                booking={{
                  service: booking.service,
                  staff: booking.staff,
                  date: booking.date,
                  time: booking.time,
                  customerDetails: booking.customerDetails,
                }}
                onConfirm={handleConfirm}
                onBack={() => goToStep(4)}
              />
            )}
        </div>

        {booking.step > 1 && (
          <BookingSummarySidebar booking={booking} onEditStep={goToStep} />
        )}
      </div>
    </div>
  );
}
