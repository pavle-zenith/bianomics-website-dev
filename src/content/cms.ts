/**
 * Sanity -> content model.
 *
 * Each `withX(default, docs)` takes the code default from site.ts / labs.ts /
 * faq.ts / results.ts / snapshotPage.ts and returns the same shape with the
 * copy from Sanity laid over it. `docs` is either the live fetch (see live.ts,
 * which is what pages render) or the committed snapshot in cms.json (the
 * fallback, and what the static exports in site.ts etc. use).
 *
 * Code still owns what the editor shouldn't: ids, colors per practice, photo
 * and image keys for existing items, hrefs, and the locked brand language
 * (`brand`, `snapshot`), which never goes through Sanity. Anything missing or
 * empty in Sanity falls back to the code default, so a blank field can't
 * blank the site.
 *
 * Visual Editing: in draft mode every string from Sanity carries invisible
 * "stega" markers that let the Studio map a click on the page back to its
 * field. Rendered text keeps them; anything used as an id, key, lookup, color
 * or URL goes through `clean()` first, or the markers would break it.
 */
import { stegaClean } from '@sanity/client/stega'
import raw from './cms.json'
import type { LabColorKey } from './types'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>
export type Docs = Record<string, Doc | undefined>

/** The published documents as of the last `npm run content:pull`. */
export const snapshotDocs = raw as Docs

/** One fixed document per section. Duplicates created in the Studio are ignored. */
export const CMS_DOC_IDS = [
  'aboutSection',
  'audienceSection',
  'comparisonSection',
  'contactDetails',
  'faqSection',
  'founderSection',
  'opportunityLabSection',
  'practicesSection',
  'processSection',
  'programBanner',
  'resultsSection',
  'snapshotLandingPage',
  'teamSection',
  'trustStrip',
] as const

const PRACTICES: LabColorKey[] = ['vision', 'stage', 'blueprint', 'groundwork']

/** Strip Visual Editing markers from a value used for logic rather than display. */
function clean<T>(value: T): T {
  return typeof value === 'string' ? (stegaClean(value) as T) : value
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && clean(value).trim() ? value : fallback
}

function optStr(value: unknown): string | undefined {
  return typeof value === 'string' && clean(value).trim() ? value : undefined
}

/** A plain value (URL, key, id): cleaned, or the fallback when empty. */
function plain(value: unknown, fallback: string): string {
  const v = typeof value === 'string' ? clean(value).trim() : ''
  return v || fallback
}

function optPlain(value: unknown): string | undefined {
  const v = typeof value === 'string' ? clean(value).trim() : ''
  return v || undefined
}

function strings(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out = value.filter((v): v is string => typeof v === 'string' && clean(v).trim() !== '')
  return out.length ? out : undefined
}

/** Map a Sanity array, dropping empty items. Undefined when nothing is left. */
function items<T>(value: unknown, map: (item: Doc, index: number) => T | null | undefined): T[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out = value
    .map((item, i) => (item && typeof item === 'object' ? map(item as Doc, i) : null))
    .filter((x): x is T => x !== null && x !== undefined)
  return out.length ? out : undefined
}

function practice(value: unknown, fallback: LabColorKey): LabColorKey {
  const v = clean(value)
  return PRACTICES.includes(v as LabColorKey) ? (v as LabColorKey) : fallback
}

