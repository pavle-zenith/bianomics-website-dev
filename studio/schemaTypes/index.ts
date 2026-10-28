/**
 * The content model. Mirrors what the website reads in src/content/cms.ts:
 * add a field here, then map it there.
 *
 * Plain object literals rather than defineType() so the same declarations can
 * also be deployed as an MCP-managed schema (for AI tools using the Sanity MCP).
 */
import type {SchemaTypeDefinition} from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  {
    name: 'practice',
    title: 'Practice',
    type: 'string',
    options: {
      list: [
        { title: 'Vision Lab', value: 'vision' },
        { title: 'Stage', value: 'stage' },
        { title: 'Blueprint', value: 'blueprint' },
        { title: 'Groundwork', value: 'groundwork' },
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
  },

  {
    name: 'contactDetails',
    title: 'Contact & footer',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Contact & footer', description: 'Label for this document in the Studio.' },
      { name: 'footerHeadlineLead', title: 'Footer headline: first part', type: 'string', description: 'Set in the muted tone, e.g. "Let\'s build something".' },
      { name: 'footerHeadlineRest', title: 'Footer headline: second part', type: 'string', description: 'Set bright, right after the first part, e.g. "worth talking about".' },
      { name: 'phone', type: 'string', description: 'As it should be displayed, e.g. (915) 252-0712. The tap-to-call link is generated from it.' },
      { name: 'email', type: 'string' },
      { name: 'academyUrl', title: 'Academy URL', type: 'url' },
      { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' },
      { name: 'youtubeUrl', title: 'YouTube URL', type: 'url' },
    ],
  },

  {
    name: 'trustStrip',
    title: 'Trust strip',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Trust strip' },
      { name: 'reachStatement', type: 'string', description: 'Short line beside the recognition marks.' },
      {
        name: 'recognitionMarks',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'recognitionMark',
            fields: [
              { name: 'label', type: 'string', description: 'Short label or acronym shown on the page, e.g. TEDC.' },
              { name: 'fullName', type: 'string', description: 'Full organization name (for screen readers and hover).' },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'aboutSection',
    title: 'About section',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'About section' },
      { name: 'eyebrow', type: 'string' },
      { name: 'statement', type: 'text', rows: 3, description: 'Set large on the left.' },
      { name: 'body', type: 'text', rows: 3, description: 'Body copy on the right, continuing the statement.' },
      { name: 'label', type: 'string', description: 'Small label in the intro row, e.g. "What we do".' },
      { name: 'ctaLabel', title: 'Button label', type: 'string' },
      {
        name: 'capabilities',
        type: 'array',
        description: 'The capability pills. Order matters: the grid fills two across, stepping through the practices.',
        of: [
          {
            type: 'object',
            name: 'capability',
            fields: [
              { name: 'label', type: 'string' },
              { name: 'practice', type: 'practice' },
            ],
          },
        ],
      },
      {
        name: 'stats',
        title: 'Headline numbers',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'stat',
            fields: [
              { name: 'value', type: 'string', description: 'The number itself, e.g. 8 or 4 + 1.' },
              { name: 'suffix', type: 'string', description: 'Small unit next to the number, e.g. " markets" (keep the leading space).' },
              { name: 'label', type: 'string', description: 'What it measures. Leave empty if you list places instead.' },
              { name: 'places', type: 'array', of: [{ type: 'string' }], description: 'Named places shown under the number, instead of a label.' },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'programBanner',
    title: 'Program banner',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Program banner' },
      { name: 'program', type: 'string', description: 'Program name, e.g. Beyond Duty.' },
      { name: 'message', type: 'string' },
      { name: 'ctaLabel', title: 'Button label', type: 'string' },
      { name: 'url', title: 'Button link', type: 'url' },
    ],
  },

  {
    name: 'practicesSection',
    title: 'Practices (What we do)',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Practices (What we do)' },
      {
        name: 'practices',
        type: 'array',
        description: 'The four practices. Their colors are fixed by the design, so edit the text but keep all four.',
        of: [
          {
            type: 'object',
            name: 'practiceCard',
            fields: [
              { name: 'practice', type: 'practice', readOnly: true },
              { name: 'name', type: 'string', description: 'Include ™ where it applies (currently only Groundwork).' },
              { name: 'mode', type: 'string', description: 'One word from the brandbook, e.g. Express.' },
              { name: 'description', type: 'text', rows: 4 },
              { name: 'services', title: 'Sub-services', type: 'array', of: [{ type: 'string' }] },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'audienceSection',
    title: 'Who we work with',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Who we work with' },
      {
        name: 'cards',
        type: 'array',
        description: 'Two cards, each with its own photo. Edit the text; ask Pavle to change photos.',
        of: [
          {
            type: 'object',
            name: 'audienceCard',
            fields: [
              { name: 'cardId', title: 'Card', type: 'string', readOnly: true },
              { name: 'lead', type: 'string', description: 'Small lead-in above the title.' },
              { name: 'heading', type: 'string' },
              { name: 'description', type: 'text', rows: 3 },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'processSection',
    title: 'Our process',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Our process' },
      { name: 'label', title: 'Section heading', type: 'string' },
      { name: 'description', type: 'text', rows: 4 },
      {
        name: 'steps',
        type: 'array',
        description: 'Numbered automatically in this order. The four colors follow the four practices.',
        of: [
          {
            type: 'object',
            name: 'step',
            fields: [
              { name: 'heading', type: 'string' },
              { name: 'description', type: 'text', rows: 3 },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'comparisonSection',
    title: 'Why we are different',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Why we are different' },
      {
        name: 'rows',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'comparisonRow',
            fields: [
              { name: 'dimension', type: 'string' },
              { name: 'typical', title: 'Typical agency', type: 'string' },
              { name: 'bianomics', title: 'Bianomics', type: 'string' },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'founderSection',
    title: 'Founder',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Founder' },
      { name: 'name', type: 'string' },
      { name: 'role', type: 'string' },
      { name: 'promise', type: 'text', rows: 4, description: 'The pull quote.' },
      { name: 'note', title: "Founder's note", type: 'array', of: [{ type: 'text', rows: 6 }], description: 'One entry per paragraph.' },
    ],
  },

  {
    name: 'teamMember',
    title: 'Person',
    type: 'object',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'role', type: 'string' },
      { name: 'bio', type: 'array', of: [{ type: 'text', rows: 4 }], description: 'One entry per paragraph. Leave empty and the card will not open.' },
      { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' },
      { name: 'photo', title: 'Photo key', type: 'string', description: 'Set by Pavle when a headshot is added to the site. Leave empty for a new person: the card shows their initials until the photo is in.' },
    ],
  },

  {
    name: 'teamSection',
    title: 'Team',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Team' },
      { name: 'eyebrow', type: 'string' },
      { name: 'heading', type: 'string' },
      { name: 'members', title: 'Leadership', type: 'array', of: [{ type: 'teamMember' }], description: 'In the order shown on the site.' },
      { name: 'collaboratorsHeading', type: 'string' },
      { name: 'collaborators', title: 'Creative collaborators', type: 'array', of: [{ type: 'teamMember' }] },
    ],
  },

  {
    name: 'opportunityLabSection',
    title: 'Opportunity Lab',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Opportunity Lab' },
      { name: 'name', type: 'string' },
      { name: 'eyebrow', type: 'string' },
      { name: 'heading', type: 'string' },
      { name: 'description', type: 'text', rows: 3, description: 'Short description used where the arm is summarized.' },
      { name: 'statement', title: 'Ethos statement', type: 'text', rows: 3 },
      { name: 'footText', title: 'Who qualifies', type: 'text', rows: 3 },
      { name: 'ctaLabel', title: 'Button label', type: 'string' },
    ],
  },

  {
    name: 'faqSection',
    title: 'FAQ',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'FAQ' },
      { name: 'eyebrow', type: 'string' },
      { name: 'heading', type: 'string' },
      { name: 'description', type: 'text', rows: 3 },
      { name: 'contactCtaLabel', title: 'Contact button label', type: 'string' },
      {
        name: 'items',
        title: 'Questions',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'faqItem',
            fields: [
              { name: 'question', type: 'string' },
              { name: 'answer', type: 'text', rows: 4 },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'resultsSection',
    title: 'Results',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Results' },
      {
        name: 'caseStudies',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'caseStudy',
            fields: [
              { name: 'client', type: 'string' },
              { name: 'category', type: 'string' },
              { name: 'heading', type: 'string' },
              { name: 'summary', type: 'string' },
              { name: 'intro', type: 'text', rows: 4 },
              { name: 'services', type: 'array', of: [{ type: 'string' }] },
              { name: 'practice', title: 'Main practice', type: 'practice' },
              { name: 'secondaryPractice', title: 'Second practice (optional)', type: 'practice' },
              { name: 'image', title: 'Image key', type: 'string', description: 'Set by Pavle when the image is added to the site. Empty shows a lettered frame.' },
            ],
          },
        ],
      },
      {
        name: 'testimonials',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'testimonial',
            fields: [
              { name: 'quote', type: 'text', rows: 4 },
              { name: 'attribution', type: 'string', description: 'Person name.' },
              { name: 'role', type: 'string' },
              { name: 'org', title: 'Organization', type: 'string' },
              { name: 'rating', type: 'string', description: 'e.g. 5.0. Leave empty to hide the stars.' },
            ],
          },
        ],
      },
    ],
  },

  {
    name: 'snapshotLandingPage',
    title: 'Snapshot page (/snapshot)',
    type: 'document',
    fields: [
      { name: 'title', type: 'string', readOnly: true, initialValue: 'Snapshot page (/snapshot)' },
      { name: 'eyebrow', type: 'string' },
      { name: 'headingLead', title: 'Heading: first line', type: 'string' },
      { name: 'headingRest', title: 'Heading: second line', type: 'string' },
      { name: 'intro', type: 'text', rows: 3 },
      { name: 'assurances', type: 'array', of: [{ type: 'string' }], description: 'The qualifiers under the headline.' },
      { name: 'coverHeading', title: 'What you get: heading', type: 'string' },
      { name: 'coverIntro', title: 'What you get: intro', type: 'text', rows: 2 },
      {
        name: 'coverItems',
        title: 'What you get: items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'coverItem',
            fields: [
              { name: 'heading', type: 'string' },
              { name: 'body', type: 'text', rows: 3 },
            ],
          },
        ],
      },
      { name: 'faqHeading', title: 'FAQ: heading', type: 'string' },
      { name: 'faqIntro', title: 'FAQ: intro', type: 'string' },
      {
        name: 'faqItems',
        title: 'FAQ: questions',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'snapshotFaqItem',
            fields: [
              { name: 'question', type: 'string' },
              { name: 'answer', type: 'text', rows: 4 },
            ],
          },
        ],
      },
      { name: 'closingHeading', title: 'Closing: heading', type: 'string' },
      { name: 'closingBody', title: 'Closing: body', type: 'text', rows: 3 },
    ],
  }
] as SchemaTypeDefinition[]
