import type { ReactNode } from "react";
import "./styles/DashboardGlobals.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-page">
      {children}
    </div>
  );
}