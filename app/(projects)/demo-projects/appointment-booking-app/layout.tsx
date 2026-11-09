import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./styles/BookingGlobals.css";

// Self-hosted by Next.js at build time: visitors never connect to Google
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <div className={`booking-demo-root ${inter.variable}`}>
      {children}
    </div>
  );
}
