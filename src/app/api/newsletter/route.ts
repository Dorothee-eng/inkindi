import { NextResponse } from 'next/server';

// Newsletter signup stub. Wire this to Klaviyo / Mailchimp / Brevo by
// replacing the body of this handler — keep the request/response shape the
// same so the client never needs to change.

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    // TODO: forward to your ESP. Example (Klaviyo):
    // await fetch('https://a.klaviyo.com/api/v2/list/{LIST_ID}/subscribe?api_key=...', { ... })

    console.log('[newsletter] signup', email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