export function slug(text: string): string {
  return clean(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function telHref(phone: string, fallback: string): string {
  const digits = clean(phone).replace(/\D/g, '')
  if (digits.length < 7) return fallback
  return `tel:+${digits.length === 10 ? '1' + digits : digits}`
}

// The return casts keep the exact types components were written against; the
// shapes are built to match them field for field.

export function withContact<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.contactDetails
  if (!d) return def
  const phone = str(d.phone, def.phone)
  const email = plain(d.email, def.email)
  return {
    ...def,
    invitationLead: str(d.footerHeadlineLead, def.invitationLead),
    invitationRest: str(d.footerHeadlineRest, def.invitationRest),
    phone,
    phoneHref: clean(phone) === def.phone ? def.phoneHref : telHref(phone, def.phoneHref),
    email: str(d.email, def.email),
    emailHref: `mailto:${email}`,
    academyUrl: plain(d.academyUrl, def.academyUrl),
    linkedinUrl: plain(d.linkedinUrl, def.linkedinUrl),
    youtubeUrl: plain(d.youtubeUrl, def.youtubeUrl),
  }
}

export function withReachStatement(def: string, docs: Docs = snapshotDocs): string {
  return str(docs.trustStrip?.reachStatement, def)
}

export function withRecognitionMarks<T extends { label: string; full: string }>(
  def: T[],
  docs: Docs = snapshotDocs,
): T[] {
  return (items(docs.trustStrip?.recognitionMarks, (m) =>
    optStr(m.label) ? { label: m.label, full: plain(m.fullName, clean(m.label)) } : null,
  ) ?? def) as T[]
}

export function withAbout<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.aboutSection
  if (!d) return def
  const introStatement = str(d.statement, def.introStatement)
  const introBody = str(d.body, def.introBody)
  return {
    ...def,
    eyebrow: str(d.eyebrow, def.eyebrow),
    // The full intro is always the two halves joined, so they can't drift.
    intro: `${introStatement} ${introBody}`,
    introStatement,
    introBody,
    introLabel: str(d.label, def.introLabel),
    introCta: str(d.ctaLabel, def.introCta),
    capabilities:
      items(d.capabilities, (c) =>
        optStr(c.label) ? { label: c.label, color: practice(c.practice, 'vision') } : null,
      ) ?? def.capabilities,
    stats:
      items(d.stats, (s) => {
        if (!optStr(s.value)) return null
        const places = strings(s.places)
        return {
          value: s.value,
          ...(typeof s.suffix === 'string' && clean(s.suffix) !== '' ? { suffix: s.suffix } : {}),
          ...(optStr(s.label) ? { label: s.label } : {}),
          ...(places ? { places } : {}),
        }
      }) ?? def.stats,
  }
}

export function withProgramBanner<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.programBanner
  if (!d) return def
  return {
    ...def,
    program: str(d.program, def.program),
    message: str(d.message, def.message),
    ctaLabel: str(d.ctaLabel, def.ctaLabel),
    href: plain(d.url, def.href),
  }
}

export function withLabs<T extends { id: string; subservices: string[] }>(def: T[], docs: Docs = snapshotDocs): T[] {
  return (items(docs.practicesSection?.practices, (p) => {
    const base = def.find((l) => l.id === clean(p.practice))
    if (!base) return null
    return {
      ...base,
      name: str(p.name, (base as Doc).name),
      mode: str(p.mode, (base as Doc).mode),
      description: str(p.description, (base as Doc).description),
      subservices: strings(p.services) ?? base.subservices,
    }
  }) ?? def) as T[]
}

export function withFitSituations<T extends { id: string }>(def: T[], docs: Docs = snapshotDocs): T[] {
  return (items(docs.audienceSection?.cards, (c) => {
    const base = def.find((f) => f.id === clean(c.cardId)) as Doc | undefined
    if (!base) return null
    return {
      ...base,
      lead: str(c.lead, base.lead),
      title: str(c.heading, base.title),
      description: str(c.description, base.description),
    }
  }) ?? def) as T[]
}

export function withHowItWorks<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.processSection
  if (!d) return def
  return { ...def, label: str(d.label, def.label), description: str(d.description, def.description) }
}

export function withSteps<T extends { color: LabColorKey }>(def: T[], docs: Docs = snapshotDocs): T[] {
  return (items(docs.processSection?.steps, (s, i) =>
    optStr(s.heading)
      ? {
          n: i + 1,
          title: s.heading,
          description: str(s.description, ''),
          color: def[i]?.color ?? PRACTICES[i % PRACTICES.length],
        }
      : null,
  ) ?? def) as unknown as T[]
}

export function withComparison<T>(def: T[], docs: Docs = snapshotDocs): T[] {
  return (items(docs.comparisonSection?.rows, (r) =>
    optStr(r.dimension)
      ? { dimension: r.dimension, typical: str(r.typical, ''), bianomics: str(r.bianomics, '') }
      : null,
  ) ?? def) as T[]
}

export function withFounder<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.founderSection
  if (!d) return def
  return {
    ...def,
    name: str(d.name, def.name),
    role: str(d.role, def.role),
    promise: str(d.promise, def.promise),
    note: strings(d.note) ?? def.note,
  }
}

function person(m: Doc) {
  if (!optStr(m.name)) return null
  const photo = optPlain(m.photo)
  const bio = strings(m.bio)
  const linkedinUrl = optPlain(m.linkedinUrl)
  return {
    id: slug(photo ?? m.name),
    name: m.name,
    role: str(m.role, ''),
    ...(photo ? { photo } : {}),
    ...(bio ? { bio } : {}),
    ...(linkedinUrl ? { linkedinUrl } : {}),
  }
}

