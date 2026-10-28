import type {StructureResolver} from 'sanity/structure'
import {HomeIcon} from '@sanity/icons/Home'
import {StarIcon} from '@sanity/icons/Star'
import {BellIcon} from '@sanity/icons/Bell'
import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {UsersIcon} from '@sanity/icons/Users'
import {StackIcon} from '@sanity/icons/Stack'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UserIcon} from '@sanity/icons/User'
import {HeartIcon} from '@sanity/icons/Heart'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {TagIcon} from '@sanity/icons/Tag'
import {SparklesIcon} from '@sanity/icons/Sparkles'

/**
 * Every section is a single fixed document (the site reads these ids), so the
 * Studio lists them in page order instead of as document collections.
 */
export const SINGLETONS = [
  {id: 'aboutSection', type: 'aboutSection', title: 'About', icon: HomeIcon},
  {id: 'programBanner', type: 'programBanner', title: 'Program banner', icon: BellIcon},
  {id: 'practicesSection', type: 'practicesSection', title: 'Practices (What we do)', icon: ThLargeIcon},
  {id: 'audienceSection', type: 'audienceSection', title: 'Who we work with', icon: UsersIcon},
  {id: 'processSection', type: 'processSection', title: 'Our process', icon: StackIcon},
  {id: 'comparisonSection', type: 'comparisonSection', title: 'Why we are different', icon: SparklesIcon},
  {id: 'resultsSection', type: 'resultsSection', title: 'Results', icon: ProjectsIcon},
  {id: 'founderSection', type: 'founderSection', title: 'Founder', icon: UserIcon},
  {id: 'teamSection', type: 'teamSection', title: 'Team', icon: UsersIcon},
  {id: 'opportunityLabSection', type: 'opportunityLabSection', title: 'Opportunity Lab', icon: HeartIcon},
  {id: 'faqSection', type: 'faqSection', title: 'FAQ', icon: HelpCircleIcon},
  {id: 'contactDetails', type: 'contactDetails', title: 'Contact & footer', icon: EnvelopeIcon},
  {id: 'snapshotLandingPage', type: 'snapshotLandingPage', title: 'Snapshot page (/snapshot)', icon: DocumentTextIcon},
  {id: 'trustStrip', type: 'trustStrip', title: 'Trust strip (not on the site yet)', icon: TagIcon},
] as const

export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items(
      SINGLETONS.flatMap((s, i) => {
        const item = S.listItem()
          .id(s.id)
          .title(s.title)
          .icon(s.icon)
          .child(S.document().schemaType(s.type).documentId(s.id).title(s.title))
        // Visual breaks: home page sections / footer / other pages.
        return i === 11 || i === 12 ? [S.divider(), item] : [item]
      }),
    )
