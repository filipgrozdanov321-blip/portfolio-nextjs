export interface SalesDataPoint {
  date: string; // "YYYY-MM-DD"
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: "Electronics" | "Apparel" | "Home & Living" | "Beauty";
  unitsSold: number;
  revenue: number;
}

/**
 * Deterministic seeded PRNG (mulberry32).
 *
 * We deliberately avoid Math.random() here. This module is imported by both
 * server-rendered and client-rendered components ("use client" charts still
 * get an initial server pass in the App Router). If the dataset were random
 * on every evaluation, the server-rendered numbers and the client-hydrated
 * numbers would disagree and React would throw a hydration mismatch. Seeding
 * the generator keeps the "fake" data perfectly consistent across renders,
 * reloads, and environments.
 */
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240614);

function generateSalesData(days: number): SalesDataPoint[] {
  const data: SalesDataPoint[] = [];

  // Fixed anchor date (rather than `new Date()`) so the dataset — and every
  // KPI derived from it — never shifts between a server render and a later
  // client render on a different day.
  const anchorDate = new Date("2026-07-21T00:00:00.000Z");
  const startDate = new Date(anchorDate);
  startDate.setUTCDate(startDate.getUTCDate() - (days - 1));

  const baseRevenue = 3200;
  const baseOrders = 85;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setUTCDate(date.getUTCDate() + i);

    const dayOfWeek = date.getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Gentle upward trend across the whole window.
    const trendFactor = 1 + (i / days) * 0.45;

    // Weekends run a little quieter for a B2C storefront.
    const weekendFactor = isWeekend ? 0.85 : 1;

    // Day-to-day noise so the line isn't perfectly smooth.
    const noise = 0.75 + rand() * 0.5; // 0.75 - 1.25

    // Occasional spike days (flash sale / payday effect).
    const spike = rand() > 0.94 ? 1.35 + rand() * 0.3 : 1;

    const revenue = Math.round(baseRevenue * trendFactor * weekendFactor * noise * spike);
    const orders = Math.round(
      baseOrders * trendFactor * weekendFactor * (0.8 + rand() * 0.4) * spike
    );

    data.push({
      date: date.toISOString().split("T")[0],
      revenue,
      orders,
    });
  }

  return data;
}

function generateTopProducts(): TopProduct[] {
  const products: Array<Omit<TopProduct, "id">> = [
    // Electronics
    { name: "Wireless Noise-Cancelling Headphones", category: "Electronics", unitsSold: 412, revenue: 61388 },
    { name: "Smart Fitness Watch", category: "Electronics", unitsSold: 356, revenue: 49840 },
    { name: "Portable Bluetooth Speaker", category: "Electronics", unitsSold: 289, revenue: 20213 },
    // Apparel
    { name: "Organic Cotton Hoodie", category: "Apparel", unitsSold: 523, revenue: 26150 },
    { name: "Everyday Denim Jacket", category: "Apparel", unitsSold: 298, revenue: 20860 },
    { name: "Performance Running Shorts", category: "Apparel", unitsSold: 441, revenue: 11907 },
    // Home & Living
    { name: "Ceramic Cookware Set", category: "Home & Living", unitsSold: 132, revenue: 23760 },
    { name: "Linen Bedding Set", category: "Home & Living", unitsSold: 209, revenue: 18810 },
    { name: "Aromatherapy Diffuser", category: "Home & Living", unitsSold: 268, revenue: 9380 },
    // Beauty
    { name: "Vitamin C Serum", category: "Beauty", unitsSold: 612, revenue: 18360 },
    { name: "Mineral Sunscreen SPF 50", category: "Beauty", unitsSold: 498, revenue: 12450 },
    { name: "Hydrating Face Mask Set", category: "Beauty", unitsSold: 334, revenue: 8016 },
  ];

  return products.map((product, index) => ({
    id: `prod-${String(index + 1).padStart(3, "0")}`,
    ...product,
  }));
}

// 180 days (not ~120) so that even the "Last 90 Days" filter always has a
// full, equal-length prior period behind it for the revenue-growth comparison.
export const salesData: SalesDataPoint[] = generateSalesData(180);
export const topProducts: TopProduct[] = generateTopProducts();