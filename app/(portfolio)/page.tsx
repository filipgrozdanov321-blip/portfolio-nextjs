"use client";

import Hero from "../../components/HubPageSection/hero/hero";
import BusinessesThriveSection from "../../components/HubPageSection/Business Thrive/businesses-thrive";
import MyWorkSection from "../../components/HubPageSection/Mt Work Section/My-Work";
import WhyMeSection from "../../components/HubPageSection/Why Me/why-me";
import ServicesSection from "../../components/HubPageSection/Services/services";
import ContactSection from "../../components/HubPageSection/Contact/contact-section";
import "../../styles/pages/HubPage.css"

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
