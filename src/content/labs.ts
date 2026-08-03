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
    // NOTE: ™ is applied to all four practices for now. Bianca is confirming
    // which of them should actually carry it (Section 3 of the copy doc).
    name: 'Vision Lab™',
    mode: 'Express',
    description:
      "The story underneath, brought to the surface and aimed at the people who need to hear it. Brand, campaigns, press, and creative built on what's true about you, then sharpened until it performs.",
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
    name: 'Stage™',
    mode: 'Resonate',
    description:
      'The room where it lands. Conferences, launches, press moments, and community events people are still talking about on Monday.',
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
      'The systems underneath the work. Project management, workflow, and operations built so everything runs on time without you holding it up.',
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
      'Workforce development built for how people actually change. Every participant completes nervous system regulation work before anything else, because that is the step every other program skips and the reason the rest of the training sticks. Our proprietary PowerPrint assessment maps strengths, stress patterns, and values to real roles in real industries.',
    color: 'groundwork',
    subservices: [
      'Beyond Duty, veteran workforce readiness',
      'Bridge, emotional intelligence and regulation',
      'Agent Z, AI operator training',
      'Builders, hands-on trades apprenticeship',
      'Money with Purpose, bilingual financial literacy',
      'PowerPrint, proprietary Career DNA assessment',
    ],
    href: '#what-we-do',
  },
]
