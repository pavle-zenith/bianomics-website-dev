import type { Lab } from './types'

/**
 * The four service labs, as one connected system. Descriptions are in
 * plain owner language per the "approach simply" principle. Color keys
 * map each lab to its brand color (see tokens/semantic.css). Subservices
 * render as pills within each lab's card.
 */
export const labs: Lab[] = [
  {
    id: 'vision',
    name: 'Vision Lab',
    mode: 'Express',
    description:
      'Brand, marketing, and PR. Story, campaigns, press, and creative that show people what you are.',
    color: 'vision',
    subservices: [
      'Brand strategy',
      'Visual identity',
      'Campaigns',
      'Public relations',
      'Content & creative',
      'Web & social',
    ],
    href: '#what-we-do',
  },
  {
    id: 'stage',
    name: 'Stage',
    mode: 'Resonate',
    description:
      'Events and activations. Conferences, launches, press moments, and community that people remember.',
    color: 'stage',
    subservices: [
      'Conferences',
      'Product launches',
      'Press moments',
      'Community events',
      'Activations',
      'Production',
    ],
    href: '#what-we-do',
  },
  {
    id: 'blueprint',
    name: 'Blueprint™',
    mode: 'Structure',
    description:
      'Operations and project management. The systems that make the work run on time.',
    color: 'blueprint',
    subservices: [
      'Project management',
      'Operations systems',
      'Workflow design',
      'Vendor coordination',
      'Timelines & delivery',
    ],
    href: '#what-we-do',
  },
  {
    id: 'groundwork',
    name: 'Groundwork™',
    mode: 'Regulate',
    description:
      'Team development. Training, communication, and wellbeing so your people can do their best work.',
    color: 'groundwork',
    subservices: [
      'Team training',
      'Communication',
      'Leadership development',
      'Wellbeing',
      'Workforce curriculum',
    ],
    href: '#what-we-do',
  },
]
