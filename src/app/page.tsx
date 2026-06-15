import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import Events from '@/components/Events';
import TravelInfo from '@/components/TravelInfo';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Hero />
      <OurStory />
      <Events />
      <TravelInfo />

      {/* RSVP CTA band */}
      <section className="section-mid" style={{ padding: '5rem 0' }}>
        <div className="container text-center">
          <span className="section-label">You&apos;re Invited</span>
          <h2 className="section-heading cream-text">Will You Join Us?</h2>
          <div className="gold-divider" />
          <p className="section-intro muted-text mt-3 mb-4">
            Let us know you&apos;re coming — which events you&apos;ll attend, how many guests are in
            your party, and any dietary notes we should know about.
          </p>
          <Link href="/rsvp" className="btn-gold" style={{ display: 'inline-block', width: 'auto', padding: '1rem 3.5rem' }}>
            RSVP Now
          </Link>
        </div>
      </section>
    </main>
  );
}
