import { Truck, RotateCcw, ShieldCheck, Package } from "lucide-react";
import "../styles/ShopTrustBadges.css";

const BADGES = [
  { icon: Truck, label: "Free Shipping", detail: "On orders over $75" },
  { icon: RotateCcw, label: "Easy Returns", detail: "30-day return window" },
  { icon: ShieldCheck, label: "Secure Checkout", detail: "Your data stays protected" },
  { icon: Package, label: "Thoughtful Packaging", detail: "Every order, carefully wrapped" },
];

export default function ShopTrustBadges() {
  return (
    <section className="shop-trust-badges-section">
      <div className="shop-container shop-trust-badges-grid">
        {BADGES.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="shop-trust-badge">
            <Icon size={22} strokeWidth={1.5} className="shop-trust-badge-icon" />
            <div className="shop-trust-badge-text">
              <span className="shop-trust-badge-label">{label}</span>
              <span className="shop-trust-badge-detail">{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}