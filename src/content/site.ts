import type {
  AboutCapability,
  AboutStat,
  ComparisonRow,
  FitSituation,
  RecognitionMark,
  Step,
  TeamMember,
} from './types'
import { withAbout, withComparison, withContact, withFaqIntro, withFitSituations, withFounder, withHowItWorks, withOpportunityLab, withProgramBanner, withReachStatement, withRecognitionMarks, withSteps, withTeam } from './cms'

export { brand } from './brand'

/** Contact + external links. */
export const contactDefault = {
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
export const recognitionMarksDefault: RecognitionMark[] = [
  { label: 'TEDC', full: 'Texas Economic Development Council' },
  { label: 'IEDC', full: 'International Economic Development Council' },
  { label: 'NAWB', full: 'National Association of Workforce Boards' },
]

/**
 * The footprint, per the client: Texas, New Mexico, Arizona, New York, New
 * Jersey, Georgia, Indiana, Washington D.C. That is eight places but seven
 * states — D.C. is a federal district — so the count is carried as "markets"
 * rather than "states", which would be a false claim on a public page. The
 * FAQ answer names the two categories outright.
 */
export const reachStatementDefault = 'Working across eight markets'

/** About section — the statement, the supporting line, and two headline stats. */
export const aboutDefault = {
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
  /**
   * The capability pills. Six drawn from across the four practices, each
   * coded to the practice it belongs to, so the section reads as the range of
   * the work without repeating the practices block further down.
   *
   * The order is the coherent pattern the client asked for. The grid fills
   * two across, so reading down the columns each one steps through the
   * practices in order, offset by a row: vision / stage / blueprint on the
   * left, stage / blueprint / groundwork on the right. Reorder these and the
   * cascade breaks.
   */
  capabilities: [
    { label: 'Brand & Marketing Strategy', color: 'vision' },
    { label: 'Public Relations & Crisis Management', color: 'stage' },
    { label: 'Event Architecture & Management', color: 'stage' },
    { label: 'Project Management', color: 'blueprint' },
    { label: 'Operational Blueprints', color: 'blueprint' },
    { label: 'Workforce Development', color: 'groundwork' },
  ] satisfies AboutCapability[],
  /** The two headline numbers, shown as cards with a ghosted numeral behind. */
  stats: [
    {
      value: '8',
      suffix: ' markets',
      /* Named rather than summarised. Seven states and a federal district,
         which is why the count above says markets and not states. */
      places: [
        'Texas',
        'New Mexico',
        'Arizona',
        'New York',
        'New Jersey',
        'Georgia',
        'Indiana',
        'Washington D.C.',
        'International',
      ],
    },
    {
      value: '4 + 1',
      label: 'Connected practices, plus a nonprofit arm',
    },
  ] satisfies AboutStat[],
} as const

/**
 * Who we work with — the two halves of the offer. The client's copy already
 * splits each one into a lead-in and the audience it names, which is the
 * shape these cards were built for, so it maps across unchanged.
 *
 * Each card now has its own photograph of the work it names, so the three
 * stock portraits the section opened with are gone from the repo.
 */
export const fitSituationsDefault: FitSituation[] = [
  {
    id: 'social-impact',
    lead: 'Marketing, PR, and infrastructure guidance for',
    title: 'Social impact and purpose-driven organizations',
    description:
      'The work is true. We make it undeniable, we put it on the stage it deserves, and we make sure every piece moves toward the same vision.',
    color: 'vision',
    photo: 'social-impact',
  },
  {
    id: 'workforce',
    lead: 'Workforce development for',
    title: 'Organizations and career seekers',
    description:
      'A career does not start with a job posting. It starts with being seen. We build what gets someone from ready to hired, and further.',
    color: 'groundwork',
    photo: 'career-seekers',
  },
]

/**
 * How it works — section intro copy. The long title and the "we get you
 * first" line were both cut by the client, so the margin label is now the
 * section's heading and this paragraph carries it alone.
 *
 * The client's draft read "a senior read" and "ends with senior people
 * building alongside you". It predates the instruction to take "senior" out
 * of the site, so the substitutions from that pass are applied here too.
 */
export const howItWorksDefault = {
  label: 'Our process',
  description:
    'Four steps to align it. The same people through all of them. It starts with a Snapshot, a straight read of where your story, systems, and people actually stand, and ends with that same team building alongside you.',
} as const

/** How it works — four plain steps, starting with the free Snapshot. */
export const stepsDefault: Step[] = [
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
      'With a customized Comms OS, one connected plan across brand, events, operations, and people, sized to what you actually need right now.',
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
export const comparisonDefault: ComparisonRow[] = [
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
export const founderDefault = {
  name: 'Bianca Cervantes',
  role: 'Founder',
  promise:
    "I'd rather take the calculated risk that makes you unforgettable than the safe route that keeps you floating with the average. I'll tell you what I really think, because serving the vision matters more than simply telling you what you want to hear.",
  /**
   * The founder's note, broken into paragraphs for readability. The wording is
   * verbatim from the approved copy — only the paragraph breaks are ours.
   */
  note: [
    "I started Bianomics after watching too many good organizations get handed a strategy deck and left to figure out the rest. I'd been on the client side of that dynamic enough times to recognize what was missing: transparency, shared understanding, and a partner genuinely invested in the mission. Too often, we were made to feel like another contract number. Those gaps became the foundation of Bianomics and the values we still operate by. We coach, support, and build capacity within your team, so what we create together doesn't walk out the door when we do.",
    "Our team runs lean by design, using smart systems to put more of your budget where it belongs: into the work itself. But lean doesn't mean distant. We embed ourselves as an extension of your team, the people you can call when the path shifts, the pressure hits, or the deliverables alone aren't enough. We're not here to check boxes and disappear. We're here to help carry the mission.",
  ],
} as const

/**
 * Team. Bios and headshots are the real thing, taken verbatim from
 * "Bianomics Website Team Bios-.docx" or from the client's later revisions,
 * which supersede it. Only the paragraph breaks are ours.
 *
 * `members` is the published roster, in the order the client set. The rest is
 * authored below in `teamPending` and is not rendered; move an entry up once
 * its photo is in public/team/.
 */
export const teamDefault = {
  eyebrow: 'Team',
  heading: 'Leadership, start to finish',
  /** The people who run the work, in the order the client set. */
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
      id: 'minerva',
      name: 'Minerva Saucedo',
      role: 'Groundwork Facilitator',
      photo: 'minerva',
      bio: [
        'Minerva flips the script on healing. Self-care is not the reward at the end of it. It is where it starts. She learned that the hard way, sitting with families through the toughest parts of substance abuse, and now she teaches it for a living.',
        'Licensed cosmetologist by trade, recovery coach at heart, she treats those two worlds like they were never separate to begin with. Small, repeatable acts of care beat willpower every time.',
        'Off the clock, she is laughing too hard to finish her own stories, hunting down the next great food spot, and yes, she really does own an exact replica of the Grail Diary from Indiana Jones.',
      ],
    },
    {
      id: 'greg',
      name: 'Greg Kruger',
      role: 'Nervous System Coach, US Marine veteran',
      photo: 'greg',
      bio: [
        'Greg used to think willpower was the answer. Turns out, willpower was getting way too much credit.',
        'He spent years figuring out what was actually running the show underneath all that effort and trying harder. Once he figured it out, he fixed his own patterns, then built a career helping other people fix theirs.',
        'U.S.M.C. veteran. Licensed NLP practitioner. Certified breathwork facilitator. Founder of Forgotten Truth Coaching. His rule is simple: leadership starts with self-leadership. Skip that part and everything else gets harder.',
        'Inside Beyond Duty, Greg skips the motivational speech and starts with the breath. No slogans. No trying harder. Just a shift people can actually feel.',
        'Off the clock, he is chasing waves, riding his bike, and making music. Apparently, sitting still was never really his thing.',
      ],
    },
  ],
  collaboratorsHeading: 'Creative collaborators',
  /**
   * Not staff. Consultants who work alongside the team often enough to
   * belong on the page, kept in their own group so the roster does not
   * imply they are employees.
   */
  collaborators: [
    {
      id: 'kandolite',
      name: 'Kandolite Carson',
      role: 'Executive Producer',
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
      id: 'celisse',
      name: 'Celisse Villagrana',
      role: 'Brand Consultant & Creative Director',
      photo: 'celisse',
      bio: [
        'Celisse gives brands a pulse. 15+ years across creative agencies, architecture and development, and her own consulting practice, and she still treats every project like the first one. Branding, advertising, visual systems, creative direction. She runs the full range and makes it look easy.',
        'She translates strategy into something people actually feel. Print, digital, environmental, marketing, she keeps the story consistent wherever it shows up.',
        'Campaigns, production, stakeholders, deadlines, she holds the whole thing together without losing the thread from first concept to final execution. Fluent in English and Spanish, she has zero patience for a brand with no personality.',
        'Off the clock, she is on the dance floor, sketchbook in hand, chasing her next stamp in her passport. Moksha the dog and Micho the cat hold down the fort while she is out being a visionary in real time.',
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
      id: 'talha',
      name: 'Talha Zunair',
      role: 'Lead Graphic Designer',
      photo: 'talha',
      bio: [
        'Talha turns a rough idea or a wall of text into something people actually stop and look at. Deck, brand asset, print piece, doesn\'t matter, he finds the version that holds attention every time.',
        "One rule runs everything he makes. Clarity over decoration. If it doesn't support the message, it doesn't make the cut.",
        "He is always one tool ahead of everyone else, chasing the next thing before it's cool, powered by a coffee habit that could sponsor its own brand.",
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
] satisfies TeamMember[]

/** Opportunity Lab — the nonprofit funding arm. */
export const opportunityLabDefault = {
  name: 'Opportunity Lab',
  description:
    'Our nonprofit arm funds this work for organizations that are doing good in the world and could not otherwise afford it. When you work with us, you help make that possible.',
  eyebrow: 'The nonprofit arm',
  /** Full-width, two-line section title above the split. */
  heading: 'We fund the work for organizations doing good in the world.',
  /** Content panel: the ethos statement and the way in. */
  ethos: {
    statement:
      "Good communications shouldn't be a luxury. Opportunity Lab, our nonprofit arm, closes the cost gap for organizations that couldn't otherwise take this work on.",
    /** Who qualifies, set at the foot of the panel. */
    footText:
      'Organizations doing good that cannot otherwise afford this work. If that sounds like you, or like someone you know, tell us.',
    ctaLabel: 'Start with a Snapshot',
  },
} as const

/**
 * The cohort strip under the hero. Time-bound: when the cohort closes this
 * comes off the page rather than going stale, so it is authored as one block
 * that can be removed in a single edit.
 */
export const programBannerDefault = {
  program: 'Beyond Duty',
  message: 'Veteran workforce readiness cohort starts September 1.',
  ctaLabel: 'Apply Now',
  /** Off-site application form. */
  href: 'https://wkf.ms/4uPVAgU',
} as const

/** FAQ section intro copy. */
export const faqIntroDefault = {
  eyebrow: 'Questions',
  heading: 'The things people usually ask',
  description:
    'Short answers to the real hesitations. If your question is not here, the free Snapshot is the simplest way to get a straight answer.',
  /** The one action beside the accordion. The prompt that used to introduce
      it was cut: the heading above already asks the question it answered. */
  support: {
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

// ---------------------------------------------------------------------------
// What the site renders: the literals above are only the fallback. The copy
// itself is edited in Sanity (https://bianomics.sanity.studio) and laid over
// them at build time, see cms.ts. Editing a string above changes nothing
// while Sanity has a value for it.
export const contact = withContact(contactDefault)
export const recognitionMarks = withRecognitionMarks(recognitionMarksDefault)
export const reachStatement = withReachStatement(reachStatementDefault)
export const about = withAbout(aboutDefault)
export const fitSituations = withFitSituations(fitSituationsDefault)
export const howItWorks = withHowItWorks(howItWorksDefault)
export const steps = withSteps(stepsDefault)
export const comparison = withComparison(comparisonDefault)
export const founder = withFounder(founderDefault)
export const team = withTeam(teamDefault)
export const opportunityLab = withOpportunityLab(opportunityLabDefault)
export const programBanner = withProgramBanner(programBannerDefault)
export const faqIntro = withFaqIntro(faqIntroDefault)
