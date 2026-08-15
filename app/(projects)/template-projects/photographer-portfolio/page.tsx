import PhotographerHero from "./components/PhotographerHero";
import PhotographerFeaturedWork from "./components/PhotographerFeaturedWork";
import PhotographerAboutPreview from "./components/PhotographerAboutPreview";
import PhotographerTestimonials from "./components/PhotographerTestimonials";
import PhotographerCTASection from "./components/PhotographerCTASection";

export default function PhotographerHomePage() {
  return (
    <>
      <PhotographerHero />
      <PhotographerFeaturedWork />
      <PhotographerAboutPreview />
      <PhotographerTestimonials />
      <PhotographerCTASection />
    </>
  );
}