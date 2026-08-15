import "./styles/globals.css";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import LogoCloud from "./components/logoCloud";
import Features from "./components/Features";
import HowItWorks from "./components/howItWorks";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/faq";
import FinalCTA from "./components/finalCTA";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="saas-root">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}