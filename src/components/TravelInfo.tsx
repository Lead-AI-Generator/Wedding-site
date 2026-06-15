export default function TravelInfo() {
  return (
    <section className="section-dark" id="travel">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label">Getting Here &amp; Staying</span>
          <h2 className="section-heading cream-text">Travel &amp; Accommodation</h2>
          <div className="gold-divider" />
          <p className="section-intro muted-text mt-3">
            Ahmedabad is well-connected by air, rail, and road. We've put together some suggestions to
            make your journey and stay as smooth as possible.
          </p>
        </div>

        <div className="row g-4">
          {/* ─ Accommodation ─ */}
          <div className="col-12 col-md-6">
            <div className="travel-card">
              <h5>Accommodation</h5>

              <div className="travel-item">
                <p className="travel-item-title">Hyatt Regency Ahmedabad</p>
                <p className="travel-item-desc">
                  Located centrally with great amenities.
                </p>
                <a
                  href="https://www.hyatt.com"
                  className="travel-item-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a room →
                </a>
              </div>

              <div className="travel-item">
                <p className="travel-item-title">The House of MG</p>
                <p className="travel-item-desc">
                  A heritage boutique hotel in the heart of the old city — stunning architecture and
                  an intimate atmosphere. Perfect for those who want something unique.
                </p>
                <a
                  href="https://www.houseofmg.com"
                  className="travel-item-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more →
                </a>
              </div>

              <div className="travel-item">
                <p className="travel-item-title">ITC Narmada</p>
                <p className="travel-item-desc">
                  Luxury accommodation with excellent dining. Close to the venue and ideal for
                  families travelling with young children.
                </p>
              </div>
            </div>
          </div>

          {/* ─ Transport ─ */}
          <div className="col-12 col-md-6">
            <div className="travel-card">
              <h5>Getting Here</h5>

              <div className="travel-item">
                <p className="travel-item-title">By Air ✈️</p>
                <p className="travel-item-desc">
                  Sardar Vallabhbhai Patel International Airport (AMD) serves direct flights from
                  Mumbai, Delhi, and major international hubs. The airport is approximately 10 km
                  from the city centre.
                </p>
              </div>


              <div className="travel-item">
                <p className="travel-item-title">Visas 🛂</p>
                <p className="travel-item-desc">
                  Most nationalities can apply for an Indian e-Visa online. We recommend applying at
                  least 4 weeks before travel. Check{' '}
                  <a
                    href="https://indianvisaonline.gov.in"
                    className="travel-item-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    indianvisaonline.gov.in
                  </a>{' '}
                  for requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p
          className="text-center muted-text mt-4"
          style={{ fontSize: '0.82rem', letterSpacing: '0.05em' }}
        >
          Questions about travel? Reach us at{' '}
          <a href="mailto:jatin.pandya531@gmail.com" style={{ color: 'var(--color-gold)' }}>
            jatin.pandya531@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
