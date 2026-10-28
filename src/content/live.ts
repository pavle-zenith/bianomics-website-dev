/**
 * What pages render: the code defaults with the current Sanity copy laid over.
 *
 * Fetched once per request (React `cache`), from Sanity's Live Content API:
 * published copy for visitors, drafts with Visual Editing markers inside the
 * Studio's Presentation view. If Sanity can't be reached, the committed
 * snapshot in cms.json is used instead, so the site never renders empty.
 */
import { cache } from 'react'
import { unstable_rethrow } from 'next/navigation'
import { stegaClean } from '@sanity/client/stega'
import { sanityFetch } from '@/sanity/live'
import {
  CMS_DOC_IDS,
  snapshotDocs,
  type Docs,
  withAbout,
  withComparison,
  withContact,
  withFaqIntro,
  withFaqItems,
  withFitSituations,
  withFounder,
  withHowItWorks,
  withLabs,
  withOpportunityLab,
  withProgramBanner,
  withReachStatement,
  withRecognitionMarks,
  withResults,
  withSnapshotPage,
  withSteps,
  withTeam,
} from './cms'
import {
  aboutDefault,
  comparisonDefault,
  contactDefault,
  faqIntroDefault,
  fitSituationsDefault,
  founderDefault,
  howItWorksDefault,
  opportunityLabDefault,
  programBannerDefault,
  reachStatementDefault,
  recognitionMarksDefault,
  stepsDefault,
  teamDefault,
} from './site'
import { labsDefault } from './labs'
import { faqItemsDefault } from './faq'
import { resultsDefault } from './results'
import { snapshotPageDefault } from './snapshotPage'

const CMS_QUERY = '*[_id in $ids]'

async function fetchDocs(): Promise<Docs> {
  try {
    const { data } = await sanityFetch({ query: CMS_QUERY, params: { ids: [...CMS_DOC_IDS] } })
    if (!Array.isArray(data) || data.length === 0) return snapshotDocs
    const live: Docs = {}
    for (const doc of data as Record<string, unknown>[]) {
      live[stegaClean(String(doc._id)).replace(/^drafts\./, '')] = doc
    }
    // A section missing from Sanity keeps its snapshot copy.
    return { ...snapshotDocs, ...live }
  } catch (err) {
    // Let Next.js's own control-flow errors through (dynamic rendering etc.).
    unstable_rethrow(err)
    console.warn(`[cms] Live fetch failed, rendering the cms.json snapshot: ${(err as Error).message}`)
    return snapshotDocs
  }
}

export const getContent = cache(async () => {
  const docs = await fetchDocs()
  return {
    contact: withContact(contactDefault, docs),
    recognitionMarks: withRecognitionMarks(recognitionMarksDefault, docs),
    reachStatement: withReachStatement(reachStatementDefault, docs),
    about: withAbout(aboutDefault, docs),
    fitSituations: withFitSituations(fitSituationsDefault, docs),
    howItWorks: withHowItWorks(howItWorksDefault, docs),
    steps: withSteps(stepsDefault, docs),
    comparison: withComparison(comparisonDefault, docs),
    founder: withFounder(founderDefault, docs),
    team: withTeam(teamDefault, docs),
    opportunityLab: withOpportunityLab(opportunityLabDefault, docs),
    programBanner: withProgramBanner(programBannerDefault, docs),
    faqIntro: withFaqIntro(faqIntroDefault, docs),
    labs: withLabs(labsDefault, docs),
    faqItems: withFaqItems(faqItemsDefault, docs),
    results: withResults(resultsDefault, docs),
    snapshotPage: withSnapshotPage(snapshotPageDefault, docs),
  }
})
