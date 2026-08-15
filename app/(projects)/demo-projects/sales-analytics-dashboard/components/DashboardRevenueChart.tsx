"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SalesDataPoint } from "../data/salesData";
import "../styles/DashboardRevenueChart.css";

interface DashboardRevenueChartProps {
  data: SalesDataPoint[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDateLabel(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function DashboardRevenueChart({ data }: DashboardRevenueChartProps) {
  return (
    <div className="dashboard-revenue-chart dashboard-card">
      <div className="dashboard-revenue-chart-header">
        <h2 className="dashboard-revenue-chart-title">Revenue</h2>
        <p className="dashboard-revenue-chart-subtitle">Daily revenue for the selected period</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="dashboardRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
            minTickGap={32}
          />
          <YAxis
            tickFormatter={(value: number) => currencyFormatter.format(value)}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            width={72}
          />
          <Tooltip
            formatter={(value) => [currencyFormatter.format(Number(value)), "Revenue"] as [string, string]}
            labelFormatter={(label) => formatDateLabel(String(label))}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#E5E7EB",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#10B981"
            strokeWidth={2}
            fill="url(#dashboardRevenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}