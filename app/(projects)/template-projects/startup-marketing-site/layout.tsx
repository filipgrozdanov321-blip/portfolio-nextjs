import type { Metadata } from "next";
import StartupNavbar from "./components/StartupNavbar";
import StartupFooter from "./components/StartupFooter";
import "./styles/StartupGlobals.css";

export const metadata: Metadata = {
  title: "Rivet — Real-time infrastructure monitoring for small teams",
  description:
    "Incident alerting built for engineering teams who can't afford downtime.",
};

export default function StartupMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="startup-shell">
      <StartupNavbar />
      <main>{children}</main>
      <StartupFooter />
    </div>
  );
}