"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, type Product } from "../data/products";
import ShopFilterBar, {
  type ShopFilters,
} from "../components/ShopFilterBar";
import ShopProductGrid from "../components/ShopProductGrid";
import "../styles/ShopProductsPage.css";

const GLOBAL_MIN_PRICE =
  Math.floor(Math.min(...products.map((product) => product.price)) / 10) * 10;
const GLOBAL_MAX_PRICE =
  Math.ceil(Math.max(...products.map((product) => product.price)) / 10) * 10;

function ShopProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Product["category"] | null;

  const [filters, setFilters] = useState<ShopFilters>({
    categories: categoryParam ? [categoryParam] : [],
    minPrice: GLOBAL_MIN_PRICE,
    maxPrice: GLOBAL_MAX_PRICE,
    sort: "newest",
  });

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      return matchesCategory && matchesPrice;
    });

    if (filters.sort === "price-asc") {
      return [...result].sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "price-desc") {
      return [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [filters]);

  return (
    <div className="shop-products-page shop-container">
      <div className="shop-products-page-header">
        <h1 className="shop-products-page-heading">Shop All</h1>
        <span className="shop-products-page-count">
          {filteredProducts.length} products
        </span>
      </div>

      <div className="shop-products-page-layout">
        <ShopFilterBar
          filters={filters}
          onFiltersChange={setFilters}
          minPriceBound={GLOBAL_MIN_PRICE}
          maxPriceBound={GLOBAL_MAX_PRICE}
        />
        <ShopProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}

export default function ShopProductsPage() {
  return (
    <Suspense fallback={null}>
      <ShopProductsPageContent />
    </Suspense>
  );
}