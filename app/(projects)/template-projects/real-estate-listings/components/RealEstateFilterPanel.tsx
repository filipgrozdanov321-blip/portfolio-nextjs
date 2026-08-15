"use client";

import { X } from "lucide-react";
import "../styles/RealEstateFilterPanel.css";

export interface RealEstateFilters {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface RealEstateFilterPanelProps {
  filters: RealEstateFilters;
  onChange: (filters: RealEstateFilters) => void;
  onClear: () => void;
}

export default function RealEstateFilterPanel({
  filters,
  onChange,
  onClear,
}: RealEstateFilterPanelProps) {
  function update<K extends keyof RealEstateFilters>(key: K, value: RealEstateFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  const hasActiveFilters =
    filters.location || filters.propertyType || filters.priceRange || filters.bedrooms;

  return (
    <aside className="realestate-filterpanel">
      <div className="realestate-filterpanel-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="realestate-filterpanel-clear" onClick={onClear}>
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="realestate-filterpanel-field">
        <label htmlFor="filter-location">Location</label>
        <input
          id="filter-location"
          type="text"
          placeholder="Neighborhood or city"
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>

      <div className="realestate-filterpanel-field">
        <label htmlFor="filter-type">Property Type</label>
        <select
          id="filter-type"
          value={filters.propertyType}
          onChange={(e) => update("propertyType", e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div className="realestate-filterpanel-field">
        <label htmlFor="filter-price">Price Range</label>
        <select
          id="filter-price"
          value={filters.priceRange}
          onChange={(e) => update("priceRange", e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="0-500000">Under $500k</option>
          <option value="500000-750000">$500k – $750k</option>
          <option value="750000-1000000">$750k – $1M</option>
          <option value="1000000-999999999">$1M+</option>
        </select>
      </div>

      <div className="realestate-filterpanel-field">
        <label htmlFor="filter-bedrooms">Bedrooms</label>
        <select
          id="filter-bedrooms"
          value={filters.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
        >
          <option value="">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
    </aside>
  );
}