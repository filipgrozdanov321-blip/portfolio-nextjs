import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";
import "../styles/DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <BackButton />
      <h1 className="dashboard-header-title">Sales Overview</h1>
      <p className="dashboard-header-subtitle">
        Revenue and orders for the selected period, plus your best-selling products.
      </p>
    </header>
  );
}