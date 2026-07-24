import type { NavLink } from './types'

/**
 * Nav links. Phase-1 hrefs are in-page anchors. Links flagged
 * `phase2Only` are authored now for the Phase-2 route map but hidden
 * by `getNav()` until those pages exist (see lib/routes.ts).
 */
export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'What we do', href: '#what-we-do', hasDropdown: true },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
  // Phase 2 destinations (hidden in Phase 1):
  { label: 'The firm', href: '/firm', phase2Only: true },
  { label: 'Opportunity Lab', href: '/opportunity-lab', phase2Only: true },
]
