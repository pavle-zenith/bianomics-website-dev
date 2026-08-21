/**
 * Centralized route map. Phase 1 is a single page whose sections are
 * addressed by anchor. The Phase-2 map is recorded here so the growth
 * path is explicit: flip nav/lab hrefs from `anchors.*` to `routes.*`
 * when those pages ship.
 */

/** Phase-1 in-page anchors (must match section ids in the components). */
export const anchors = {
  hero: '#hero',
  whoWeWorkWith: '#who-we-work-with',
  whatWeDo: '#what-we-do',
  howItWorks: '#how-it-works',
  whyDifferent: '#why-different',
  results: '#results',
  snapshot: '#snapshot',
  founder: '#founder',
  opportunityLab: '#opportunity-lab',
  faq: '#faq',
  /* The /snapshot page's own form. Its closing CTA used to point at
     `/snapshot#top`, and no element with id="top" exists anywhere in the
     codebase — it resolved only through the HTML spec's undocumented `#top`
     fallback. */
  snapshotForm: '#snapshot-form',
} as const

/** Real routes. Everything below `snapshot` is Phase-2 and not yet built. */
export const routes = {
  snapshot: '/snapshot',
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  firm: '/firm',
  work: '/work',
  workLab: (labId: string) => `/work/${labId}`,
  opportunityLab: '/opportunity-lab',
  results: '/results',
  contact: '/contact',
} as const

/**
 * Where the chrome's Snapshot CTA should point from the page it is rendered on.
 * The nav and footer render on every route, so a single href was wrong twice:
 * on the landing page it navigated away from a form already on the page, and
 * on /snapshot it was a self-link that reloaded the page and left the form
 * unfocused.
 */
export function snapshotCtaHref(pathname: string | null): string {
  if (pathname === routes.snapshot) return anchors.snapshotForm
  if (pathname === routes.home) return anchors.snapshot
  return routes.snapshot
}
