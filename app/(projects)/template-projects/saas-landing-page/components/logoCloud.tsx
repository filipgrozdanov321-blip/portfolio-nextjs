import "../styles/logoCloud.css";

const logos = [
  "Brightlane", "Studio Nine", "UrbanCuts",
  "InkHouse", "TheParlor", "CutAbove",
  "NeedlePoint", "BladeRunner", "Velvet Room",
  "Sharp & Co", "The Chair", "Inkwell Studio",
];

export default function LogoCloud() {
  return (
    <section className="saas-logo-cloud">
      <p className="saas-logo-cloud-label">Trusted by salons and studios everywhere</p>

      <div className="saas-logo-marquee-wrapper">
        <div className="saas-logo-marquee-fade-left" />
        <div className="saas-logo-marquee-fade-right" />

        <div className="saas-logo-marquee-track">
          {/* The list is shown twice so the loop has no gap. The second copy
              is hidden from screen readers so they don't read every name twice. */}
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="saas-logo-cloud-item"
              aria-hidden={i >= logos.length || undefined}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}