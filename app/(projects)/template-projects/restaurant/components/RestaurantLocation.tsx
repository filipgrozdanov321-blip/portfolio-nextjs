import "../styles/RestaurantLocation.css";

const HOURS = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "12:00 pm – 10:00 pm" },
  { day: "Wednesday", hours: "12:00 pm – 10:00 pm" },
  { day: "Thursday", hours: "12:00 pm – 10:00 pm" },
  { day: "Friday", hours: "12:00 pm – 11:00 pm" },
  { day: "Saturday", hours: "11:00 am – 11:00 pm" },
  { day: "Sunday", hours: "11:00 am – 9:00 pm" },
];

export default function RestaurantLocation() {
  return (
    <section id="restaurant-location" className="restaurant-location">
      <div className="restaurant-location-inner">

        <div className="restaurant-location-header">
          <p className="restaurant-location-eyebrow">Find Us</p>
          <h2 className="restaurant-location-title">Hours & Location</h2>
        </div>

        <div className="restaurant-location-content">

          <div className="restaurant-location-hours">
            <h3 className="restaurant-location-subtitle">Opening Hours</h3>
            <ul className="restaurant-location-hours-list">
              {HOURS.map((row) => (
                <li
                  key={row.day}
                  className={`restaurant-location-hours-row ${row.hours === "Closed" ? "restaurant-location-hours-closed" : ""}`}
                >
                  <span className="restaurant-location-hours-day">{row.day}</span>
                  <span className="restaurant-location-hours-dots" aria-hidden="true" />
                  <span className="restaurant-location-hours-time">{row.hours}</span>
                </li>
              ))}
            </ul>

            <div className="restaurant-location-details">
              <div className="restaurant-location-detail">
                <span className="restaurant-location-detail-label">Address</span>
                <span className="restaurant-location-detail-value">392 Greenwich St, New York, NY 10013</span>
              </div>
              <div className="restaurant-location-detail">
                <span className="restaurant-location-detail-label">Phone</span>
                <span className="restaurant-location-detail-value">+1 (212) 555-0198</span>
              </div>
              <div className="restaurant-location-detail">
                <span className="restaurant-location-detail-label">Email</span>
                <span className="restaurant-location-detail-value">info@bellavista.com</span>
              </div>
            </div>
          </div>

          <div className="restaurant-location-map">
            <iframe
              className="restaurant-location-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.157!2d-74.0089!3d40.7209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598a3c1b7f3b%3A0x1b2c3d4e5f6a7b8c!2s392+Greenwich+St%2C+New+York%2C+NY+10013!5e0!3m2!1sen!2sus!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}