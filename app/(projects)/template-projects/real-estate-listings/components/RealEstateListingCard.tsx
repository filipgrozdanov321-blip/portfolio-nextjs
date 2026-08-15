import Link from "next/link";
import { BedDouble, Bath, Ruler } from "lucide-react";
import type { Property } from "../data/listings";
import "../styles/RealEstateListingCard.css";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function RealEstateListingCard({ property }: { property: Property }) {
  const isLand = property.propertyType === "Land";

  return (
    <Link
      href={`/template-projects/real-estate-listings/listings/${property.slug}`}
      className="realestate-listing-card"
    >
      <div className="realestate-listing-card-image-wrap">
        <img src={property.images[0]} alt={property.address} className="realestate-listing-card-image" />
        <span className="realestate-listing-card-type">{property.propertyType}</span>
        {property.featured && <span className="realestate-listing-card-featured">Featured</span>}
      </div>

      <div className="realestate-listing-card-body">
        <p className="realestate-listing-card-price">{formatPrice(property.price)}</p>
        <p className="realestate-listing-card-address">{property.address}</p>
        <p className="realestate-listing-card-city">{property.city}</p>

        <div className="realestate-listing-card-specs">
          {!isLand && (
            <>
              <span>
                <BedDouble size={15} />
                {property.beds} bd
              </span>
              <span>
                <Bath size={15} />
                {property.baths} ba
              </span>
            </>
          )}
          <span>
            <Ruler size={15} />
            {property.sqft.toLocaleString()} {isLand ? "sqft lot" : "sqft"}
          </span>
        </div>
      </div>
    </Link>
  );
}