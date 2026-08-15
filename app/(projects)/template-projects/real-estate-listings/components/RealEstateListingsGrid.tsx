"use client";

import { useMemo, useState } from "react";
import { properties } from "../data/listings";
import RealEstateListingCard from "./RealEstateListingCard";
import RealEstateFilterPanel, { RealEstateFilters } from "./RealEstateFilterPanel";
import "../styles/RealEstateListingsGrid.css";

interface RealEstateListingsGridProps {
  initialFilters: RealEstateFilters;
}

export default function RealEstateListingsGrid({ initialFilters }: RealEstateListingsGridProps) {
  const [filters, setFilters] = useState<RealEstateFilters>(initialFilters);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.location) {
        const query = filters.location.toLowerCase();
        const matchesLocation =
          property.city.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query);
        if (!matchesLocation) return false;
      }

      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (property.price < min || property.price > max) return false;
      }

      if (filters.bedrooms) {
        const minBeds = Number(filters.bedrooms);
        if (property.beds < minBeds) return false;
      }

      return true;
    });
  }, [filters]);

  function handleClear() {
    setFilters({ location: "", propertyType: "", priceRange: "", bedrooms: "" });
  }

  return (
    <div className="realestate-listingsgrid-layout">
      <RealEstateFilterPanel filters={filters} onChange={setFilters} onClear={handleClear} />

      <div className="realestate-listingsgrid-results">
        <p className="realestate-listingsgrid-count">
          {filteredProperties.length}{" "}
          {filteredProperties.length === 1 ? "property" : "properties"} found
        </p>

        {filteredProperties.length > 0 ? (
          <div className="realestate-listingsgrid-grid">
            {filteredProperties.map((property) => (
              <RealEstateListingCard key={property.slug} property={property} />
            ))}
          </div>
        ) : (
          <div className="realestate-listingsgrid-empty">
            <p>No properties match your filters.</p>
            <button onClick={handleClear} className="realestate-btn realestate-btn-outline">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}