import RSVPForm from '@/components/RSVPForm';

export const metadata = {
  title: 'RSVP — Jatin & Anushi',
};

export default function RSVPPage() {
  return (
    <main className="rsvp-page">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-label">You&apos;re Invited</span>
          <h1 className="section-heading cream-text">RSVP</h1>
          <div className="gold-divider" />
          <p
            className="muted-text mt-3"
            style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '480px', margin: '1rem auto 0' }}
          >
            Please fill out one form per family or party. Let us know which events you&apos;ll be
            joining, who&apos;s coming along, and any dietary needs — we&apos;ll take care of the rest.
          </p>
        </div>

        <RSVPForm />
      </div>
    </main>
  );
}
