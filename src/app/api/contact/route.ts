import { NextResponse } from 'next/server';

// Contact form stub. Wire this to your transactional email provider (Resend,
// Postmark, SendGrid) or to a CRM (Hubspot, Pipedrive). For Rwanda support,
// it is worth bridging to WhatsApp Business via the Cloud API as well.

export const runtime = 'nodejs';

interface ContactBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    if (!body.email || !body.message || !body.firstName) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    // TODO: forward to your provider here.
    console.log('[contact]', body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
