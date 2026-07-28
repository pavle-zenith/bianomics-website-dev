import type { ResultsContent } from './types'

/**
 * Results content. NOTE: these case studies are PLACEHOLDERS pending real,
 * approved client stories with hard numbers (plan open item #5). The structure
 * and layout are final; replace the client names, copy, metrics, and the
 * background textures in public/results/ with real content before launch.
 * Testimonials remain empty until approved quotes land.
 */
export const results: ResultsContent = {
  caseStudies: [
    {
      id: 'case-1',
      client: 'Borderplex Alliance',
      title: 'A regional brand that finally matched the ambition',
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
      title: 'A flagship conference people still talk about',
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
      title: 'Operations that let a stretched team breathe',
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
  ],
  testimonials: [],
}
