import AgencyHero from './components/AgencyHero';
import AgencyWorkPreview from './components/AgencyWorkPreview';
import AgencyServicesPreview from './components/AgencyServicesPreview';
import AgencyProcess from './components/AgencyProcess';
import AgencyTestimonials from './components/AgencyTestimonials';
import AgencyCTASection from './components/AgencyCTASection';

export default function CreativeAgencyHomePage() {
  return (
    <>
      <AgencyHero />
      <AgencyWorkPreview />
      <AgencyServicesPreview />
      <AgencyProcess />
      <AgencyTestimonials />
      <AgencyCTASection />
    </>
  );
}