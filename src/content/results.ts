import type { ResultsContent } from './types'
import { withResults } from './cms'

/**
 * Results content. These are the real engagements, in the client's order, with
 * the copy taken verbatim from their handoff. Three edits only, all mechanical:
 * a tense slip in the Groundwork Youth intro ("now ran" -> "now run"), a
 * trailing full stop dropped from the Beyond Duty title so it sets like the
 * other seven, and a broken clause in Driven Against Silence ("then sat down
 * and are supporting") rewritten to hold one tense.
 *
 * Every engagement has its artwork now. The lettered fallback frame in
 * Results.tsx stays for the next one that arrives without it.
 *
 * Testimonials remain empty until approved quotes land.
 */
export const resultsDefault: ResultsContent = {
  caseStudies: [
    {
      id: 'groundwork-youth',
      client: 'Groundwork Youth Program',
      category: 'Multi-State Licensing',
      title: 'A curriculum built once, now running in four states',
      summary: "What started in El Paso didn't stay in El Paso.",
      intro:
        'We built the youth curriculum, then built it to travel. Georgia, New Jersey, New York, and Texas now run the same methodology under their own name. Proof that what works here works anywhere.',
      texture: 'groundwork-youth',
      color: 'groundwork',
      services: ['Workforce Development', 'Curriculum Design', 'Program Licensing'],
    },
    {
      id: 'beyond-duty',
      client: 'Beyond Duty',
      category: 'Groundwork · Flagship Program',
      title: 'A veteran program built to thaw a frozen nervous system',
      summary: 'From first cohort to a program running through 2027.',
      intro:
        'We designed the curriculum, built the sales kit and partnership deck that earned it sponsor funding, and ran the press campaign that carried it into public view. Still running. Still growing.',
      texture: 'beyond-duty',
      color: 'groundwork',
      services: [
        'Program Design',
        'Brand Strategy',
        'Public Relations',
        'Presentation Design',
      ],
    },
    {
      id: 'workforce-solutions',
      client: 'Workforce Solutions Borderplex',
      category: 'Groundwork + Vision Lab · Systems Partner',
      title: 'The workforce board that handed us the whole operation',
      summary:
        'Staff development and youth readiness, backed by the infrastructure to run it without us.',
      intro:
        "Continuation of brand strategy, communications guidelines, a mapped consumer journey, and the project management systems underneath all of it. Not a workshop vendor. A comms department they didn't have to build themselves.",
      texture: 'workforce-solutions',
      color: 'groundwork',
      colorSecondary: 'vision',
      services: [
        'Brand Audit',
        'Strategy',
        'Communications Infrastructure',
        'Project Management',
        'Workforce Development',
      ],
    },
    {
      id: 'challenge-foundation',
      client: 'The Challenge Foundation El Paso',
      category: 'Vision Lab',
      title: 'A nonprofit trained to run its own comms, not rent ours forever',
      summary: "We didn't just reinforce the brand. We taught the team to hold it.",
      intro:
        "A full brand audit and reinforcement, an active public relations practice, and communications strategy training built so leadership could manage the message themselves. The kind of work that's supposed to make you obsolete, on purpose.",
      texture: 'challenge-foundation',
      color: 'vision',
      services: [
        'Brand Audit',
        'Public Relations',
        'Communications Strategy',
        'Leadership Empowerment',
      ],
    },
    {
      id: 'epla',
      client: 'El Paso Leadership Academy',
      category: 'Groundwork + Vision Lab',
      title: 'Workshops and press, working the same story from two directions',
      summary: 'One campaign, one purpose-alignment curriculum, one team building both.',
      intro:
        'We built customized workforce and purpose alignment workshops from the ground up, then ran the public relations campaign that put the results in front of the region.',
      texture: 'epla',
      color: 'groundwork',
      services: [
        'Workforce Development',
        'Purpose Alignment Workshops',
        'Public Relations',
        'Campaign Strategy',
      ],
    },
    {
      id: 'readyone',
      client: 'ReadyOne Industries',
      category: 'Blueprint · Operations · Vision Lab',
      title: 'Built by Ability, told the way it deserved to be told',
      summary:
        "HR video, staff messaging, and the campaign carrying a mission-driven employer's story.",
      intro:
        'We produced the HR video series, trained staff on messaging that actually sounds like people, produced the Built by Ability campaign, and built the communications training and workflow systems that keep it running without a consultant in the room.',
      texture: 'readyone',
      color: 'blueprint',
      services: [
        'HR Video Production',
        'Staff Messaging Training',
        'Campaign Strategy',
        'Communications Training',
        'Workflow Design',
      ],
    },
    {
      id: 'way-out-west',
      client: 'Way Out West',
      category: 'Stage',
      title: 'Production support for a campaign on festival relocation built to be seen',
      summary: 'The press and the production, handled by Bianomics.',
      intro:
        'We supported the production campaign end to end and ran the public relations alongside it, so the work and the story of the work moved at the same pace.',
      texture: 'way-out-west',
      color: 'stage',
      services: ['Production Support', 'Public Relations'],
    },
    {
      id: 'driven-against-silence',
      client: 'Driven Against Silence',
      category: 'Vision Lab · Nonprofit Consulting',
      title: 'A nonprofit that needed a strategy, not just a logo',
      summary: 'Brand identity, messaging, and the plan to carry both forward.',
      intro:
        'We built the brand identity and the messaging behind it, and we are supporting the strategic plan build, so the organization has a direction, not just a look.',
      texture: 'driven-against-silence',
      color: 'vision',
      services: [
        'Nonprofit Consulting',
        'Brand Identity',
        'Messaging',
        'Strategic Planning',
      ],
    },
  ],
  testimonials: [],
}

// ---------------------------------------------------------------------------
// What the site renders: the literals above are only the fallback. The copy
// itself is edited in Sanity (https://bianomics.sanity.studio) and laid over
// them at build time, see cms.ts. Editing a string above changes nothing
// while Sanity has a value for it.
export const results: ResultsContent = withResults(resultsDefault)
