interface StoryEntry {
  city: string;
  title: string;
  body: string;
  photo?: string;
  photoAlt?: string;
  flip?: boolean;
}

const entries: StoryEntry[] = [
  {
    city: 'Honolulu, Hawaii & Ahmedabad, India',
    title: 'Two Worlds',
    body: `Jatin grew up among the golden shores of Honolulu, Hawaii — the Pacific horizon his backyard and aloha his compass. Half a world away, Anushi was raised in the vibrant, spirited city of Ahmedabad, Gujarat, steeped in culture, colour, and the warmth of family. Two entirely different worlds, neither aware of the other — yet.`,
    photo: '/images/story/two-worlds.jpg',
    photoAlt: 'Honolulu and Ahmedabad — two worlds',
  },
  {
    city: 'San Francisco · London',
    title: 'Miles Apart, Closer Than Ever',
    body: `Jatin had moved to San Francisco, chasing the energy of the tech world. Anushi was building her career in London, a city that had become her second home. Five thousand miles separated them — different time zones, different seasons — but a single conversation changed everything. Distance, they decided, was just a detail.`,
    photo: '/images/story/long-distance.jpg',
    photoAlt: 'San Francisco and London skylines',
    flip: true,
  },
  {
    city: 'Budapest, Hungary',
    title: 'First Adventure Together',
    body: `Their first trip together brought them to the grand boulevards and ruin bars of Budapest — a city that felt like a dream. Walking across the Chain Bridge at golden hour, discovering hidden courtyards, and sharing plates of food they couldn't pronounce: this was the trip that turned "maybe" into "definitely."`,
    photo: '/images/story/budapest.jpg',
    photoAlt: 'Budapest — Chain Bridge at golden hour',
  },
  {
    city: 'Las Vegas, Nevada',
    title: 'Under the Desert Lights',
    body: `Next stop: the dazzling, improbable neon glow of Las Vegas. They wandered the Strip, caught shows, took chances, and laughed until their sides hurt. Vegas has a way of making everything feel larger than life — and they loved every ridiculous, spectacular moment of it.`,
    photo: '/images/story/las-vegas.jpg',
    photoAlt: 'Las Vegas Strip at night',
    flip: true,
  },
  {
    city: 'Monterey Bay, California',
    title: 'Pacific Coast Escape',
    body: `Back on the California coast — their pace slowed, the ocean breeze cool and salty. Monterey Bay offered tidepools, sea otters, and long drives along Highway 1. Quiet mornings and unhurried afternoons reminded them that the best adventures don't need a marquee.`,
    photo: '/images/story/monterey.jpg',
    photoAlt: 'Monterey Bay coastline',
  },
  {
    city: 'London, England',
    title: 'Crossing the Distance',
    body: `Then came the decision that changed everything: Jatin packed up San Francisco and moved to London. No more airports, no more red-eye flights, no more counting down the hours on FaceTime. The same postcode, the same kitchen, the same city skyline. After years of long distance — they were finally, simply, together.`,
    photo: '/images/story/london.jpg',
    photoAlt: 'London — together at last',
    flip: true,
  },
  {
    city: 'Ahmedabad, India — December 2026',
    title: 'Coming Home',
    body: `And now, the next chapter begins in the city where Anushi's story started. Surrounded by the people who love them most, Jatin and Anushi are coming home — to celebrate, to commit, and to begin a life that no ocean can put distance between. We cannot wait to have you there.`,
    photo: '/images/story/coming-home.jpg',
    photoAlt: 'Ahmedabad — coming home',
  },
];

function PhotoSlot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="story-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block', border: '1px solid rgba(201,168,76,0.3)' }}
      />
    </div>
  );
}

function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="story-photo">
      <div className="story-photo-placeholder">{label}</div>
    </div>
  );
}

export default function OurStory() {
  return (
    <section className="section-dark" id="our-story">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label">How It Happened</span>
          <h2 className="section-heading cream-text">Our Story</h2>
          <div className="gold-divider" />
        </div>

        <div className="story-timeline">
          {entries.map((entry, i) => (
            <div key={i} className={`story-card ${entry.flip ? 'right' : ''}`}>
              <div className="story-content">
                <p className="story-city">{entry.city}</p>
                <h3 className="story-title">{entry.title}</h3>
                <p className="story-body">{entry.body}</p>
              </div>

              <div className="story-dot-col">
                <div className="story-dot" />
              </div>

              {entry.photo ? (
                <PhotoSlot src={entry.photo} alt={entry.photoAlt || entry.title} />
              ) : (
                <PhotoPlaceholder label={`📸 ${entry.title}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
