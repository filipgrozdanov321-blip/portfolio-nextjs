import { BedDouble, Bath, Ruler, MapPin, Check } from "lucide-react";
import type { Property } from "../data/listings";
import "../styles/RealEstateListingDetail.css";

const amenitiesByType: Record<Property["propertyType"], string[]> = {
  House: [
    "Attached Garage",
    "Private Yard",
    "Central Air & Heat",
    "Hardwood Floors",
    "Updated Kitchen",
    "In-Unit Laundry",
  ],
  Condo: [
    "Building Fitness Center",
    "Elevator Access",
    "Reserved Parking",
    "In-Unit Laundry",
    "Central Air & Heat",
    "Balcony",
  ],
  Townhouse: [
    "Attached Garage",
    "Private Patio",
    "In-Unit Laundry",
    "Central Air & Heat",
    "Updated Kitchen",
    "Low-Maintenance HOA",
  ],
  Land: ["Utilities at Street", "Approved Survey", "Cleared Lot", "No HOA Restrictions"],
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function RealEstateListingDetail({ property }: { property: Property }) {
  const isLand = property.propertyType === "Land";
  const amenities = amenitiesByType[property.propertyType];

  return (
    <div className="realestate-listingdetail">
      <div className="realestate-listingdetail-header">
        <div>
          <span className="realestate-listingdetail-type">{property.propertyType}</span>
          <h1 className="realestate-listingdetail-address">{property.address}</h1>
          <p className="realestate-listingdetail-city">
            <MapPin size={15} />
            {property.city}
          </p>
        </div>
        <p className="realestate-listingdetail-price">{formatPrice(property.price)}</p>
      </div>

      <div className="realestate-listingdetail-specs">
        {!isLand && (
          <>
            <div className="realestate-listingdetail-spec">
              <BedDouble size={20} />
              <span>{property.beds} Bedrooms</span>
            </div>
            <div className="realestate-listingdetail-spec">
              <Bath size={20} />
              <span>{property.baths} Bathrooms</span>
            </div>
          </>
        )}
        <div className="realestate-listingdetail-spec">
          <Ruler size={20} />
          <span>{property.sqft.toLocaleString()} {isLand ? "sqft lot" : "sqft"}</span>
        </div>
      </div>

      <div className="realestate-listingdetail-section">
        <h2>Description</h2>
        <p>{property.description}</p>
      </div>

      <div className="realestate-listingdetail-section">
        <h2>Amenities</h2>
        <ul className="realestate-listingdetail-amenities">
          {amenities.map((amenity) => (
            <li key={amenity}>
              <Check size={16} />
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}