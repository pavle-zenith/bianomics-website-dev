import { z } from 'zod'

/**
 * Single source of truth for Snapshot form validation, imported by both
 * the client form (UX) and the /api/snapshot route handler (trust).
 * Field names/labels match the current live form exactly.
 */

export const AGENCY_HISTORY_OPTIONS = [
  { value: 'loved', label: 'Yes, and loved it' },
  { value: 'underwhelmed', label: 'Yes, and it was underwhelming' },
  { value: 'bad', label: 'Yes, and it was a bad experience' },
  { value: 'first', label: 'No, this would be a first' },
] as const

export type AgencyHistory = (typeof AGENCY_HISTORY_OPTIONS)[number]['value']

const agencyHistoryValues = AGENCY_HISTORY_OPTIONS.map((o) => o.value) as [
  AgencyHistory,
  ...AgencyHistory[],
]

export const snapshotSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80),
  org: z.string().trim().min(1, 'Please enter your organization.').max(120),
  email: z.email('Please enter a valid email address.').max(160),
  orgDoes: z
    .string()
    .trim()
    .min(2, 'Tell us in one sentence what your org does.')
    .max(300),
  biggestChallenge: z
    .string()
    .trim()
    .min(2, 'Let us know your biggest challenge right now.')
    .max(1500),
  winIn90Days: z
    .string()
    .trim()
    .min(2, 'Describe what a win would look like.')
    .max(1500),
  workedWithAgency: z.enum(agencyHistoryValues, {
    message: 'Please choose one.',
  }),
  /**
   * Honeypot: real users never fill this. We accept any string here so
   * validation passes; the route handler inspects the value and silently
   * drops the request (200) when it is non-empty, so bots get no signal.
   */
  company_website: z.string().optional().default(''),
})

export type SnapshotInput = z.infer<typeof snapshotSchema>

/** Field keys a user actually fills (excludes the honeypot). */
export type SnapshotField = Exclude<keyof SnapshotInput, 'company_website'>
