"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import "../styles/RealEstateSearchBar.css";

interface RealEstateSearchBarProps {
  variant?: "hero" | "page";
  initialLocation?: string;
  initialPropertyType?: string;
  initialPriceRange?: string;
}

export default function RealEstateSearchBar({
  variant = "hero",
  initialLocation = "",
  initialPropertyType = "",
  initialPriceRange = "",
}: RealEstateSearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (propertyType) params.set("type", propertyType);
    if (priceRange) params.set("price", priceRange);

    router.push(`/template-projects/real-estate-listings/listings?${params.toString()}`);
  }

  return (
    <form
      className={`realestate-searchbar realestate-searchbar-${variant}`}
      onSubmit={handleSubmit}
    >
      <div className="realestate-searchbar-field realestate-searchbar-location">
        <label htmlFor="realestate-search-location">Location</label>
        <input
          id="realestate-search-location"
          type="text"
          placeholder="Neighborhood or city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="realestate-searchbar-field">
        <label htmlFor="realestate-search-type">Property Type</label>
        <select
          id="realestate-search-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Land">Land</option>
        </select>
      </div>

      <div className="realestate-searchbar-field">
        <label htmlFor="realestate-search-price">Price Range</label>
        <select
          id="realestate-search-price"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="0-500000">Under $500k</option>
          <option value="500000-750000">$500k – $750k</option>
          <option value="750000-1000000">$750k – $1M</option>
          <option value="1000000-999999999">$1M+</option>
        </select>
      </div>

      <button type="submit" className="realestate-searchbar-submit">
        <Search size={17} />
        <span>Search</span>
      </button>
    </form>
  );
}