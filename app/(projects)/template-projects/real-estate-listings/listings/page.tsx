import RealEstateListingsGrid from "../components/RealEstateListingsGrid";

type SearchParams = { [key: string]: string | string[] | undefined };

interface RealEstateListingsPageProps {
  // Next.js 15 (and 16) hands searchParams to a page as a PROMISE. The old
  // code read it as a plain object, so on those versions every search would
  // have been ignored (the hero's search bar would land on an unfiltered
  // list). It also fails the build with a type error on Next 15+. This works
  // for both: "await" on a plain object just returns it.
  searchParams: Promise<SearchParams> | SearchParams;
}

export default async function RealEstateListingsPage({
  searchParams,
}: RealEstateListingsPageProps) {
  const params = await searchParams;

  const location = typeof params.location === "string" ? params.location : "";
  const propertyType = typeof params.type === "string" ? params.type : "";
  const priceRange = typeof params.price === "string" ? params.price : "";

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