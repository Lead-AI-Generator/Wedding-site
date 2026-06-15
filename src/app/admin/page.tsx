import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import RSVPList from '@/components/RSVPList';

function parseJson(s: string): string[] {
  try { return JSON.parse(s); } catch { return [s]; }
}

export default async function AdminPage() {
  const session = await auth();
  adminProtectedPage(
    session as { user: { email: string; id: string; name: string } } | null,
  );

  const rsvps = await prisma.rSVP.findMany({ orderBy: { createdAt: 'desc' } });

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);
  const brideCount = rsvps.filter((r) => r.side === 'bride').length;
  const groomCount = rsvps.filter((r) => r.side === 'groom').length;

  const eventCounts: Record<string, number> = {};
  for (const r of rsvps) {
    for (const e of parseJson(r.events)) {
      eventCounts[e] = (eventCounts[e] ?? 0) + r.guestCount;
    }
  }

  const eventLabels: Record<string, string> = {
    haldi: 'Haldi', mehndi: 'Mehndi', sangeet: 'Sangeet', baraat: 'Baraat & Ceremony',
  };

  return (
    <main className="admin-page">
      <div className="container">
        <div className="mb-5">
          <span className="section-label">Admin Dashboard</span>
          <h1 className="section-heading cream-text">RSVP Submissions</h1>
          <div className="gold-divider" style={{ margin: '1rem 0' }} />
        </div>

        {/* Stats */}
        <div className="row g-3 mb-5">
          {[
            { label: 'Total RSVPs', value: rsvps.length },
            { label: 'Total Guests', value: totalGuests },
            { label: "Bride's Side", value: brideCount },
            { label: "Groom's Side", value: groomCount },
          ].map((s) => (
            <div key={s.label} className="col-6 col-md-3">
              <div className="stat-card">
                <span className="stat-number">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Per-event counts */}
        <div className="row g-3 mb-5">
          {Object.entries(eventLabels).map(([id, label]) => (
            <div key={id} className="col-6 col-md-3">
              <div className="stat-card">
                <span className="stat-number">{eventCounts[id] ?? 0}</span>
                <span className="stat-label">{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RSVP Table */}
        <div
          style={{
            background: 'var(--color-midnight-light)',
            border: '1px solid rgba(201,168,76,0.2)',
            padding: '2rem',
          }}
        >
          <RSVPList rsvps={rsvps} />
        </div>
      </div>
    </main>
  );
}
