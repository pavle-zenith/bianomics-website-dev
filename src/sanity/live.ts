/**
 * Sanity client + Live Content API.
 *
 * `sanityFetch` serves published content to visitors (cached, static) and, in
 * draft mode, the editor's drafts with Visual Editing markers. `<SanityLive />`
 * in the root layout listens for publishes and revalidates the affected pages,
 * so a Publish in the Studio is live within seconds, no rebuild needed.
 */
import { createClient } from 'next-sanity'
import { defineLive } from 'next-sanity/live'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tx3mrc2w'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://bianomics.sanity.studio'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-02-19',
  useCdn: true,
  perspective: 'published',
  stega: { studioUrl },
})

/** Viewer token: lets the server (and the editor's browser in draft mode) read drafts. */
export const readToken = process.env.SANITY_API_READ_TOKEN || undefined

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken,
  browserToken: readToken,
})
