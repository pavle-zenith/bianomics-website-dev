import 'server-only'

import { Resend } from 'resend'
import { AGENCY_HISTORY_OPTIONS, type SnapshotInput } from './validation'

/**
 * The delivery seam. Everything about WHERE a Snapshot submission goes
 * lives behind this one function. Swapping Resend for a CRM/HubSpot/etc.
 * later means reimplementing only `deliverSnapshot` — the route handler,
 * schema, and form never change.
 */

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

export async function deliverSnapshot(data: SnapshotInput): Promise<DeliverResult> {
  if (!RESEND_API_KEY || !SNAPSHOT_TO_EMAIL) {
    // Not wired yet (missing env). Log so submissions aren't silently lost
    // in dev, and report a clear reason to the caller.
    console.warn(
      '[snapshot] RESEND_API_KEY or SNAPSHOT_TO_EMAIL not set — submission not delivered.',
      { org: data.org, email: data.email },
    )
    return { ok: false, reason: 'not_configured' }
  }

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
    return { ok: false, reason: 'send_failed' }
  }

  return { ok: true }
}
