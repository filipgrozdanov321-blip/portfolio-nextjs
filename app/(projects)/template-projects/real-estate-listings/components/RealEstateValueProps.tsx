import { Compass, DollarSign, MessageCircle, TrendingUp } from "lucide-react";
import "../styles/RealEstateValueProps.css";

const values = [
  {
    icon: Compass,
    title: "Local Expertise",
    description:
      "Years of working exclusively in Austin neighborhoods means pricing calls that come from experience, not a spreadsheet.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "Every listing includes a clear breakdown of what the price covers and how it compares to recent sales nearby.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description:
      "You'll deal with one agent from first tour to closing table, not a rotating team you have to re-explain things to.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description:
      "A consistent track record of closing at or above asking price in a market that rewards preparation.",
  },
];

export default function RealEstateValueProps() {
  return (
    <section className="realestate-section realestate-valueprops">
      <div className="realestate-container">
        <div className="realestate-valueprops-header">
          <p className="realestate-eyebrow">Why Meridian</p>
          <h2 className="realestate-valueprops-title">Built on how we actually work</h2>
        </div>

        <div className="realestate-valueprops-grid">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="realestate-valueprops-card">
                <div className="realestate-valueprops-icon">
                  <Icon size={22} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}