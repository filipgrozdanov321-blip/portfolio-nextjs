import RestaurantHero from "./components/RestaurantHero";
import RestaurantAbout from "./components/RestaurantAbout";
import RestaurantMenu from "./components/Menu";
import RestaurantGallery from "./components/RestaurantGallery";
import RestaurantTestimonials from "./components/RestaurantTestimonials";
import RestaurantLocation from "./components/RestaurantLocation";

export default function RestaurantPage() {
  return (
    <>
      <RestaurantHero />
      <RestaurantAbout />
      <RestaurantMenu />
      <RestaurantGallery />
      <RestaurantTestimonials />
      <RestaurantLocation />
    </>
  );
}