"use client";

import { useRef, useEffect } from "react";
import "../styles/logoCloud.css";

const logos = [
  "Brightlane", "Studio Nine", "UrbanCuts",
  "InkHouse", "TheParlor", "CutAbove",
  "NeedlePoint", "BladeRunner", "Velvet Room",
  "Sharp & Co", "The Chair", "Inkwell Studio",
];

export default function LogoCloud() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
  
    requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2;
  
      const styleId = "saas-marquee-style";
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
  
      styleEl.textContent = `
        @keyframes saas-marquee {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `;
  
      track.style.animation = "saas-marquee 25s linear infinite reverse";
    });
  }, []);

  return (
    <section className="saas-logo-cloud">
      <p className="saas-logo-cloud-label">Trusted by salons and studios everywhere</p>

      <div className="saas-logo-marquee-wrapper">
        <div className="saas-logo-marquee-fade-left" />
        <div className="saas-logo-marquee-fade-right" />

        <div className="saas-logo-marquee-track" ref={trackRef}>
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} className="saas-logo-cloud-item">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}