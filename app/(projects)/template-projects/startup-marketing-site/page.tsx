"use client";

import { useEffect } from "react";
import StartupHero from "./components/StartupHero";
import StartupSocialProof from "./components/StartupSocialProof";
import StartupProblemSection from "./components/StartupProblemSection";
import StartupFeatures from "./components/StartupFeatures";
import StartupFounderNote from "./components/StartupFounderNote";
import StartupTestimonials from "./components/StartupTestimonials";
import StartupCTASection from "./components/StartupCTASection";
import { scrollToHashOnLoad } from "./lib/scrollToSection";

export default function StartupHomePage() {
  useEffect(() => {
    scrollToHashOnLoad();
  }, []);

  return (
    <>
      <StartupHero />
      <StartupSocialProof />
      <StartupProblemSection />
      <StartupFeatures />
      <StartupFounderNote />
      <StartupTestimonials />
      <StartupCTASection />
    </>
  );
}