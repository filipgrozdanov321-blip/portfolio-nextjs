import { Check } from "lucide-react";
import "../styles/ShopCheckoutSteps.css";

export type CheckoutStep = 1 | 2 | 3;

const STEP_LABELS: Record<CheckoutStep, string> = {
  1: "Shipping",
  2: "Payment",
  3: "Review",
};

interface ShopCheckoutStepsProps {
  currentStep: CheckoutStep;
}

export default function ShopCheckoutSteps({ currentStep }: ShopCheckoutStepsProps) {
  const steps: CheckoutStep[] = [1, 2, 3];

  return (
    <ol className="shop-checkout-steps">
      {steps.map((step, index) => {
        const isComplete = step < currentStep;
        const isActive = step === currentStep;

        return (
          <li key={step} className="shop-checkout-steps-item">
            <div className="shop-checkout-steps-item-marker-row">
              <span
                className={`shop-checkout-steps-marker ${
                  isComplete ? "shop-checkout-steps-marker-complete" : ""
                } ${isActive ? "shop-checkout-steps-marker-active" : ""}`}
              >
                {isComplete ? <Check size={13} strokeWidth={2.5} /> : step}
              </span>
              <span
                className={`shop-checkout-steps-label ${
                  isActive ? "shop-checkout-steps-label-active" : ""
                }`}
              >
                {STEP_LABELS[step]}
              </span>
            </div>

            {index < steps.length - 1 && (
              <span
                className={`shop-checkout-steps-connector ${
                  isComplete ? "shop-checkout-steps-connector-complete" : ""
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}