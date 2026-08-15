import "../styles/howItWorks.css";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create your studio profile and add your services in just a few minutes.",
  },
  {
    number: "02",
    title: "Set Your Schedule",
    description: "Add your staff, set working hours, and customize your booking page.",
  },
  {
    number: "03",
    title: "Start Booking",
    description: "Share your booking link and let clients schedule appointments instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-header">
        <h2 className="how-it-works-title">Get started in three steps</h2>
        <p className="how-it-works-subtitle">
          No setup headaches — be up and running before your next appointment.
        </p>
      </div>

      <div className="how-it-works-grid">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <span className="step-number">{step.number}</span>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}