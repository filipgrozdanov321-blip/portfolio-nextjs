import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { properties, getPropertyBySlug } from "../../data/listings";
import RealEstateImageGallery from "../../components/RealEstateImageGallery";
import RealEstateListingDetail from "../../components/RealEstateListingDetail";
import RealEstateAgentContactCard from "../../components/RealEstateAgentContactCard";
import "../../styles/RealEstateDetailPage.css";

// Next.js 15 (and 16) hands params to a page as a PROMISE. The old code read it
// as a plain object, so on those versions every listing would have come back
// "not found", and it fails the build with a type error. This works for both
// versions: "await" on a plain object just returns it.
type PageParams = { slug: string };
type PageProps = { params: Promise<PageParams> | PageParams };

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Listing Not Found | Meridian Realty" };

  return {
    title: `${property.address} | Meridian Realty`,
    description: property.description,
  };
}

export default async function RealEstateListingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="realestate-container realestate-detail-page">
      <Link
        href="/template-projects/real-estate-listings/listings"
        className="realestate-detail-back"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Listings
      </Link>

      <RealEstateImageGallery images={property.images} alt={property.address} />

      <div className="realestate-detail-layout">
        <RealEstateListingDetail property={property} />
        <RealEstateAgentContactCard propertyAddress={property.address} />
      </div>
    </div>
  );
}