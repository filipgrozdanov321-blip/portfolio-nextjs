import "../styles/Pricing.css";

const plans = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Perfect for solo stylists and freelancers just getting started.",
    features: ["1 staff member", "Online booking page", "Email reminders", "Basic client profiles"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing studios that need more staff and more control.",
    features: [
      "Up to 5 staff members",
      "SMS + email reminders",
      "Advanced client profiles",
      "Staff calendar view",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For multi-location studios with custom needs.",
    features: [
      "Unlimited staff members",
      "Multi-location support",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing-header">
        <h2 className="pricing-title">Simple, transparent pricing</h2>
        <p className="pricing-subtitle">
          Choose the plan that fits your studio. Upgrade or cancel anytime.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.highlighted ? "pricing-card-highlighted" : ""}`}
          >
            {plan.highlighted && <span className="pricing-badge">Most Popular</span>}

            <h3 className="pricing-plan-name">{plan.name}</h3>
            <div className="pricing-amount">
              <span className="pricing-price">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>
            <p className="pricing-description">{plan.description}</p>

            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a href="/contact" className="pricing-cta">
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}