import type { ComparisonRow, FitSituation, RecognitionMark, Step } from './types'

/** Locked brand language — used verbatim, never paraphrased. */
export const brand = {
  name: 'Bianomics',
  anchor: "The world doesn't see what you're capable of. Yet. We change that.",
  descriptor: 'We illuminate the story. We set the trajectory.',
  tagline: 'Your purpose is our power source.',
  framework: 'Story. Visualization. Trajectory.',
  method: 'We bring the story to the surface. Then we make it move.',
  lockup: 'THE ANTI-AGENCY',
  /** Plain one-line clarifier of what the firm does (Hero). */
  clarifier:
    'Bianomics builds your brand, runs your events, tightens your operations, and develops your people as one team.',
} as const

/** Contact + external links. */
export const contact = {
  phone: '(915) 252-0712',
  phoneHref: 'tel:+19152520712',
  email: 'hello@bianomics.com',
  emailHref: 'mailto:hello@bianomics.com',
  academyUrl: 'https://academy.bianomics.com',
  linkedinUrl: 'https://www.linkedin.com/company/bianomics',
  youtubeUrl: 'https://www.youtube.com/@bianomics',
} as const

/** Trust strip — recognition marks + reach. */
export const recognitionMarks: RecognitionMark[] = [
  { label: 'TEDC', full: 'Texas Economic Development Council' },
  { label: 'IEDC', full: 'International Economic Development Council' },
  { label: 'NAWB', full: 'National Association of Workforce Boards' },
]

export const reachStatement = 'Working across six states'

/** About section — big intro + three feature boxes. */
export const about = {
  eyebrow: 'About us',
  intro:
    'One firm for brand, events, operations, and people. We close the gap between what you are capable of and what the world sees.',
  /** Right-side CTA in the intro row. */
  introCta: 'Book a Snapshot',
  /** Left card: title + CTA. */
  cta: {
    title: 'Senior people, building the whole picture with you',
    label: "Let's talk",
  },
  /** Center media card: a stat over imagery. */
  media: {
    stat: '6',
    statSuffix: ' states',
    label: 'Reach across the region and beyond',
    imageAlt: 'The Bianomics team collaborating in the studio',
  },
  /** Right image card: a stat over an abstract image. */
  figure: {
    stat: '4 + 1',
    label: 'Connected practices, plus a nonprofit arm',
    imageAlt: '',
  },
} as const

/** Who we work with — three "is this you" fit situations. */
export const fitSituations: FitSituation[] = [
  {
    id: 'underrated',
    title: 'You are doing real work that people should know about',
    description:
      'The results are there, but the outside world still sees an older, smaller version of you. The story has not caught up to the substance.',
  },
  {
    id: 'stretched-vendors',
    title: 'You are stretched across too many vendors',
    description:
      'A designer here, an events company there, a consultant for operations. Nothing connects, and you are the one holding it all together.',
  },
  {
    id: 'people-stretched',
    title: 'Your people are stretched thin',
    description:
      'The team is capable and tired. They need clearer systems and steadier support, not another tool or another push.',
  },
]

/** How it works — four plain steps, starting with the free Snapshot. */
export const steps: Step[] = [
  {
    n: 1,
    title: 'Start with a free Snapshot',
    description:
      'Tell us where you stand. Our senior team gives you a clear, honest read of your communications or brand position. No pitch.',
    color: 'vision',
  },
  {
    n: 2,
    title: 'We find the story',
    description:
      'We bring what makes you worth knowing to the surface, and agree on where you want to be in the next stretch of work.',
    color: 'stage',
  },
  {
    n: 3,
    title: 'We build the plan',
    description:
      'One connected plan across brand, events, operations, and people, sized to what you actually need right now.',
    color: 'blueprint',
  },
  {
    n: 4,
    title: 'Senior people build it with you',
    description:
      'The people who scoped the work are the people who do it. We stay until the work holds, not until the invoice clears.',
    color: 'groundwork',
  },
]

/** Why we're different — typical agency vs Bianomics. */
export const comparison: ComparisonRow[] = [
  {
    dimension: 'Scope',
    typical: 'One slice: brand, or events, or training',
    bianomics: 'Brand, events, operations, and people as one connected system',
  },
  {
    dimension: 'Who does the work',
    typical: 'Sold by seniors, delivered by juniors',
    bianomics: 'The senior team that scopes it is the team that builds it',
  },
  {
    dimension: 'Hand-off',
    typical: 'Deliver the files and move on',
    bianomics: 'We stay until the work holds',
  },
  {
    dimension: 'The parts',
    typical: 'You stitch the vendors together',
    bianomics: 'The parts are built to work together from the start',
  },
]

/** Founder. */
export const founder = {
  name: 'Bianca Cervantes',
  role: 'Founder',
  promise:
    'Clients work with senior people, not juniors handed the account. The person you meet is the person doing the work.',
  // Personal note / short clip slot — pending real content (plan open item #4).
  note: '',
} as const

/**
 * Team — senior people below the founder. NOTE: names, roles, and portraits
 * are placeholders (generated headshots) pending real team content. Replace
 * with actual team members and photos before launch.
 */
export const team = {
  eyebrow: 'Team',
  heading: 'Senior people, start to finish',
  members: [
    {
      id: 'member-1',
      name: 'Marisol Reyes',
      role: 'Creative Director',
      photo: 'member-1',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
    {
      id: 'member-2',
      name: 'Daniel Cruz',
      role: 'Head of Events',
      photo: 'member-2',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
    {
      id: 'member-3',
      name: 'Alicia Monroe',
      role: 'People & Development Lead',
      photo: 'member-3',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
    {
      id: 'member-4',
      name: 'Robert Vance',
      role: 'Operations Director',
      photo: 'member-4',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
  ],
} as const

/** Opportunity Lab — the nonprofit funding arm. */
export const opportunityLab = {
  name: 'Opportunity Lab',
  description:
    'Our nonprofit arm funds this work for organizations that are doing good in the world and could not otherwise afford it. When you work with us, you help make that possible.',
} as const

/** FAQ section intro copy. */
export const faqIntro = {
  eyebrow: 'Questions',
  heading: 'The things people usually ask',
  description:
    'Short answers to the real hesitations. If your question is not here, the free Snapshot is the simplest way to get a straight answer.',
} as const

/** Snapshot section copy (locked). */
export const snapshot = {
  intro:
    'A complimentary, no-obligation read of your communications or brand position, delivered by our senior team. No pitch. No pressure.',
  submitLabel: 'Apply for a Snapshot →',
  success:
    "Every submission is reviewed personally. If you're a fit, you'll hear from us within 3 business days.",
} as const
