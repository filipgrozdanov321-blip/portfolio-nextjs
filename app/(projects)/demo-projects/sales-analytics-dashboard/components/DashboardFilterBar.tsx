"use client";

import "../styles/DashboardFilterBar.css";

export type DashboardDateRange = "7d" | "30d" | "90d" | "all";

interface DashboardFilterOption {
  value: DashboardDateRange;
  label: string;
}

export const DASHBOARD_FILTER_OPTIONS: DashboardFilterOption[] = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "all", label: "All Time" },
];

interface DashboardFilterBarProps {
  selectedRange: DashboardDateRange;
  onRangeChange: (range: DashboardDateRange) => void;
}

export default function DashboardFilterBar({
  selectedRange,
  onRangeChange,
}: DashboardFilterBarProps) {
  return (
    <div className="dashboard-filter-bar" role="tablist" aria-label="Date range">
      {DASHBOARD_FILTER_OPTIONS.map((option) => {
        const isActive = option.value === selectedRange;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={
              isActive
                ? "dashboard-filter-option dashboard-filter-option-active"
                : "dashboard-filter-option"
            }
            onClick={() => onRangeChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}