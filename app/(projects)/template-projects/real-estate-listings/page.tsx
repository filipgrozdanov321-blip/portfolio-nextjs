import RealEstateHero from "./components/RealEstateHero";
import RealEstateFeaturedListings from "./components/RealEstateFeaturedListings";
import RealEstateValueProps from "./components/RealEstateValueProps";
import RealEstateAgentPreview from "./components/RealEstateAgentPreview";
import RealEstateTestimonials from "./components/RealEstateTestimonials";
import RealEstateCTASection from "./components/RealEstateCTASection";

export default function RealEstateHomePage() {
  return (
    <>
      <RealEstateHero />
      <RealEstateFeaturedListings />
      <RealEstateValueProps />
      <RealEstateAgentPreview />
      <RealEstateTestimonials />
      <RealEstateCTASection />
    </>
  );
}