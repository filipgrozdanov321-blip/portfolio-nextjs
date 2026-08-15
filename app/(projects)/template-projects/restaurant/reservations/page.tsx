import "../styles/RestaurantReservations.css";

export default function RestaurantReservations() {
  return (
    <section className="restaurant-reservations">
      <div className="restaurant-reservations-inner">

        <div className="restaurant-reservations-header">
          <p className="restaurant-reservations-eyebrow">Reserve Your Table</p>
          <h1 className="restaurant-reservations-title">Make a Reservation</h1>
          <p className="restaurant-reservations-subtitle">
            Join us for an unforgettable evening. Fill in your details below
            and we will confirm your reservation within 24 hours.
          </p>
        </div>

        <form className="restaurant-reservations-form">

          <div className="restaurant-reservations-row">
            <div className="restaurant-reservations-field">
              <label className="restaurant-reservations-label" htmlFor="res-name">
                Full Name
              </label>
              <input
                id="res-name"
                type="text"
                className="restaurant-reservations-input"
                placeholder="Marco Russo"
              />
            </div>
            <div className="restaurant-reservations-field">
              <label className="restaurant-reservations-label" htmlFor="res-email">
                Email Address
              </label>
              <input
                id="res-email"
                type="email"
                className="restaurant-reservations-input"
                placeholder="marco@example.com"
              />
            </div>
          </div>

          <div className="restaurant-reservations-row">
            <div className="restaurant-reservations-field">
              <label className="restaurant-reservations-label" htmlFor="res-phone">
                Phone Number
              </label>
              <input
                id="res-phone"
                type="tel"
                className="restaurant-reservations-input"
                placeholder="+1 (212) 555-0198"
              />
            </div>
            <div className="restaurant-reservations-field">
              <label className="restaurant-reservations-label" htmlFor="res-guests">
                Number of Guests
              </label>
              <select id="res-guests" className="restaurant-reservations-input restaurant-reservations-select">
                <option value="">Select guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
                <option value="7+">7+ Guests</option>
              </select>
            </div>
          </div>

          <div className="restaurant-reservations-row">
            <div className="restaurant-reservations-field">
              <label className="restaurant-reservations-label" htmlFor="res-date">
                Date
              </label>
              <input
                id="res-date"
                type="date"
                className="restaurant-reservations-input"
              />
            </div>
            <div className="restaurant-reservations-field">
              <label className="restaurant-reservations-label" htmlFor="res-time">
                Time
              </label>
              <select id="res-time" className="restaurant-reservations-input restaurant-reservations-select">
                <option value="">Select time</option>
                <option value="12:00">12:00 pm</option>
                <option value="12:30">12:30 pm</option>
                <option value="13:00">1:00 pm</option>
                <option value="13:30">1:30 pm</option>
                <option value="14:00">2:00 pm</option>
                <option value="18:00">6:00 pm</option>
                <option value="18:30">6:30 pm</option>
                <option value="19:00">7:00 pm</option>
                <option value="19:30">7:30 pm</option>
                <option value="20:00">8:00 pm</option>
                <option value="20:30">8:30 pm</option>
                <option value="21:00">9:00 pm</option>
              </select>
            </div>
          </div>

          <div className="restaurant-reservations-field">
            <label className="restaurant-reservations-label" htmlFor="res-requests">
              Special Requests
            </label>
            <textarea
              id="res-requests"
              className="restaurant-reservations-input restaurant-reservations-textarea"
              placeholder="Allergies, dietary requirements, special occasions..."
              rows={4}
            />
          </div>

          <button type="submit" className="restaurant-reservations-submit">
            Confirm Reservation
          </button>

        </form>
      </div>
    </section>
  );
}