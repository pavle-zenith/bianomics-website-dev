/**
 * Content accessors — the seam between the page and its content source.
 * Components import from here, never from the raw config files. In Phase 2,
 * swap each accessor body from `return <static>` to `await sanityClient.fetch(GROQ)`
 * with identical return types; every consuming component stays untouched.
 */
import { labs } from './labs'
import { faqItems } from './faq'
import { results } from './results'
import { navLinks } from './nav'
import type { FaqItem, Lab, NavLink, ResultsContent } from './types'

export function getLabs(): Lab[] {
  return labs
}

export function getFaq(): FaqItem[] {
  return faqItems
}

export function getResults(): ResultsContent {
  return results
}

/** Phase-1 nav: hide links flagged for Phase-2 routes that don't exist yet. */
export function getNav(): NavLink[] {
  return navLinks.filter((link) => !link.phase2Only)
}

export * from './site'
export type * from './types'
