import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "../data/listings";
import RealEstateListingCard from "./RealEstateListingCard";
import "../styles/RealEstateFeaturedListings.css";

export default function RealEstateFeaturedListings() {
  const featured = getFeaturedProperties().slice(0, 6);

  return (
    <section className="realestate-section realestate-featured">
      <div className="realestate-container">
        <div className="realestate-featured-header">
          <div>
            <p className="realestate-eyebrow">Handpicked</p>
            <h2 className="realestate-featured-title">Featured Listings</h2>
          </div>
          <Link
            href="/template-projects/real-estate-listings/listings"
            className="realestate-featured-link"
          >
            View All Listings
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="realestate-featured-grid">
          {featured.map((property) => (
            <RealEstateListingCard key={property.slug} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}