import type {
  AboutStat,
  ComparisonRow,
  FitSituation,
  RecognitionMark,
  Step,
} from './types'

/** Locked brand language — used verbatim, never paraphrased. */
export const brand = {
  name: 'Bianomics',
  anchor:
    'You built something real. We make the world feel it, fund it, and remember it.',
  descriptor: 'We find the reason you started, and make the world fluent in it.',
  tagline: 'Your purpose is our power source.',
  framework:
    "Everything people notice about you was decided somewhere they can't see. That's where we work.",
  method:
    "Everything people notice about you was decided somewhere they can't see. That's where we work.",
  /** Each eyebrow does a different job, so the three never repeat. */
  lockupHero: 'A HUMAN SYSTEMS COMPANY',
  lockupComparison: "HOW WE'RE BUILT",
  lockupClosing: 'YOUR PURPOSE IS OUR POWER SOURCE',
  /** Plain one-line clarifier of what the firm does (Hero). */
  clarifier:
    'Brand, events, operations, and the people doing the work, orchestrated into one ecosystem tuned to the same voice. Or one piece, done well enough to earn the standing ovation your work has been owed.',
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

/** About section — the statement, the supporting line, and two headline stats. */
export const about = {
  eyebrow: 'About us',
  intro:
    "Everything people notice about you, your brand, your team, your career, is the result of something underneath that nobody's looking at directly. We work that part. We find the pattern that's already working, build the structure around it, and make it run without you needing us. Most partners keep us anyway.",
  /**
   * The same copy, split for the two-column band: the statement is set large
   * on the left, the remainder as body copy on the right. Per the copy doc,
   * the cut falls after "We work that part."
   */
  introStatement:
    "Everything people notice about you, your brand, your team, your career, is the result of something underneath that nobody's looking at directly. We work that part.",
  introBody:
    "We find the pattern that's already working, build the structure around it, and make it run without you needing us. Most partners keep us anyway.",
  introLabel: 'What we do',
  /** Right-side CTA in the intro row. */
  introCta: 'Book a Snapshot',
  /** Closing line of the supporting copy, set as its own paragraph. */
  introClose: 'The people who scope the work are the people who build it.',
  /** The two headline numbers, shown as cards with a ghosted numeral behind. */
  stats: [
    {
      value: '6',
      suffix: ' states',
      label: 'Reach across the region and beyond',
    },
    {
      value: '4 + 1',
      label: 'Connected practices, plus a nonprofit arm',
    },
  ] satisfies AboutStat[],
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

/** How it works — section intro copy. */
export const howItWorks = {
  heading: 'From a first conversation to work people move toward.',
  description:
    'Four steps. It starts with a Snapshot and ends with senior people building alongside you.',
  /** Floating line under the subhead. Give it room to breathe. */
  floatingLine: "We get you first. That's why your audience gets you after.",
} as const

/** How it works — four plain steps, starting with the free Snapshot. */
export const steps: Step[] = [
  {
    n: 1,
    title: 'Start with a free Snapshot',
    description:
      'Tell us where you stand. Our senior team gives you a straight read on your communications or brand position. This is a read, not a pitch.',
    color: 'vision',
  },
  {
    n: 2,
    title: 'We find the story',
    description:
      'We bring what makes you worth knowing to the surface, and we agree on where you want to be by the end of this stretch of work.',
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
      'The people who scoped the work are the people who do it. We build it to run without you needing us. Most partners keep us anyway.',
    color: 'groundwork',
  },
]

/** Why we're different — typical agency vs Bianomics. */
export const comparison: ComparisonRow[] = [
  {
    dimension: 'Scope',
    typical: 'One slice: brand, or events, or training',
    bianomics:
      'Brand, events, operations, and people, orchestrated as one ecosystem',
  },
  {
    dimension: 'Who does the work',
    typical: 'Sold by seniors, delivered by juniors',
    bianomics: 'The senior team that scopes it is the team that builds it',
  },
  {
    dimension: 'Hand-off',
    typical: 'Deliver the files and move on',
    bianomics:
      'We build it to run without us, and stay on as long as you want us',
  },
  {
    dimension: 'The parts',
    typical: 'You stitch the vendors together',
    bianomics: 'Tuned to the same voice from the start',
  },
]

/** Founder. */
export const founder = {
  name: 'Bianca Cervantes',
  role: 'Founder',
  promise:
    "I'd rather take the risk that makes you unforgettable than the safe one that makes you fine. Most rooms won't tell you that. I will.",
  /**
   * The founder's note, broken into paragraphs for readability. The wording is
   * verbatim from the approved copy — only the paragraph breaks are ours.
   */
  note: [
    "I started Bianomics after watching too many good organizations get handed a strategy deck and left to figure out the rest. We coach, we support, and we build capacity inside your team, so what we make together doesn't walk out the door when we do.",
    'Our team runs lean by design, with systems and technology carrying the load that used to require six people and a retainer to match. That means more of your budget lands in the work itself, which matters most for the organizations doing real good in the world.',
    'Reach and responsible spending were never supposed to be a tradeoff.',
  ],
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
      "Good communications shouldn't be a luxury. Opportunity Lab, our nonprofit arm, closes the cost gap for organizations that couldn't otherwise take this work on.",
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
  /** Block headline above the form. */
  heading: 'A senior read of where you stand.',
  intro:
    'A complimentary read of your communications or brand position, done by our senior team. We take a limited number each month, because every one is reviewed personally and every submission comes to Bianca directly.',
  submitLabel: 'Apply for a Snapshot →',
  success:
    "Every submission is reviewed personally. If you're a fit, you'll hear from us within 3 business days.",
} as const
