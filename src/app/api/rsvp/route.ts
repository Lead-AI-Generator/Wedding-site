import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendRSVPEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { primaryGuest, email, side, events, guestCount, guestNames, dietaryNotes } = body;

    if (!primaryGuest || !side || !events?.length || !guestCount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['bride', 'groom'].includes(side)) {
      return NextResponse.json({ error: 'Invalid side value' }, { status: 400 });
    }

    await prisma.rSVP.create({
      data: {
        primaryGuest,
        email: email ?? null,
        side,
        guestCount: Number(guestCount),
        guestNames: typeof guestNames === 'string' ? guestNames : JSON.stringify(guestNames),
        events: JSON.stringify(events),
        dietaryNotes: dietaryNotes ?? null,
      },
    });

    const parsedNames: string[] =
      typeof guestNames === 'string' ? JSON.parse(guestNames) : guestNames;

    await sendRSVPEmail({
      primaryGuest,
      side,
      guestCount: Number(guestCount),
      guestNames: parsedNames,
      events,
      dietaryNotes,
      email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('RSVP error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
