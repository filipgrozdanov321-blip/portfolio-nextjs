import type { Metadata } from "next";
import type { ReactNode } from "react";
// NOTE: this import path is a placeholder — point it at wherever
// BackButton actually lives in your portfolio (e.g. app/components/BackButton).
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";
import "./styles/BookingGlobals.css";

export const metadata: Metadata = {
  title: "Appointment Booking Demo",
  description:
    "A multi-step appointment booking flow demo — fake data only, no backend or real payment integration.",
};

export default function AppointmentBookingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="booking-demo-root">
      <div className="booking-back-button-wrapper">
        <BackButton />
      </div>
      {children}
    </div>
  );
}