/**
 * Called by the Studio's Presentation tool to switch the preview into draft
 * mode (it validates a short-lived secret with Sanity before enabling).
 */
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client, readToken } from '@/sanity/live'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
})
