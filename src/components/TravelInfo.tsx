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

              <p className="travel-item-desc" style={{ marginBottom: '1.25rem' }}>
                For accommodation recommendations and any group arrangements, please reach out directly
                to the bride&apos;s or groom&apos;s family — they&apos;ll be happy to help point you
                in the right direction.
              </p>

              <div className="travel-item">
                <p className="travel-item-title">El Dorado Ahmedabad</p>
                <p className="travel-item-desc">
                  A well-regarded hotel offering comfortable rooms and convenient access to the city.
                </p>
              </div>

              <div className="travel-item">
                <p className="travel-item-title">Taj Ahmedabad</p>
                <p className="travel-item-desc">
                  Iconic luxury in the heart of Ahmedabad, with world-class dining and service.
                </p>
              </div>

              <div className="travel-item">
                <p className="travel-item-title">ITC Narmada</p>
                <p className="travel-item-desc">
                  Luxury accommodation with excellent dining, ideal for families travelling with
                  young children.
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
          <a href="mailto:becominghisjaanu@gmail.com" style={{ color: 'var(--color-gold)' }}>
            becominghisjaanu@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
