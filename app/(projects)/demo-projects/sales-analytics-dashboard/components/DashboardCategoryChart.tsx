"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { TopProduct } from "../data/salesData";
import { useMediaQuery } from "../hooks/useMediaQuery";
import "../styles/DashboardCategoryChart.css";

interface DashboardCategoryChartProps {
  products: TopProduct[];
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

// Strongest category in the dashboard green, the rest in lighter shades
const BAR_COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];

export default function DashboardCategoryChart({ products }: DashboardCategoryChartProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const totals = new Map<string, number>();
  for (const product of products) {
    totals.set(product.category, (totals.get(product.category) ?? 0) + product.revenue);
  }
  const data = Array.from(totals, ([category, revenue]) => ({ category, revenue })).sort(
    (a, b) => b.revenue - a.revenue
  );

  return (
    <div className="dashboard-category-chart dashboard-card">
      <div className="dashboard-category-chart-header">
        <h2 className="dashboard-category-chart-title">Revenue by category</h2>
        <p className="dashboard-category-chart-subtitle">Top 12 products, all time</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
          <XAxis
            type="number"
            tickFormatter={(value: number) => compactCurrencyFormatter.format(value)}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 12, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
            width={96}
          />
          <Tooltip
            formatter={(value) => [currencyFormatter.format(Number(value)), "Revenue"] as [string, string]}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#E5E7EB",
              fontSize: 13,
              fontFamily: "inherit",
            }}
            cursor={{ fill: "#F8F9FB" }}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={28} isAnimationActive={!reduceMotion}>
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
