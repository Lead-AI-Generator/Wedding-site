interface WeddingEvent {
  icon: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  note?: string;
}

const events: WeddingEvent[] = [
  {
    icon: '🌿',
    name: 'Haldi',
    date: 'Monday, December 1',
    time: 'Morning — Time TBC',
    venue: 'Venue TBC',
    address: 'Ahmedabad, Gujarat',
    note: 'Wear light clothes — you will get turmeric on them!',
  },
  {
    icon: '🌸',
    name: 'Mehndi',
    date: 'Monday, December 1',
    time: 'Evening — Time TBC',
    venue: 'Venue TBC',
    address: 'Ahmedabad, Gujarat',
    note: 'Vibrant ethnic wear encouraged.',
  },
  {
    icon: '🎶',
    name: 'Sangeet',
    date: 'Tuesday, December 2',
    time: 'Evening — Time TBC',
    venue: 'Shiv Shankar Gardens',
    address: 'Ahmedabad, Gujarat',
    note: 'Get your dancing shoes ready.',
  },
  {
    icon: '✨',
    name: 'Baraat & Ceremony',
    date: 'Wednesday, December 3',
    time: 'Morning — Time TBC',
    venue: 'Pacific Gardens',
    address: 'Ahmedabad, Gujarat',
    note: 'Traditional Indian wedding attire preferred.',
  },
];

export default function Events() {
  return (
    <section className="section-mid" id="events">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label">Mark Your Calendar</span>
          <h2 className="section-heading cream-text">The Celebrations</h2>
          <div className="gold-divider" />
          <p className="section-intro muted-text mt-3">
            Four days of joy, colour, and celebration — each event a chapter in our story. We'd love
            to have you for all of them.
          </p>
        </div>

        <div className="row g-4">
          {events.map((event, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <div className="event-card">
                <span className="event-icon">{event.icon}</span>
                <p className="event-name">{event.name}</p>
                <p className="event-date">{event.date}</p>
                <p className="event-time">{event.time}</p>
                <div className="event-venue">
                  <strong style={{ color: 'var(--color-cream-text)' }}>{event.venue}</strong>
                  <br />
                  {event.address}
                </div>
                {event.note && <p className="event-note">{event.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
