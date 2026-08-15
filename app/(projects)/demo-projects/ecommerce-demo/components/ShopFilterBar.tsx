"use client";

import type { ChangeEvent } from "react";
import type { Product } from "../data/products";
import "../styles/ShopFilterBar.css";

export type SortOption = "price-asc" | "price-desc" | "newest";

export interface ShopFilters {
  categories: Product["category"][];
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
}

const ALL_CATEGORIES: Product["category"][] = [
  "Kitchen",
  "Textiles",
  "Lighting",
  "Decor",
];

interface ShopFilterBarProps {
  filters: ShopFilters;
  onFiltersChange: (filters: ShopFilters) => void;
  minPriceBound: number;
  maxPriceBound: number;
}

export default function ShopFilterBar({
  filters,
  onFiltersChange,
  minPriceBound,
  maxPriceBound,
}: ShopFilterBarProps) {
  const toggleCategory = (category: Product["category"]) => {
    const isSelected = filters.categories.includes(category);
    const nextCategories = isSelected
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: nextCategories });
  };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMin = Math.min(Number(event.target.value), filters.maxPrice);
    onFiltersChange({ ...filters, minPrice: nextMin });
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMax = Math.max(Number(event.target.value), filters.minPrice);
    onFiltersChange({ ...filters, maxPrice: nextMax });
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sort: event.target.value as SortOption });
  };

  const handleReset = () => {
    onFiltersChange({
      categories: [],
      minPrice: minPriceBound,
      maxPrice: maxPriceBound,
      sort: "newest",
    });
  };

  const range = maxPriceBound - minPriceBound || 1;
  const percentMin = ((filters.minPrice - minPriceBound) / range) * 100;
  const percentMax = ((filters.maxPrice - minPriceBound) / range) * 100;
  // Whichever handle is further along gets top z-index, so it stays
  // grabbable when the two handles are close together or overlapping.
  const minThumbOnTop = filters.minPrice > minPriceBound + range / 2;

  return (
    <aside className="shop-filter-bar">
      <div className="shop-filter-bar-section">
        <h3 className="shop-filter-bar-heading">Category</h3>
        <div className="shop-filter-bar-checkboxes">
          {ALL_CATEGORIES.map((category) => (
            <label key={category} className="shop-filter-bar-checkbox-label">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="shop-filter-bar-checkbox"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="shop-filter-bar-section">
        <div className="shop-filter-bar-price-header">
          <h3 className="shop-filter-bar-heading">Price</h3>
          <span className="shop-filter-bar-price-value">
            ${filters.minPrice} – ${filters.maxPrice}
          </span>
        </div>

        <div className="shop-filter-bar-price-slider-wrapper">
          <div className="shop-filter-bar-price-track" />
          <div
            className="shop-filter-bar-price-track-active"
            style={{ left: `${percentMin}%`, right: `${100 - percentMax}%` }}
          />
          <input
            type="range"
            min={minPriceBound}
            max={maxPriceBound}
            step={5}
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            className="shop-filter-bar-price-input"
            style={{ zIndex: minThumbOnTop ? 5 : 3 }}
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={minPriceBound}
            max={maxPriceBound}
            step={5}
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            className="shop-filter-bar-price-input"
            style={{ zIndex: 4 }}
            aria-label="Maximum price"
          />
        </div>
      </div>

      <div className="shop-filter-bar-section">
        <h3 className="shop-filter-bar-heading">Sort By</h3>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="shop-filter-bar-sort-select"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <button type="button" className="shop-filter-bar-reset" onClick={handleReset}>
        Reset Filters
      </button>
    </aside>
  );
}