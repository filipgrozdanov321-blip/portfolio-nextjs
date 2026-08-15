import RealEstateListingsGrid from "../components/RealEstateListingsGrid";

interface RealEstateListingsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function RealEstateListingsPage({ searchParams }: RealEstateListingsPageProps) {
  const location = typeof searchParams.location === "string" ? searchParams.location : "";
  const propertyType = typeof searchParams.type === "string" ? searchParams.type : "";
  const priceRange = typeof searchParams.price === "string" ? searchParams.price : "";

  return (
    <>
      <div className="realestate-listings-page-header">
        <div className="realestate-container">
          <h1>Available Listings</h1>
          <p>Browse current properties across Austin, filtered to what actually matters to you.</p>
        </div>
      </div>

      <RealEstateListingsGrid
        initialFilters={{ location, propertyType, priceRange, bedrooms: "" }}
      />
    </>
  );
}