import RestaurantNavbar from "./components/RestaurantNavbar";
import RestaurantFooter from "./components/RestaurantFooter";
import "./styles/RestaurantGlobals.css";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="restaurant-root">
      <RestaurantNavbar />
      <main>{children}</main>
      <RestaurantFooter />
    </div>
  );
}