export function withTeam<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.teamSection
  if (!d) return def
  return {
    ...def,
    eyebrow: str(d.eyebrow, def.eyebrow),
    heading: str(d.heading, def.heading),
    members: items(d.members, person) ?? def.members,
    collaboratorsHeading: str(d.collaboratorsHeading, def.collaboratorsHeading),
    collaborators: items(d.collaborators, person) ?? def.collaborators,
  }
}

export function withOpportunityLab<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.opportunityLabSection
  if (!d) return def
  return {
    ...def,
    name: str(d.name, def.name),
    description: str(d.description, def.description),
    eyebrow: str(d.eyebrow, def.eyebrow),
    heading: str(d.heading, def.heading),
    ethos: {
      ...def.ethos,
      statement: str(d.statement, def.ethos.statement),
      footText: str(d.footText, def.ethos.footText),
      ctaLabel: str(d.ctaLabel, def.ethos.ctaLabel),
    },
  }
}

export function withFaqIntro<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.faqSection
  if (!d) return def
  return {
    ...def,
    eyebrow: str(d.eyebrow, def.eyebrow),
    heading: str(d.heading, def.heading),
    description: str(d.description, def.description),
    support: { ...def.support, ctaLabel: str(d.contactCtaLabel, def.support.ctaLabel) },
  }
}

function qa<T extends { id: string; question: string }>(value: unknown, def: T[]) {
  return items(value, (q) =>
    optStr(q.question)
      ? {
          id: def.find((d) => d.question === clean(q.question))?.id ?? slug(q.question),
          question: q.question,
          answer: str(q.answer, ''),
        }
      : null,
  )
}

export function withFaqItems<T extends { id: string; question: string }>(def: T[], docs: Docs = snapshotDocs): T[] {
  return (qa(docs.faqSection?.items, def) ?? def) as T[]
}

export function withResults<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.resultsSection
  if (!d) return def
  const caseStudies = items(d.caseStudies, (c) => {
    if (!optStr(c.client)) return null
    const image = optPlain(c.image)
    const color = practice(c.practice, 'vision')
    const secondary = optPlain(c.secondaryPractice)
    return {
      id: slug(image ?? c.client),
      client: c.client,
      category: str(c.category, ''),
      title: str(c.heading, ''),
      summary: str(c.summary, ''),
      intro: str(c.intro, ''),
      ...(image ? { texture: image } : {}),
      color,
      ...(secondary && secondary !== color ? { colorSecondary: practice(secondary, color) } : {}),
      services: strings(c.services) ?? [],
    }
  })
  const testimonials = Array.isArray(d.testimonials)
    ? (items(d.testimonials, (t, i) =>
        optStr(t.quote)
          ? {
              id: slug(`${plain(t.attribution, 'testimonial')}-${i + 1}`),
              quote: t.quote,
              attribution: str(t.attribution, ''),
              ...(optStr(t.role) ? { role: t.role } : {}),
              ...(optStr(t.org) ? { org: t.org } : {}),
              ...(optPlain(t.rating) ? { rating: optPlain(t.rating) } : {}),
            }
          : null,
      ) ?? [])
    : def.testimonials
  return { ...def, caseStudies: caseStudies ?? def.caseStudies, testimonials }
}

export function withSnapshotPage<T extends Doc>(def: T, docs: Docs = snapshotDocs): T {
  const d = docs.snapshotLandingPage
  if (!d) return def
  return {
    ...def,
    eyebrow: str(d.eyebrow, def.eyebrow),
    headingLead: str(d.headingLead, def.headingLead),
    headingRest: str(d.headingRest, def.headingRest),
    intro: str(d.intro, def.intro),
    assurances: strings(d.assurances) ?? def.assurances,
    cover: {
      ...def.cover,
      heading: str(d.coverHeading, def.cover.heading),
      intro: str(d.coverIntro, def.cover.intro),
      items:
        items(d.coverItems, (c, i) =>
          optStr(c.heading)
            ? {
                id:
                  def.cover.items.find((x: Doc) => x.title === clean(c.heading))?.id ??
                  def.cover.items[i]?.id ??
                  slug(c.heading),
                title: c.heading,
                body: str(c.body, ''),
              }
            : null,
        ) ?? def.cover.items,
    },
    faq: {
      ...def.faq,
      heading: str(d.faqHeading, def.faq.heading),
      intro: str(d.faqIntro, def.faq.intro),
      items: qa(d.faqItems, def.faq.items) ?? def.faq.items,
    },
    closing: {
      ...def.closing,
      heading: str(d.closingHeading, def.closing.heading),
      body: str(d.closingBody, def.closing.body),
    },
  }
}
