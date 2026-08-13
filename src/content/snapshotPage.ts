/**
 * Copy for the standalone /snapshot page. Written in-house pending Bianca's
 * pass, so treat every string here as a draft rather than approved brand copy.
 * Same content-model discipline as site.ts: components read from here, never
 * hardcode.
 */

export const snapshotPage = {
  eyebrow: 'Free senior read',

  /** The page's single H1, set in two lines. */
  headingLead: 'One read.',
  headingRest: 'An honest look at where you stand.',

  intro:
    'Tell us where you are. Our senior team reads your communications and brand position and tells you what is actually working, what is not, and what we would do about it.',

  /** The three qualifiers under the headline. */
  assurances: [
    'Complimentary, with no obligation',
    'Read by our senior team, not a junior',
    'Every submission reviewed personally',
  ],

  cover: {
    heading: 'What a Snapshot gives you',
    intro:
      'Not a pitch deck with your logo on it. A straight read you can act on whether you work with us or not.',
    items: [
      {
        id: 'position',
        title: 'Where your position actually lands',
        body: 'What people take away from your brand and communications right now, against what you intended them to take away.',
      },
      {
        id: 'gaps',
        title: 'The gaps costing you the most',
        body: 'The two or three places where the work is losing you attention, credibility, or money, in the order we would fix them.',
      },
      {
        id: 'practices',
        title: 'Which practices you actually need',
        body: 'An honest read on whether this is a Vision Lab problem, a Blueprint problem, a Stage problem, or a Groundwork one. Often it is fewer than you think.',
      },
      {
        id: 'plan',
        title: 'A shape for the work',
        body: 'What a first stretch of work would cover, who from our team would do it, and roughly what it would take.',
      },
      {
        id: 'senior',
        title: 'Senior people, start to finish',
        body: 'The people who read your Snapshot are the people who would do the work. There is no handoff to a junior team after the pitch.',
      },
      {
        id: 'yours',
        title: 'Yours to keep, regardless',
        body: 'Everything in the read is yours. Use it with us, with someone else, or on your own. It is useful by design, not conditional on you signing.',
      },
    ],
  },

  faq: {
    heading: 'Before you apply',
    intro: 'The things people check before they send one in.',
    items: [
      {
        id: 'who',
        question: 'Who is a Snapshot for?',
        answer:
          'Organizations that have built something real and know it is not landing the way it should. Founders, people leaders, and operators, mostly. If you are looking for a cheap logo refresh, we are not your people.',
      },
      {
        id: 'free',
        question: 'Is it actually free? What is the catch?',
        answer:
          'It is free, and there is no catch. We take a limited number each month because every one is read personally, which is also why we ask a few questions before saying yes.',
      },
      {
        id: 'prepare',
        question: 'What should I have ready?',
        answer:
          'Nothing formal. A link to your site or socials and a straight answer about what a win looks like in the next 90 days is enough. The more candid you are, the more useful the read.',
      },
      {
        id: 'when',
        question: 'How quickly will I hear back?',
        answer:
          'Within three business days. If we are not the right fit, we will say so plainly and point you somewhere better where we can.',
      },
    ],
  },

  closing: {
    heading: 'Ready when you are',
    body: 'Send it in and our senior team will take a proper look. No retainers, no pressure, no deck with your logo pasted on the front.',
  },
} as const
