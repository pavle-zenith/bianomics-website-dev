/**
 * Content model types. These are the authority for every editable
 * piece of the landing page. Components read content through the
 * accessors in `content/index.ts` (never by importing config files
 * directly), so Phase 2 can swap the accessor bodies to Sanity GROQ
 * with identical return types and zero component changes.
 */

/** The four service labs. Opportunity Lab is the nonprofit arm and is NOT a lab. */
export type LabId = 'vision' | 'stage' | 'blueprint' | 'groundwork'

/** CSS custom-property base name for a lab's coded color (see semantic.css). */
export type LabColorKey = 'vision' | 'stage' | 'blueprint' | 'groundwork'

export interface Lab {
  id: LabId
  /** Display name, includes any trademark mark, e.g. "Blueprint™". */
  name: string
  /** One-word mode from the brandbook, e.g. "Express". */
  mode: string
  /** Plain, owner-language description. */
  description: string
  /** Semantic color key → resolves to var(--lab-<key>-fill / -text). */
  color: LabColorKey
  /** Sub-services within this lab, shown as pills. */
  subservices: string[]
  /** Phase-1: in-page anchor; Phase-2: real route like /work/vision. */
  href: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  quote: string
  attribution: string
  role?: string
  org?: string
  /** Star rating as authored, e.g. "5.0". Omit to hide the stars entirely. */
  rating?: string
}

/**
 * One capability pill in the About section. Which capabilities get surfaced
 * here is an editorial call rather than something derivable from `labs`, so
 * they are authored, but each carries the practice it belongs to and takes
 * that practice's colour.
 */
export interface AboutCapability {
  label: string
  color: LabColorKey
}

/** A single headline number in the About band. */
export interface AboutStat {
  /** The number itself, e.g. "6" or "4 + 1". */
  value: string
  /** Unit set small beside the value, e.g. " states". */
  suffix?: string
  /** What it measures. */
  label: string
}

export interface CaseStudy {
  id: string
  /** Client name, set above the category. */
  client: string
  /** Engagement type, set small under the client. */
  category: string
  /** Headline for the engagement. */
  title: string
  /** One line under the title, carrying the point of the work. */
  summary: string
  /** Short paragraph under the summary. */
  intro: string
  /**
   * Image key, resolved to public/results/<texture>.webp by the map in
   * Results.tsx. Absent while the image is outstanding, which draws a lettered
   * frame instead. Never point it at another engagement's image.
   */
  texture?: string
  /** Which of the four practices drives the coded accent. */
  color: LabColorKey
  /** Services provided on this engagement. */
  services: string[]
}

/** Results content is pending pre-launch — both arrays may be empty. */
export interface ResultsContent {
  caseStudies: CaseStudy[]
  testimonials: Testimonial[]
}

export interface NavLink {
  label: string
  /** Phase-1 anchor (e.g. "#what-we-do") or Phase-2 route. */
  href: string
  /** Hidden in Phase 1; authored now for the Phase-2 route map. */
  phase2Only?: boolean
}

export interface FitSituation {
  id: string
  /** Small lead-in line above the role, e.g. "Recognition for". */
  lead: string
  title: string
  description: string
  /** Which coded accent the card carries. */
  color: LabColorKey
  /** Photo key, resolved to public/serve/<photo>.webp. */
  photo: 'founders' | 'people-leaders' | 'operators'
}

export interface Step {
  /** 1-indexed step number for display. */
  n: number
  title: string
  description: string
  /** Coded gradient color for the step card. */
  color: LabColorKey
}

export interface ComparisonRow {
  dimension: string
  typical: string
  bianomics: string
}

export interface RecognitionMark {
  /** Short label / acronym, e.g. "TEDC". */
  label: string
  /** Full name for the accessible title/aria. */
  full: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  /**
   * Image key resolved to a portrait in public/team/. Absent while a headshot
   * is outstanding, which draws a lettered tile in the frame instead. Never
   * fall back to another member's photo: that puts the wrong face under a
   * name.
   */
  photo?: string
  /**
   * Full bio, one string per paragraph. Shown in the detail panel. Absent
   * means there is nothing to open, so the card renders inert.
   */
  bio?: readonly string[]
  linkedinUrl?: string
}
