import type {
  AboutCapability,
  AboutStat,
  ComparisonRow,
  FitSituation,
  RecognitionMark,
  Step,
  TeamMember,
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
  /**
   * The capability pills. Six drawn from across the four practices, each
   * coded to the practice it belongs to, so the section reads as the range of
   * the work without repeating the practices block further down.
   */
  capabilities: [
    { label: 'Brand strategy', color: 'vision' },
    { label: 'Public relations', color: 'vision' },
    { label: 'Conferences and launches', color: 'stage' },
    { label: 'Project management', color: 'blueprint' },
    { label: 'Operations systems', color: 'blueprint' },
    { label: 'Workforce development', color: 'groundwork' },
  ] satisfies AboutCapability[],
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
    'Four steps. It starts with a Snapshot and ends with one team building it with you.',
  /** Floating line under the subhead. Give it room to breathe. */
  floatingLine: "We get you first. That's why your audience gets you after.",
} as const

/** How it works — four plain steps, starting with the free Snapshot. */
export const steps: Step[] = [
  {
    n: 1,
    title: 'Start with a free Snapshot',
    description:
      'Tell us where you stand. A straight read on your communications or brand position. No spin.',
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
    title: 'One team, all the way through',
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
    typical: 'One team sells it. Another team builds it.',
    bianomics: 'The team that scopes it builds it.',
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
 * Team. Bios and headshots are the real thing, taken verbatim from
 * "Bianomics Website Team Bios-.docx". Only the paragraph breaks are ours.
 *
 * `members` carries the seven people whose headshots have landed. The rest of
 * the roster is authored below in `teamPending` and is not rendered; move an
 * entry up once its photo is in public/team/.
 */
export const team = {
  eyebrow: 'Team',
  heading: 'Leadership, start to finish',
  members: [
    {
      id: 'bianca',
      name: 'Bianca Cervantes',
      role: 'CEO',
      photo: 'bianca',
      bio: [
        'Bianca did not want to build another agency. She wanted to build the thing that fixes what agencies get wrong. Bianomics is that answer. An embedded team that stays until you no longer need us.',
        'She thinks in nervous systems, paying attention to what is actually driving behavior, not just what is on the surface. She never sits still on an idea either. The moment one lands, she is already three ideas past it, looking for the version that is bigger and better.',
        'Off the clock, she is always moving. Golf, gym, yoga, running. She will stop for live music, blues to house to EDM, and she will always stop for a dog.',
        'Her favorite title is not CEO. It is Mom, to her daughter Ava. That one runs the show.',
      ],
    },
    {
      id: 'hamna',
      name: 'Hamna Arif',
      role: 'Chief of Staff',
      photo: 'hamna',
      bio: [
        'Hamna is the reason nothing falls through the cracks. Timelines, deliverables, a dozen moving pieces, she keeps it all on track and keeps the team one step ahead of the deadline.',
        'She does not just manage the chaos, she quietly fixes what causes it. She spots the clunky process before anyone else does and smooths it out so the rest of the team can move faster.',
        'Off the clock, she is chasing sunsets, good food, and good tea. Music is always on. Cats over most humans, no argument there.',
      ],
    },
    {
      id: 'desiree',
      name: 'Desiree Delgado',
      role: 'Chief Growth Officer',
      photo: 'desiree',
      bio: [
        'Dez does not wait for growth to happen. She goes out and builds it, one real connection at a time.',
        "Years in hospitality taught her how to read a room fast and turn a first conversation into a relationship worth keeping. Now she runs that same instinct at scale, across an entire region's pipeline.",
        'Across the Southwest region, she is the outreach, the pipeline, the relationships that turn into retainers.',
        'Her fuel source is simple. 5am circuit workouts and an Alani in hand to start the day, a country karaoke session she never turns down, and a new food spot always worth trying. Koko, her 20 pound Frenchie, runs the household like she pays the rent. Order everywhere, even off the clock.',
      ],
    },
    {
      id: 'milan',
      name: 'Milan Petojevic',
      role: 'Chief Operating Officer',
      photo: 'milan',
      bio: [
        "Milan catches Bianca's ideas at a hundred miles an hour and turns them into a system that makes Bianomics flow. Nobody else in the building can do that quite like him.",
        'He is built for chaos. Genuinely loves untangling it, which is exactly how he ended up the systems guy. Night owl. Obsessive researcher. Real estate nerd. Lifelong dog person. Ask him one innocent question and he will vanish for three hours and reappear with a full analysis and a spreadsheet nobody asked for. That is just how his brain runs.',
        'He works best quietly, in the background, solving problems before anyone even knows they exist. Usually with his dog, Lea, right by his side.',
      ],
    },
    {
      id: 'kandolite',
      name: 'Kandolite Carson',
      role: 'Strategic Communications',
      photo: 'kandolite',
      bio: [
        'By day she is the Queen of the In-Between. By every other hour she is an ultimate boy mom. For 18 plus years, she has built brands, told stories, and turned bold ideas into real ones across journalism, PR, media, marketing, nonprofit leadership, and creative strategy.',
        'She is professionally curious in the best way, the kind who asks one question and somehow connects five dots nobody saw coming. A crazy idea walks in, proof it should have happened sooner walks out.',
        'Off the clock, she is training for her first triathlon, chasing two boys and a firefighter husband, and will still defend the 90s as the greatest decade pop culture ever had. Burned CDs from Limewire, included and unashamed.',
      ],
    },
    {
      id: 'vanessa',
      name: 'Vanessa Tena',
      role: 'Public Affairs & Crisis Strategist',
      photo: 'vanessa',
      bio: [
        "Nobody warns you about Vanessa. She shows up looking like a pageant queen and leaves the room wondering how she just ran policy, built a tech solution, and had everyone laughing, all before lunch. Bianomics' actual secret weapon.",
        'Marketing, advertising, public affairs, government leadership, tech, she has worn every one of those hats and made each look like it was made for her, Telly Award and Mrs. Texas Earth crown included.',
        'She is also a passionate advocate for kids born with hearing loss, using her own journey to help the next generation own their story and lead with confidence.',
        'Off the clock, she is mom first, karaoke queen second, poodle mom always, Doritos never far away. Give her five minutes and she will leave you laughing and a little obsessed.',
      ],
    },
    {
      id: 'chris',
      name: 'Chris Lechuga',
      role: 'Public Relations & Communications Lead',
      photo: 'chris',
      bio: [
        'Chris has spent 15 years helping schools, nonprofits, and coalitions tell the truth about their work in ways people actually listen to. El Paso native, national public affairs consultant, and a rockstar with PR who has the receipts, stories in The New York Times, CNBC, and CBS News, leaders coached through congressional testimony.',
        'He has stood at the podium as a school district PIO on the worst day of the school year, and he has never lost the instinct that came from it. A good pitch works like a good riff, hook first, no filler. He chases impact, not headlines, not column inches.',
        'He brings a rock and roll mindset to a suit-and-tie industry, and it shows. Clarity over noise, every single time.',
      ],
    },
    {
      id: 'pavle',
      name: 'Pavle Maodus',
      role: 'Web Development & Automations',
      photo: 'pavle',
      bio: [
        "Pavle's first computer session was at age 3, back in 2007. Nearly two decades later, he is a master of web design, moving fast across sites, automations, and SEO through his own studio, fast enough that clients keep forgetting he is only 22.",
        "Four languages, three modes: zen, focus, deal-closer, whichever the moment calls for. He also helps run his family's alcohol distilling business on the side, because clearly one job was never going to be enough for him.",
        'House music never turns off, and neither does his love for cinematography, history, and proper European pub culture with friends once the weekend hits. Work hard, play hard is not a slogan for him, it is the whole operating system.',
      ],
    },
  ],
} as const

/**
 * Authored and waiting on headshots. Drop an entry into `team.members` and add
 * its photo to public/team/ (plus the import map in Team.tsx) to publish it.
 */
export const teamPending = [
  {
    id: 'leila',
    name: 'Leila Azzam',
    role: 'Video Editor & AI Specialist',
    photo: 'leila',
    bio: [
      "Leila's origin story starts in electrical engineering. Somewhere along the way, creativity won the fight, and she never looked back.",
      'Now she moves between video editing, 3D in Blender, and building AI automations like it is all one language. Learn how it works, master it fast, repeat. That instinct even took her across the MENA region training teams at Aramco and ADNOC on how to actually use AI, not just talk about it at a conference.',
      'Off the clock, she is chasing 10k steps, a good book, or 18 holes. Coffee is non negotiable. She treats life like one long experiment and documents the whole thing, one photo at a time.',
    ],
  },
  {
    id: 'greg',
    name: 'Greg Kruger',
    role: 'Instructor, Forgotten Truth Coaching',
    photo: 'greg',
    bio: [
      'Greg spent years untangling the patterns he inherited before he ever taught anyone else how to do it.',
      'He is a U.S.M.C. veteran, a licensed NLP practitioner, and a certified breathwork facilitator. Inside Beyond Duty, he teaches breathwork as a tool, not a trend. As he puts it, this is not motivation that fades by Monday morning. It is a physiological shift your audience feels in the room.',
      'He does not sell willpower. He teaches practical, repeatable change, the kind that actually holds.',
    ],
  },
  {
    id: 'nova',
    name: 'Nova Rizki Ananda',
    role: 'Creative Design Lead',
    photo: 'nova',
    bio: [
      "Nova is Bianomics' secret weapon. Give her a rough idea and she will hand you back a brand system that actually holds together, branding, decks, print, digital, all of it clean, all of it hers.",
      'She has an eye that catches the one detail everyone else missed, and she never turns it off. Every deck, every layout, every brand asset gets that same level of attention.',
      'Off the clock, she is at the piano, in a book, or chasing down a new café. Same eye for detail, just pointed at the rest of life.',
    ],
  },
  {
    id: 'minerva',
    name: 'Minerva',
    role: 'Recovery & Self-Care Instructor',
    photo: 'minerva',
    bio: [
      'Minerva flips the script on healing. Self-care is not the reward at the end of it. It is where it starts. She learned that the hard way, sitting with families through the toughest parts of substance abuse, and now she teaches it for a living.',
      'Licensed cosmetologist by trade, recovery coach at heart, she treats those two worlds like they were never separate to begin with. Small, repeatable acts of care beat willpower every time.',
      'Off the clock, she is laughing too hard to finish her own stories, hunting down the next great food spot, and yes, she really does own an exact replica of the Grail Diary from Indiana Jones.',
    ],
  },
  {
    id: 'talha',
    name: 'Talha',
    role: 'Lead Graphic Designer',
    photo: 'talha',
    bio: [
      'Talha turns a rough idea or a wall of text into something people actually stop and look at. Deck, brand asset, print piece, doesn\'t matter, he finds the version that holds attention every time.',
      "One rule runs everything he makes. Clarity over decoration. If it doesn't support the message, it doesn't make the cut.",
      "He is always one tool ahead of everyone else, chasing the next thing before it's cool, powered by a coffee habit that could sponsor its own brand.",
    ],
  },
] satisfies TeamMember[]

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
  heading: 'Where you stand, no spin.',
  intro:
    "A complimentary read of your communications or brand position, done by the team you'll actually work with. We take a limited number each month, because every one is reviewed personally and every submission comes to Bianca directly.",
  submitLabel: 'Apply for a Snapshot →',
  success:
    "Every submission is reviewed personally. If you're a fit, you'll hear from us within 3 business days.",
} as const
