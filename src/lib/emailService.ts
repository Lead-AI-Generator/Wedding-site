import { Resend } from 'resend';

const FROM = process.env.WEDDING_EMAIL_FROM || 'onboarding@resend.dev';
const TO = process.env.WEDDING_EMAIL_TO || 'becominghisjaanu@gmail.com';

const EVENT_LABELS: Record<string, string> = {
  haldi: 'Haldi (Dec 1 — Morning)',
  mehndi: 'Mehndi (Dec 1 — Evening)',
  sangeet: 'Sangeet (Dec 2 — Shiv Shankar Gardens)',
  baraat: 'Baraat & Wedding Ceremony (Dec 3 — Pacific Gardens)',
};

interface RSVPEmailPayload {
  primaryGuest: string;
  side: string;
  guestCount: number;
  guestNames: string[];
  events: string[];
  dietaryNotes?: string | null;
  email?: string | null;
}

export async function sendRSVPEmail(payload: RSVPEmailPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');
  const sideLabel = payload.side === 'bride' ? "Bride's Family & Friends" : "Groom's Family & Friends";
  const eventLines = payload.events.map((e) => `  • ${EVENT_LABELS[e] ?? e}`).join('\n');
  const names = payload.guestNames.join(', ');
  const submitted = new Date().toUTCString();

  const text = `
New RSVP Received — Jatin & Anushi Wedding

Guest(s): ${names}
Side: ${sideLabel}
Total in party: ${payload.guestCount}
Events attending:
${eventLines}
${payload.dietaryNotes ? `\nDietary notes: ${payload.dietaryNotes}` : ''}
${payload.email ? `Guest email: ${payload.email}` : ''}

Submitted: ${submitted}
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Georgia, serif; background: #0D1B2A; color: #F5E6D3; padding: 32px; max-width: 600px; margin: 0 auto;">
  <div style="border: 1px solid rgba(201,168,76,0.3); padding: 32px;">
    <h1 style="font-size: 1.5rem; color: #C9A84C; letter-spacing: 0.1em; margin-bottom: 4px;">New RSVP</h1>
    <p style="color: #9E8E7A; font-size: 0.85rem; margin-top: 0;">Jatin &amp; Anushi · December 3, 2026</p>
    <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />

    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; width: 160px; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Guest(s)</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${names}</td>
      </tr>
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Side</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${sideLabel}</td>
      </tr>
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Party Size</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${payload.guestCount} guest${payload.guestCount !== 1 ? 's' : ''}</td>
      </tr>
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Events</td>
        <td style="padding: 6px 0; color: #F5E6D3;">
          ${payload.events.map((e) => `<div>• ${EVENT_LABELS[e] ?? e}</div>`).join('')}
        </td>
      </tr>
      ${payload.dietaryNotes ? `
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Dietary</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${payload.dietaryNotes}</td>
      </tr>` : ''}
      ${payload.email ? `
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Guest Email</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${payload.email}</td>
      </tr>` : ''}
    </table>

    <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />
    <p style="color: #9E8E7A; font-size: 0.75rem;">Submitted: ${submitted}</p>
  </div>
</body>
</html>
  `.trim();

  const adminSend = resend.emails.send({
    from: FROM,
    to: TO,
    subject: `RSVP: ${payload.primaryGuest} & party (${payload.guestCount} guest${payload.guestCount !== 1 ? 's' : ''}) — ${sideLabel}`,
    text,
    html,
  });

  if (payload.email) {
    const confirmText = `
Hi ${payload.primaryGuest},

You're on the list! We've received your RSVP and can't wait to celebrate with you.

Your RSVP summary:
${eventLines}
Party size: ${payload.guestCount} guest${payload.guestCount !== 1 ? 's' : ''}
${payload.dietaryNotes ? `Dietary notes: ${payload.dietaryNotes}\n` : ''}
More details will follow closer to December.

With love,
Jatin & Anushi
    `.trim();

    const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family: Georgia, serif; background: #0D1B2A; color: #F5E6D3; padding: 32px; max-width: 600px; margin: 0 auto;">
  <div style="border: 1px solid rgba(201,168,76,0.3); padding: 32px;">
    <h1 style="font-size: 1.5rem; color: #C9A84C; letter-spacing: 0.1em; margin-bottom: 4px;">You're on the list!</h1>
    <p style="color: #9E8E7A; font-size: 0.85rem; margin-top: 0;">Jatin &amp; Anushi · December 3, 2026</p>
    <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />

    <p style="line-height: 1.7; margin-bottom: 20px;">Hi ${payload.primaryGuest},</p>
    <p style="line-height: 1.7; margin-bottom: 20px;">We've received your RSVP and can't wait to celebrate with you. Here's a summary of what you registered for:</p>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; width: 160px; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Events</td>
        <td style="padding: 6px 0; color: #F5E6D3;">
          ${payload.events.map((e) => `<div>• ${EVENT_LABELS[e] ?? e}</div>`).join('')}
        </td>
      </tr>
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Party Size</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${payload.guestCount} guest${payload.guestCount !== 1 ? 's' : ''}</td>
      </tr>
      ${payload.dietaryNotes ? `
      <tr>
        <td style="color: #C9A84C; padding: 6px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Dietary</td>
        <td style="padding: 6px 0; color: #F5E6D3;">${payload.dietaryNotes}</td>
      </tr>` : ''}
    </table>

    <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />
    <p style="line-height: 1.7; margin-bottom: 0;">More details will follow closer to December. We're so excited to have you there.</p>
    <br />
    <p style="color: #C9A84C; font-size: 0.85rem; letter-spacing: 0.15em;">WITH LOVE, JATIN &amp; ANUSHI</p>
  </div>
</body>
</html>
    `.trim();

    await resend.emails.send({
      from: FROM,
      to: payload.email,
      subject: `You're on the list! RSVP confirmed — Jatin & Anushi's Wedding`,
      text: confirmText,
      html: confirmHtml,
    });
  }

  return adminSend;
}
