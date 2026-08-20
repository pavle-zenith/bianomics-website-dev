import 'server-only'

import { Resend } from 'resend'
import { AGENCY_HISTORY_OPTIONS, type SnapshotInput } from './validation'

/**
 * The delivery seam. Everything about WHERE a Snapshot submission goes
 * lives behind this one function. Both forms on the site — the landing
 * section and /snapshot — post to the same route, so both are wired by
 * whatever this file does.
 *
 * Two destinations, tried together and independently:
 *   - the Make webhook, which is what feeds Monday
 *   - Resend, which emails the submission
 * Either one being configured is enough. A submission counts as delivered if
 * at least one destination accepted it, so a Make outage does not lose a lead
 * that the email still carries, and vice versa.
 */

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL
const MAKE_API_KEY = process.env.MAKE_API_KEY
/** A slow webhook must not hold the user's submit button hostage. */
const MAKE_TIMEOUT_MS = 10_000

const RESEND_API_KEY = process.env.RESEND_API_KEY
const SNAPSHOT_TO_EMAIL = process.env.SNAPSHOT_TO_EMAIL
// A verified Resend sender. Falls back to Resend's shared onboarding sender
// so local/dev works before a domain is verified.
const SNAPSHOT_FROM_EMAIL =
  process.env.SNAPSHOT_FROM_EMAIL ?? 'Bianomics Snapshot <onboarding@resend.dev>'

function historyLabel(value: SnapshotInput['workedWithAgency']): string {
  return AGENCY_HISTORY_OPTIONS.find((o) => o.value === value)?.label ?? value
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildEmail(data: SnapshotInput) {
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Organization', data.org],
    ['Email', data.email],
    ['What the org does', data.orgDoes],
    ['Biggest challenge', data.biggestChallenge],
    ['A win in 90 days', data.winIn90Days],
    ['Worked with an agency before', historyLabel(data.workedWithAgency)],
  ]

  const text = rows.map(([k, v]) => `${k}:\n${v}`).join('\n\n')
  const html = `
    <h2 style="font-family:system-ui,sans-serif">New Snapshot request</h2>
    <table style="font-family:system-ui,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:6px 12px;vertical-align:top;color:#626772;white-space:nowrap"><strong>${escapeHtml(
                 k,
               )}</strong></td>
               <td style="padding:6px 12px;vertical-align:top">${escapeHtml(v).replace(
                 /\n/g,
                 '<br>',
               )}</td>
             </tr>`,
        )
        .join('')}
    </table>`

  return { text, html }
}

export type DeliverResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'send_failed' }

/** `null` means this destination is not configured, so it is not a failure. */
type Attempt = boolean | null

/**
 * The Make webhook that feeds Monday. The key names and the exact option
 * strings are Make's contract, not ours: `worked_with_agency` has to arrive as
 * one of the four labels, which is why it sends `historyLabel()` rather than
 * the internal enum value the form holds.
 */
async function deliverToMake(data: SnapshotInput): Promise<Attempt> {
  if (!MAKE_WEBHOOK_URL || !MAKE_API_KEY) return null

  const payload = {
    organization: data.org,
    name: data.name,
    email: data.email,
    what_they_do: data.orgDoes,
    pain_point: data.biggestChallenge,
    future_state: data.winIn90Days,
    worked_with_agency: historyLabel(data.workedWithAgency),
  }

  try {
    const res = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-make-apikey': MAKE_API_KEY,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(MAKE_TIMEOUT_MS),
    })

    if (!res.ok) {
      // The body is Make's, not a user's, so it is safe to log and it is the
      // only thing that says which scenario step rejected the payload.
      const detail = await res.text().catch(() => '')
      console.error(
        `[snapshot] Make webhook rejected the submission: ${res.status} ${detail.slice(0, 300)}`,
      )
      return false
    }
    return true
  } catch (error) {
    console.error('[snapshot] Make webhook failed:', error)
    return false
  }
}

/** The email copy of the submission. */
async function deliverByEmail(data: SnapshotInput): Promise<Attempt> {
  if (!RESEND_API_KEY || !SNAPSHOT_TO_EMAIL) return null

  const resend = new Resend(RESEND_API_KEY)
  const { text, html } = buildEmail(data)

  const { error } = await resend.emails.send({
    from: SNAPSHOT_FROM_EMAIL,
    to: SNAPSHOT_TO_EMAIL,
    replyTo: data.email,
    subject: `Snapshot request — ${data.org}`,
    text,
    html,
  })

  if (error) {
    console.error('[snapshot] Resend send failed:', error)
    return false
  }
  return true
}

export async function deliverSnapshot(data: SnapshotInput): Promise<DeliverResult> {
  // Both at once: the webhook and the email have nothing to say to each other,
  // and running them in series would add the slower one's latency to submit.
  const attempts = await Promise.all([deliverToMake(data), deliverByEmail(data)])

  if (attempts.every((a) => a === null)) {
    // Not wired yet (missing env). Log so submissions aren't silently lost
    // in dev, and report a clear reason to the caller.
    console.warn(
      '[snapshot] No delivery destination configured (Make webhook and Resend both unset) — submission not delivered.',
      { org: data.org, email: data.email },
    )
    return { ok: false, reason: 'not_configured' }
  }

  // One destination accepting it is enough to call the lead captured.
  if (attempts.some((a) => a === true)) return { ok: true }

  return { ok: false, reason: 'send_failed' }
}
