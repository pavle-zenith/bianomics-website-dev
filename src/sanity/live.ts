/**
 * Sanity client + the one fetch helper pages use.
 *
 * - Visitors: published content, fetched at build/revalidation time and cached
 *   under the `sanity` tag. Pages stay static. Publishing in the Studio fires a
 *   webhook to /api/revalidate, which expires that tag, so the next visit
 *   renders the new copy (seconds after Publish, no rebuild).
 * - Draft mode (the Studio's visual editor): drafts, uncached, with stega
 *   markers so every string can be clicked to edit.
 *
 * Note: next-sanity's defineLive() is not used. In v13 it relies on Next.js
 * Cache Components ('use cache' / cacheTag), which this app doesn't enable,
 * so its tags never attach and publishes don't refresh the site.
 */
import { createClient, type QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tx3mrc2w'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://bianomics.sanity.studio'

/** Cache tag on every published fetch; /api/revalidate expires it. */
export const SANITY_CACHE_TAG = 'sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-02-19',
  useCdn: false,
  perspective: 'published',
  stega: { enabled: false, studioUrl },
})

/** Viewer token: lets draft mode read unpublished drafts. Server-only. */
export const readToken = process.env.SANITY_API_READ_TOKEN || undefined

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode()

  if (isDraftMode && readToken) {
    return client.fetch<T>(query, params, {
      perspective: 'drafts',
      stega: true,
      token: readToken,
      cache: 'no-store',
    })
  }

  return client.fetch<T>(query, params, {
    perspective: 'published',
    stega: false,
    cache: 'force-cache',
    next: { tags: [SANITY_CACHE_TAG] },
  })
}
