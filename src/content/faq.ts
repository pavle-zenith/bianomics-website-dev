import type { FaqItem } from './types'

/**
 * FAQ — short answers to the real hesitations. The client-size answer
 * is pending final confirmation (open item #6 in the plan); the copy
 * here is a safe, plain placeholder marked for review.
 */
export const faqItems: FaqItem[] = [
  {
    id: 'one-or-all',
    question: 'Can we hire you for just one thing, or do we have to buy everything?',
    answer:
      'Either works. You can start with one practice, like brand or events, and add the others when it makes sense. Many clients begin with one piece and grow into the full system once they see how the parts connect.',
  },
  {
    id: 'client-size',
    // NOTE: final answer pending confirmation from the founder (plan open item #6).
    question: 'What size organizations do you work with?',
    answer:
      "We work with established organizations and firms that are ready to invest in doing this well. If you're weighing whether you're a fit, the Snapshot is the simplest way to find out.",
  },
  {
    id: 'location',
    question: 'Do you only work with organizations in El Paso?',
    // NOTE: the international claim is pending Bianca's confirmation before publishing.
    answer:
      "No. We're based in El Paso and our work runs across seven states and Washington D.C., and internationally. The Snapshot and much of the work happen remotely, and we travel when the project calls for it.",
  },
  {
    id: 'cost',
    question: 'How much does it cost?',
    answer:
      'It depends on what you need and how much of the system you bring in. The Snapshot is complimentary and comes with a clear read of where you stand, so you can decide with real information before any numbers come up.',
  },
]
