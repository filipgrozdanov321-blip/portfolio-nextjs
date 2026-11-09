import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./styles/DashboardGlobals.css";

// Self-hosted by Next.js at build time: visitors never connect to Google
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sales Analytics Dashboard Demo",
  description:
    "A sales dashboard demo with date filters, KPI cards, revenue and order charts, and top products. Sample data only.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className={`dashboard-page ${inter.variable}`}>{children}</div>;
}
