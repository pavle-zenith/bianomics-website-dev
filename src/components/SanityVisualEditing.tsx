'use client'

import { useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { VisualEditing } from 'next-sanity/visual-editing/client-component'

/**
 * Click-to-edit overlays for the Studio's visual editor (draft mode only).
 *
 * Re-renders the page as the editor types. Draft-mode fetches are uncached, so
 * a router refresh picks up the latest draft. Keystrokes are debounced so the
 * preview refreshes once she pauses rather than on every character.
 */
export function SanityVisualEditing() {
  const router = useRouter()
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const refresh = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        router.refresh()
        resolve()
      }, 400)
    })
  }, [router])

  return <VisualEditing refresh={refresh} />
}
