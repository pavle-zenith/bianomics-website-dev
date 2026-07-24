'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

/**
 * Fires a `scroll_depth` event once when the user first reaches the
 * "What we do" and "Snapshot" sections. One IntersectionObserver, a
 * fire-once guard per section. Renders nothing.
 */
const TARGETS: { id: string; section: 'what_we_do' | 'snapshot' }[] = [
  { id: 'what-we-do', section: 'what_we_do' },
  { id: 'snapshot', section: 'snapshot' },
]

export function ScrollDepth() {
  useEffect(() => {
    const fired = new Set<string>()
    const byId = new Map(TARGETS.map((t) => [t.id, t.section]))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting && !fired.has(id)) {
            fired.add(id)
            const section = byId.get(id)
            if (section) track('scroll_depth', { section })
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.35 },
    )

    for (const { id } of TARGETS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return null
}
