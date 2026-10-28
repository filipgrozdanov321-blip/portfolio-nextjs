import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import "../styles/ShopOrderConfirmation.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

interface ShopOrderConfirmationProps {
  orderNumber: string;
  email: string;
}

export default function ShopOrderConfirmation({
  orderNumber,
  email,
}: ShopOrderConfirmationProps) {
  return (
    // role="status": the checkout is replaced by this screen, so a screen reader
    // announces "Order Placed" instead of staying silent
    <div className="shop-order-confirmation" role="status">
      <CheckCircle2
        size={48}
        strokeWidth={1.5}
        className="shop-order-confirmation-icon"
        aria-hidden="true"
      />
      <h1 className="shop-order-confirmation-heading">Order Placed</h1>
      <p className="shop-order-confirmation-text">
        Thank you — your order has been confirmed. A receipt has been sent to{" "}
        {email}.
      </p>

      <div className="shop-order-confirmation-order-number">
        <span className="shop-order-confirmation-order-number-label">
          Order Number
        </span>
        <span className="shop-order-confirmation-order-number-value">
          {orderNumber}
        </span>
      </div>

      <p className="shop-order-confirmation-demo-note">
        This is a UI demo — no real order was placed and no payment was
        processed.
      </p>

      <Link href={BASE_PATH} className="shop-order-confirmation-link">
        Return to Home
      </Link>
    </div>
  );
}