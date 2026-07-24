import { NextResponse } from 'next/server'
import { snapshotSchema } from '@/lib/validation'
import { deliverSnapshot } from '@/lib/deliver'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = snapshotSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  // Honeypot: a filled value means a bot. Respond 200 so it can't tell.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const result = await deliverSnapshot(parsed.data)

  if (!result.ok) {
    // Distinguish "not wired yet" from a real send failure for the client,
    // but never leak details.
    const status = result.reason === 'not_configured' ? 503 : 502
    return NextResponse.json({ ok: false, error: result.reason }, { status })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
