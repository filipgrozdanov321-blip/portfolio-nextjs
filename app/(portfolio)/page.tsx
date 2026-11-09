import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import Hero from "../../components/HubPageSection/hero/hero";
import BusinessesThriveSection from "../../components/HubPageSection/Business Thrive/businesses-thrive";
import MyWorkSection from "../../components/HubPageSection/Mt Work Section/My-Work";
import WhyMeSection from "../../components/HubPageSection/Why Me/why-me";
import ServicesSection from "../../components/HubPageSection/Services/services";
import ContactSection from "../../components/HubPageSection/Contact/contact-section";
import "../../styles/pages/HubPage.css";

// A server component: each section that animates is its own client
// component, so all the text is in the HTML the server sends.
export const metadata: Metadata = pageMetadata({
  title: `${site.name} | ${site.headline}`,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HubPage() {
  return (
    <div className="hub-container">
      <Hero />
      <BusinessesThriveSection />
      <MyWorkSection />
      <WhyMeSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
