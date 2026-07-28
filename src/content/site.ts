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
  /** Footer headline, set in two tones: muted lead-in, then bright. */
  invitationLead: "Let's build something",
  invitationRest: 'worth talking about',
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
    id: 'founders',
    lead: 'Recognition for',
    title: 'Founders and leaders',
    description:
      'The results are there. The story has not caught up to the substance yet.',
    color: 'vision',
    photo: 'founders',
  },
  {
    id: 'people-leaders',
    lead: 'Steadier support for',
    title: 'People leaders',
    description:
      'A capable team, stretched thin. Clearer systems, not another push.',
    color: 'stage',
    photo: 'people-leaders',
  },
  {
    id: 'operators',
    lead: 'One connected system for',
    title: 'Operators',
    description:
      'A designer here, an events company there. We make the parts connect.',
    color: 'blueprint',
    photo: 'operators',
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
  // MOCK COPY — written as a stand-in to fill the layout. Replace with
  // Bianca's own words before launch (plan open item #4).
  note:
    'I started Bianomics after watching too many good organizations get handed a strategy deck and left to figure out the rest. The work that changes things is not the pitch, it is the follow-through. So we built a practice around senior people who stay on the account from the first conversation to the last deliverable.',
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
    {
      id: 'member-5',
      name: 'Elena Marquez',
      role: 'Brand Strategist',
      photo: 'member-1',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
    {
      id: 'member-6',
      name: 'Andre Salas',
      role: 'Production Lead',
      photo: 'member-2',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
    {
      id: 'member-7',
      name: 'Nadia Brooks',
      role: 'Communications Director',
      photo: 'member-3',
      linkedinUrl: 'https://www.linkedin.com/company/bianomics',
    },
    {
      id: 'member-8',
      name: 'Thomas Ellery',
      role: 'Project Manager',
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
  eyebrow: 'The nonprofit arm',
  /** Full-width, two-line section title above the split. */
  heading: 'We fund the work for organizations doing good in the world.',
  /** Dark content panel (60%): the ethos statement and the way in. */
  ethos: {
    eyebrow: 'Our ethos',
    statement:
      'Good communications should not be a luxury. Our nonprofit arm underwrites the work for organizations that could not otherwise afford it.',
    /** Who qualifies, set at the foot of the panel. */
    footEyebrow: "Who it's for",
    footText:
      'Organizations doing good that cannot otherwise afford this work. If that sounds like you, or like someone you know, tell us.',
    ctaLabel: 'Start with a Snapshot',
  },
} as const

/** FAQ section intro copy. */
export const faqIntro = {
  eyebrow: 'Questions',
  heading: 'The things people usually ask',
  description:
    'Short answers to the real hesitations. If your question is not here, the free Snapshot is the simplest way to get a straight answer.',
  /** Small support prompt under the heading, beside the accordion. */
  support: {
    heading: 'Still have questions?',
    description: 'Ask us directly and we will give you a straight answer.',
    ctaLabel: 'Get in touch',
  },
} as const

/** Snapshot section copy (locked). */
export const snapshot = {
  intro:
    'A complimentary, no-obligation read of your communications or brand position, delivered by our senior team. No pitch. No pressure.',
  submitLabel: 'Apply for a Snapshot →',
  success:
    "Every submission is reviewed personally. If you're a fit, you'll hear from us within 3 business days.",
} as const
