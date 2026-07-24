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
} as const

/** Phase-2 routes (not yet built). */
export const routes = {
  home: '/',
  firm: '/firm',
  work: '/work',
  workLab: (labId: string) => `/work/${labId}`,
  opportunityLab: '/opportunity-lab',
  results: '/results',
  contact: '/contact',
} as const
