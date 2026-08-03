import type { ResultsContent } from './types'

/**
 * Results content. NOTE: these case studies are PLACEHOLDERS pending real,
 * approved client stories with hard numbers (plan open item #5). The structure
 * and layout are final; replace the client names, copy, metrics, and the
 * background textures in public/results/ with real content before launch.
 * Testimonials remain empty until approved quotes land.
 *
 * case-4 reuses the case-1 texture — there are only three images in
 * public/results/. Add a fourth before launch.
 */
export const results: ResultsContent = {
  caseStudies: [
    {
      id: 'case-1',
      client: 'Borderplex Alliance',
      category: 'Brand & Launch',
      title: 'A regional brand that finally matched the ambition',
      summary: 'Rebuilt the story, then filled the room.',
      intro:
        'We rebuilt the story and the identity, then carried it through a launch event that filled the room.',
      texture: 'case-1',
      color: 'vision',
      metrics: [
        { value: '3x', label: 'Increase in qualified inbound' },
        { value: '6 states', label: 'Reach after the relaunch' },
      ],
      services: ['Brand strategy', 'Visual identity', 'Public relations', 'Launch event'],
    },
    {
      id: 'case-2',
      client: 'Sun City Summit',
      category: 'Event & Press',
      title: 'A flagship conference people still talk about',
      summary: 'Two days, one connected push.',
      intro:
        'From concept to production, we ran the event and the press moment as one connected push.',
      texture: 'case-2',
      color: 'stage',
      metrics: [
        { value: '1,200+', label: 'Attendees across two days' },
        { value: '18', label: 'Press placements earned' },
      ],
      services: ['Event production', 'Press moments', 'Community activation', 'Creative'],
    },
    {
      id: 'case-3',
      client: 'Rio Grande Works',
      category: 'Operations',
      title: 'Operations that let a stretched team breathe',
      summary: 'Systems that outlast the engagement.',
      intro:
        'We put the systems in place, trained the people, and stayed until the work ran on its own.',
      texture: 'case-3',
      color: 'blueprint',
      metrics: [
        { value: '40%', label: 'Faster project delivery' },
        { value: '90 days', label: 'To a working system' },
      ],
      services: ['Project management', 'Operations systems', 'Team training', 'Workflow design'],
    },
    {
      id: 'case-4',
      client: 'Paso del Norte Institute',
      category: 'Team Development',
      title: 'A team that could finally tell its own story',
      summary: 'The message holds without us.',
      intro:
        'We built the internal playbook and trained the people who use it, so the message holds when we are not in the room.',
      texture: 'case-1',
      color: 'groundwork',
      metrics: [
        { value: '4 teams', label: 'Trained on the new system' },
        { value: '2x', label: 'Faster campaign turnaround' },
      ],
      services: ['Team training', 'Messaging', 'Internal comms', 'Workshops'],
    },
  ],
  /**
   * PLACEHOLDER. The quote, the attribution, and the rating are all invented
   * and must not ship. A fabricated rating is a claim about the business, so
   * this needs sign-off alongside the client permissions in the copy doc
   * before launch. The About band reads testimonials[0]; empty the array and
   * it stops rendering the rail on its own.
   */
  testimonials: [
    {
      id: 'testimonial-1',
      quote:
        'They found the thing we had been doing well by accident and turned it into something we could repeat.',
      attribution: 'Marisa Delgado',
      role: 'Executive Director',
      org: 'Borderplex Alliance',
      rating: '5.0',
    },
  ],
}
