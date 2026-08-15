"use client";

import { useMemo, useState } from "react";
import { DollarSign, ShoppingCart, Receipt, TrendingUp } from "lucide-react";

import DashboardHeader from "./components/DashboardHeader";
import DashboardFilterBar, { type DashboardDateRange } from "./components/DashboardFilterBar";
import DashboardKPICard from "./components/DashboardKPICard";
import DashboardRevenueChart from "./components/DashboardRevenueChart";
import DashboardOrdersChart from "./components/DashboardOrdersChart";
import { salesData } from "./data/salesData";

const RANGE_DAY_COUNTS: Record<Exclude<DashboardDateRange, "all">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const currencyFormatterPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-US");

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState<DashboardDateRange>("30d");

  // Single source of truth: everything below derives from salesData + selectedRange.
  const { filteredData, totalRevenue, totalOrders, averageOrderValue, revenueGrowth, comparisonDays } =
    useMemo(() => {
      if (selectedRange === "all") {
        const filteredData = salesData;
        const totalRevenue = sum(filteredData.map((point) => point.revenue));
        const totalOrders = sum(filteredData.map((point) => point.orders));
        const averageOrderValue = totalOrders === 0 ? 0 : totalRevenue / totalOrders;

        return {
          filteredData,
          totalRevenue,
          totalOrders,
          averageOrderValue,
          revenueGrowth: null as number | null,
          comparisonDays: null as number | null,
        };
      }

      const days = RANGE_DAY_COUNTS[selectedRange];
      const filteredData = salesData.slice(-days);
      // The N days immediately before the current window — an equal-length,
      // non-overlapping period to compare revenue against.
      const previousPeriodData = salesData.slice(-(days * 2), -days);

      const totalRevenue = sum(filteredData.map((point) => point.revenue));
      const totalOrders = sum(filteredData.map((point) => point.orders));
      const averageOrderValue = totalOrders === 0 ? 0 : totalRevenue / totalOrders;

      const previousRevenue = sum(previousPeriodData.map((point) => point.revenue));
      const revenueGrowth =
        previousPeriodData.length === 0 || previousRevenue === 0
          ? null
          : ((totalRevenue - previousRevenue) / previousRevenue) * 100;

      return {
        filteredData,
        totalRevenue,
        totalOrders,
        averageOrderValue,
        revenueGrowth,
        comparisonDays: days,
      };
    }, [selectedRange]);

  const growthValue =
    revenueGrowth !== null ? `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(1)}%` : "";
  const growthDirection: "up" | "down" | undefined =
    revenueGrowth === null ? undefined : revenueGrowth >= 0 ? "up" : "down";
  const growthHelperText =
    revenueGrowth !== null && comparisonDays !== null
      ? `vs prior ${comparisonDays} days`
      : "No prior period to compare";

  return (
    <>
      <DashboardHeader />

      <div className="dashboard-section">
        <DashboardFilterBar selectedRange={selectedRange} onRangeChange={setSelectedRange} />
      </div>

      <div className="dashboard-section dashboard-grid-4">
        <DashboardKPICard
          label="Total Revenue"
          value={currencyFormatter.format(totalRevenue)}
          icon={DollarSign}
        />
        <DashboardKPICard
          label="Total Orders"
          value={numberFormatter.format(totalOrders)}
          icon={ShoppingCart}
        />
        <DashboardKPICard
          label="Average Order Value"
          value={currencyFormatterPrecise.format(averageOrderValue)}
          icon={Receipt}
        />
        <DashboardKPICard
          label="Revenue Growth"
          value={growthValue}
          icon={TrendingUp}
          trendDirection={growthDirection}
          unavailable={revenueGrowth === null}
          helperText={growthHelperText}
        />
      </div>

      {/* DashboardCategoryChart will join this in a dashboard-grid-2 split once it exists */}
      <div className="dashboard-section">
        <DashboardRevenueChart data={filteredData} />
      </div>

      <div className="dashboard-section">
        <DashboardOrdersChart data={filteredData} />
      </div>

      {/* DashboardTopProducts goes here next */}
    </>
  );
}