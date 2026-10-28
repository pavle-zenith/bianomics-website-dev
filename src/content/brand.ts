/**
 * Split out of site.ts so client components (the nav) can import the brand
 * name without pulling the whole content model and the Sanity snapshot into
 * the browser bundle. Still locked: this never goes through Sanity.
 */
/** Locked brand language — used verbatim, never paraphrased. */
export const brand = {
  name: 'Bianomics',
  anchor:
    "You're building something real. We align everything it needs to move.",
  /**
   * The anchor as the hero sets it, one line per beat. Split here rather than
   * in the component so the H1 and the metadata title cannot drift apart.
   */
  anchorLines: [
    "You're building something real.",
    'We align everything it needs to move.',
  ],
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
  /** The hero subhead, under the anchor. */
  clarifier:
    'Bianomics brings strategy, story, people, and operations into one coherent system, so ambitious work can earn belief, build momentum, and last.',
} as const
