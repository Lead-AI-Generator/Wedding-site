import { RSVP } from '@prisma/client';

const EVENT_LABELS: Record<string, string> = {
  haldi: 'Haldi',
  mehndi: 'Mehndi',
  sangeet: 'Sangeet',
  baraat: 'Baraat & Ceremony',
};

function parseJson(s: string): string[] {
  try { return JSON.parse(s); } catch { return [s]; }
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

interface Props {
  rsvps: RSVP[];
}

export default function RSVPList({ rsvps }: Props) {
  if (rsvps.length === 0) {
    return (
      <p className="muted-text text-center py-5" style={{ fontSize: '0.9rem' }}>
        No RSVPs yet. Share the wedding site and check back soon!
      </p>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="rsvp-table">
        <thead>
          <tr>
            <th>Guest(s)</th>
            <th>Side</th>
            <th>Events</th>
            <th>Party</th>
            <th>Dietary</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((r) => {
            const names = parseJson(r.guestNames).join(', ');
            const events = parseJson(r.events).map((e) => EVENT_LABELS[e] ?? e).join(', ');
            return (
              <tr key={r.id}>
                <td>
                  <span style={{ color: 'var(--color-cream-text)', fontWeight: 400 }}>
                    {r.primaryGuest}
                  </span>
                  {names !== r.primaryGuest && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                      + {parseJson(r.guestNames).slice(1).join(', ')}
                    </div>
                  )}
                </td>
                <td>
                  <span className={`badge-side ${r.side === 'bride' ? 'badge-bride' : 'badge-groom'}`}>
                    {r.side === 'bride' ? "Bride's" : "Groom's"}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem' }}>{events}</td>
                <td style={{ textAlign: 'center' }}>{r.guestCount}</td>
                <td style={{ fontSize: '0.82rem', fontStyle: r.dietaryNotes ? 'normal' : 'italic', color: r.dietaryNotes ? 'var(--color-champagne)' : 'var(--color-muted)' }}>
                  {r.dietaryNotes || '—'}
                </td>
                <td style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{formatDate(r.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
