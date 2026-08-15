import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { properties, getPropertyBySlug } from "../../data/listings";
import RealEstateImageGallery from "../../components/RealEstateImageGallery";
import RealEstateListingDetail from "../../components/RealEstateListingDetail";
import RealEstateAgentContactCard from "../../components/RealEstateAgentContactCard";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: "Listing Not Found | Meridian Realty" };

  return {
    title: `${property.address} | Meridian Realty`,
    description: property.description,
  };
}

export default function RealEstateListingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="realestate-container" style={{ paddingTop: "32px", paddingBottom: "80px" }}>
      <Link
        href="/template-projects/real-estate-listings/listings"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--realestate-gray)",
          marginBottom: "20px",
        }}
      >
        <ArrowLeft size={16} />
        Back to Listings
      </Link>

      <RealEstateImageGallery images={property.images} alt={property.address} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.7fr 1fr",
          gap: "40px",
          marginTop: "40px",
          alignItems: "start",
        }}
        className="realestate-detail-layout"
      >
        <RealEstateListingDetail property={property} />
        <RealEstateAgentContactCard propertyAddress={property.address} />
      </div>
    </div>
  );
}