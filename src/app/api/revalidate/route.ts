/**
 * Sanity webhook target: called on every publish (and unpublish/delete) in
 * the Studio. Expires the cached content so the next visit renders the new
 * copy. The request is signed with SANITY_REVALIDATE_SECRET, which must match
 * the secret on the webhook in sanity.io/manage.
 */
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { SANITY_CACHE_TAG } from '@/sanity/live'

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return new Response('SANITY_REVALIDATE_SECRET is not set', { status: 500 })
  }

  const { isValidSignature, body } = await parseBody<{ _id?: string; _type?: string }>(request, secret)
  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  // Expire immediately (not stale-while-revalidate), so the very next visit
  // already shows the published change.
  revalidateTag(SANITY_CACHE_TAG, { expire: 0 })

  return NextResponse.json({ revalidated: true, document: body?._id ?? null, at: new Date().toISOString() })
}
