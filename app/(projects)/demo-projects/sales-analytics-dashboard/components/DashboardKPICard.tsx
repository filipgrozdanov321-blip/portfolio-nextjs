import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import "../styles/DashboardKPICard.css";

export interface DashboardKPICardProps {
  label: string;
  /** Already formatted by the caller, e.g. "$48,239", "1,204", "+12.4%" */
  value: string;
  icon?: LucideIcon;
  /** Colors the value green/red and shows a trend arrow. Omit for a neutral value. */
  trendDirection?: "up" | "down";
  /** Small caption under the value, e.g. "vs previous 30 days" */
  helperText?: string;
  /** Used by Revenue Growth when "All Time" is selected — there's no prior period to compare against */
  unavailable?: boolean;
}

export default function DashboardKPICard({
  label,
  value,
  icon: Icon,
  trendDirection,
  helperText,
  unavailable = false,
}: DashboardKPICardProps) {
  const TrendIcon = trendDirection === "up" ? TrendingUp : trendDirection === "down" ? TrendingDown : null;

  const valueClassName = [
    "dashboard-kpi-card-value",
    "dashboard-numeric",
    trendDirection === "up" && "dashboard-kpi-card-value-positive",
    trendDirection === "down" && "dashboard-kpi-card-value-negative",
    unavailable && "dashboard-kpi-card-value-muted",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="dashboard-kpi-card dashboard-card">
      <div className="dashboard-kpi-card-top">
        <span className="dashboard-kpi-card-label">{label}</span>
        {Icon && (
          <span className="dashboard-kpi-card-icon">
            <Icon size={16} strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="dashboard-kpi-card-body">
        <span className={valueClassName}>
          {unavailable ? (
            "—"
          ) : (
            <>
              {TrendIcon && <TrendIcon size={18} strokeWidth={2.5} className="dashboard-kpi-card-trend-icon" />}
              {value}
            </>
          )}
        </span>
        {helperText && <span className="dashboard-kpi-card-helper">{helperText}</span>}
      </div>
    </div>
  );
}