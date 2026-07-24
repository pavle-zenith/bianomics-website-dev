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
}

export interface CaseStudyMetric {
  /** The hard number, e.g. "3x" or "+42%". */
  value: string
  /** What it measures, e.g. "increase in qualified leads". */
  label: string
}

export interface CaseStudy {
  id: string
  /** Client name (shown as the logo/wordmark top-left of the left panel). */
  client: string
  /** Headline for the case study (bottom-left of the left panel). */
  title: string
  /** Short intro under the title. */
  intro: string
  /** Background texture image key, resolved to public/results/<texture>.png. */
  texture: string
  /** Which of the four services drives the right panel color. */
  color: LabColorKey
  /** Result stats listed on the right panel. */
  metrics: CaseStudyMetric[]
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
  /** Shows a dropdown caret (visual only in Phase 1). */
  hasDropdown?: boolean
}

export interface FitSituation {
  id: string
  title: string
  description: string
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
  /** Image key resolved to a portrait in public/team/. */
  photo: string
  linkedinUrl?: string
}
