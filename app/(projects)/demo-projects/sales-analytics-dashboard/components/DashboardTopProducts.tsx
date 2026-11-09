import type { TopProduct } from "../data/salesData";
import "../styles/DashboardTopProducts.css";

interface DashboardTopProductsProps {
  products: TopProduct[];
  /** How many rows to show */
  limit?: number;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US");

export default function DashboardTopProducts({ products, limit = 5 }: DashboardTopProductsProps) {
  const rows = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, limit);

  return (
    <div className="dashboard-top-products dashboard-card">
      <div className="dashboard-top-products-header">
        <h2 className="dashboard-top-products-title">Top products</h2>
        <p className="dashboard-top-products-subtitle">Best sellers by revenue, all time</p>
      </div>

      <table className="dashboard-top-products-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col" className="is-number">
              Units
            </th>
            <th scope="col" className="is-number">
              Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((product, index) => (
            <tr key={product.id}>
              <th scope="row">
                <span className="dashboard-top-products-rank" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="dashboard-top-products-name">
                  {product.name}
                  <span className="dashboard-top-products-category">{product.category}</span>
                </span>
              </th>
              <td className="is-number dashboard-numeric">{numberFormatter.format(product.unitsSold)}</td>
              <td className="is-number dashboard-numeric">{currencyFormatter.format(product.revenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
