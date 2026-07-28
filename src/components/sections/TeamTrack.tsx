'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { TeamMember } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Team.module.css'

interface TeamTrackProps {
  members: readonly TeamMember[]
  photos: Record<string, StaticImageData>
  heading: string
}

/**
 * Team headshots on a horizontal track that runs off the right edge of the
 * viewport, paged left/right by the arrow controls beside the title. Native
 * scroll-snap does the movement, so it stays swipeable on touch.
 */
export function TeamTrack({ members, photos, heading }: TeamTrackProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [updateEdges])

  const page = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(`.${styles.card}`)
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.6
    el.scrollBy({ left: step * 2 * direction, behavior: 'smooth' })
  }

  return (
    <>
      <div className="container">
        <Reveal className={styles.head}>
          <div>
            <h2 id="team-heading" className={styles.heading}>
              {heading}
            </h2>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label="Previous team members"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label="Next team members"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </Reveal>
      </div>

      <ul ref={trackRef} className={styles.track} onScroll={updateEdges}>
        {members.map((member) => (
          <li key={member.id} className={styles.card}>
            <div className={styles.label}>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </div>
            <div className={styles.photoWrap}>
              <Image
                src={photos[member.photo] ?? Object.values(photos)[0]!}
                alt={`${member.name}, ${member.role}`}
                fill
                sizes="(min-width: 48rem) 20rem, 70vw"
                className={styles.photo}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
