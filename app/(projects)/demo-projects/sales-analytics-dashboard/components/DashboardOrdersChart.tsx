"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SalesDataPoint } from "../data/salesData";
import "../styles/DashboardOrdersChart.css";

interface DashboardOrdersChartProps {
  data: SalesDataPoint[];
}

const numberFormatter = new Intl.NumberFormat("en-US");

function formatDateLabel(dateString: string) {
  const date = new Date(`${dateString}T00:00:00Z`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function DashboardOrdersChart({ data }: DashboardOrdersChartProps) {
  return (
    <div className="dashboard-orders-chart dashboard-card">
      <div className="dashboard-orders-chart-header">
        <h2 className="dashboard-orders-chart-title">Orders</h2>
        <p className="dashboard-orders-chart-subtitle">Daily order volume for the selected period</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            tickFormatter={(value: number) => numberFormatter.format(value)}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            formatter={(value) => [numberFormatter.format(Number(value)), "Orders"] as [string, string]}
            labelFormatter={(label) => formatDateLabel(String(label))}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#E5E7EB",
              fontSize: 13,
              fontFamily: "Inter, sans-serif",
            }}
            cursor={{ fill: "#F8F9FB" }}
          />
          <Bar dataKey="orders" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}