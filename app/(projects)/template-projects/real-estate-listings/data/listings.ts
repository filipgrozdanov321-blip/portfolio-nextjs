export interface Property {
    slug: string;
    address: string;
    city: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
    propertyType: "House" | "Condo" | "Townhouse" | "Land";
    images: string[];
    description: string;
    featured?: boolean;
  }
  
  export const properties: Property[] = [
    {
      slug: "1204-kinney-ave-zilker",
      address: "1204 Kinney Ave",
      city: "Zilker, Austin, TX",
      price: 875000,
      beds: 3,
      baths: 2,
      sqft: 1840,
      propertyType: "House",
      images: [
        "/images/realestate/property-1-1.jpg",
        "/images/realestate/property-1-2.jpg",
        "/images/realestate/property-1-3.jpg",
      ],
      description:
        "A fully renovated 1940s bungalow two blocks from Zilker Park, with original hardwood floors and a rebuilt kitchen. The backyard studio works well as a home office or guest suite.",
      featured: true,
    },
    {
      slug: "812-travis-heights-blvd",
      address: "812 Travis Heights Blvd",
      city: "Travis Heights, Austin, TX",
      price: 1150000,
      beds: 4,
      baths: 3,
      sqft: 2610,
      propertyType: "House",
      images: [
        "/images/realestate/property-2-1.jpg",
        "/images/realestate/property-2-2.jpg",
        "/images/realestate/property-2-3.jpg",
      ],
      description:
        "A craftsman-style home on a quiet, tree-lined street with a wraparound porch and a detached two-car garage. Recent updates include a new roof and a widened driveway.",
      featured: true,
    },
    {
      slug: "unit-1108-the-domain",
      address: "11501 Rock Rose Ave, Unit 1108",
      city: "The Domain, Austin, TX",
      price: 495000,
      beds: 2,
      baths: 2,
      sqft: 1290,
      propertyType: "Condo",
      images: [
        "/images/realestate/property-3-1.jpg",
        "/images/realestate/property-3-2.jpg",
        "/images/realestate/property-3-3.jpg",
      ],
      description:
        "A top-floor corner unit with floor-to-ceiling windows and direct views of the Domain's central plaza. Building amenities include a rooftop pool, a fitness center, and secured parking.",
      featured: true,
    },
    {
      slug: "3305-mueller-blvd",
      address: "3305 Mueller Blvd",
      city: "Mueller, Austin, TX",
      price: 610000,
      beds: 3,
      baths: 2,
      sqft: 1750,
      propertyType: "Townhouse",
      images: [
        "/images/realestate/property-4-1.jpg",
        "/images/realestate/property-4-2.jpg",
        "/images/realestate/property-4-3.jpg",
      ],
      description:
        "A modern three-story townhouse in the Mueller development, built in 2021 and still under builder warranty. Walking distance to the farmers market and Lake Park.",
      featured: true,
    },
    {
      slug: "2110-westlake-cove",
      address: "2110 Westlake Cove",
      city: "Westlake, Austin, TX",
      price: 2450000,
      beds: 5,
      baths: 5,
      sqft: 4920,
      propertyType: "House",
      images: [
        "/images/realestate/property-5-1.jpg",
        "/images/realestate/property-5-2.jpg",
        "/images/realestate/property-5-3.jpg",
      ],
      description:
        "A contemporary estate set on just over an acre, with a glass-walled great room, a chef's kitchen, and a pool overlooking a private stand of oak trees. Zoned for Eanes ISD.",
      featured: true,
    },
    {
      slug: "1809-east-6th-loft-4",
      address: "1809 East 6th St, Unit 4",
      city: "East Austin, TX",
      price: 425000,
      beds: 1,
      baths: 1,
      sqft: 980,
      propertyType: "Condo",
      images: [
        "/images/realestate/property-6-1.jpg",
        "/images/realestate/property-6-2.jpg",
        "/images/realestate/property-6-3.jpg",
      ],
      description:
        "An industrial-style loft in a converted warehouse building, with exposed brick, polished concrete floors, and a private balcony facing East 6th Street's restaurant row.",
    },
    {
      slug: "5417-tuscan-oaks-circle-c",
      address: "5417 Tuscan Oaks Dr",
      city: "Circle C Ranch, Austin, TX",
      price: 725000,
      beds: 4,
      baths: 3,
      sqft: 2980,
      propertyType: "House",
      images: [
        "/images/realestate/property-7-1.jpg",
        "/images/realestate/property-7-2.jpg",
        "/images/realestate/property-7-3.jpg",
      ],
      description:
        "A well-maintained family home on a cul-de-sac lot, with a fenced yard, an updated primary suite, and access to the neighborhood's greenbelt trail system.",
    },
    {
      slug: "lot-14-barton-hills-dr",
      address: "Lot 14, Barton Hills Dr",
      city: "Barton Hills, Austin, TX",
      price: 550000,
      beds: 0,
      baths: 0,
      sqft: 12200,
      propertyType: "Land",
      images: [
        "/images/realestate/property-8-1.jpg",
        "/images/realestate/property-8-2.jpg",
        "/images/realestate/property-8-3.jpg",
      ],
      description:
        "A cleared, buildable lot in Barton Hills with an approved survey and utilities at the street. One of the last remaining infill lots in this pocket of the neighborhood.",
    },
    {
      slug: "908-tarrytown-row-b",
      address: "908 Tarrytown Row, Unit B",
      city: "Tarrytown, Austin, TX",
      price: 795000,
      beds: 3,
      baths: 3,
      sqft: 1980,
      propertyType: "Townhouse",
      images: [
        "/images/realestate/property-9-1.jpg",
        "/images/realestate/property-9-2.jpg",
        "/images/realestate/property-9-3.jpg",
      ],
      description:
        "A half-duplex townhouse with a private rooftop deck and skyline views. Finished in 2019 with quartz counters, a tankless water heater, and a two-car garage.",
    },
    {
      slug: "unit-702-south-congress",
      address: "1600 South Congress Ave, Unit 702",
      city: "South Congress, Austin, TX",
      price: 680000,
      beds: 2,
      baths: 2,
      sqft: 1410,
      propertyType: "Condo",
      images: [
        "/images/realestate/property-10-1.jpg",
        "/images/realestate/property-10-2.jpg",
        "/images/realestate/property-10-3.jpg",
      ],
      description:
        "A seventh-floor unit above SoCo's shops and restaurants, with a private balcony facing downtown. Includes one reserved parking space and a storage unit.",
      featured: true,
    },
  ];
  
  export function getPropertyBySlug(slug: string): Property | undefined {
    return properties.find((property) => property.slug === slug);
  }
  
  export function getFeaturedProperties(): Property[] {
    return properties.filter((property) => property.featured);
  }