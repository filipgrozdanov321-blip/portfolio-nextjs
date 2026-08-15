import "../styles/RestaurantAbout.css";

export default function RestaurantAbout() {
  return (
    <section id="restaurant-about" className="restaurant-about">
      <div className="restaurant-about-inner">

        <div className="restaurant-about-image-wrapper">
          <div className="restaurant-about-image-placeholder" />
          <div className="restaurant-about-image-accent" />
        </div>

        <div className="restaurant-about-content">
          <p className="restaurant-about-eyebrow">Our Story</p>
          <h2 className="restaurant-about-title">
            A Family Tradition <br /> Since 1987
          </h2>
          <p className="restaurant-about-body">
            Bella Vista was born in a small kitchen in Naples, where our founder
            Marco Russo spent his childhood watching his grandmother turn simple
            ingredients into extraordinary meals. When Marco brought that vision
            to New York, he carried one rule with him: never rush a good thing.
          </p>
          <p className="restaurant-about-body">
            Every dish on our menu is a reflection of that philosophy — slow
            sauces, hand-rolled pasta, and produce sourced from farms we trust.
            We are not a chain. We are a table, and you are always welcome at it.
          </p>
          <div className="restaurant-about-stats">
            <div className="restaurant-about-stat">
              <span className="restaurant-about-stat-number">37</span>
              <span className="restaurant-about-stat-label">Years of Service</span>
            </div>
            <div className="restaurant-about-stat-divider" />
            <div className="restaurant-about-stat">
              <span className="restaurant-about-stat-number">12</span>
              <span className="restaurant-about-stat-label">Signature Dishes</span>
            </div>
            <div className="restaurant-about-stat-divider" />
            <div className="restaurant-about-stat">
              <span className="restaurant-about-stat-number">4</span>
              <span className="restaurant-about-stat-label">Awards Won</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}