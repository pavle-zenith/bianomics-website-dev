'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { TeamMember } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Team.module.css'

interface TeamTrackProps {
  members: readonly TeamMember[]
  photos: Record<string, StaticImageData>
  heading: string
  /** Unique per track: the section renders more than one of these. */
  headingId: string
}

/**
 * Team headshots on a horizontal track that runs off the right edge of the
 * viewport, paged left/right by the arrow controls beside the title. Native
 * scroll-snap does the movement, so it stays swipeable on touch. Selecting a
 * card opens the full bio in a panel that slides in from the right.
 */
export function TeamTrack({ members, photos, heading, headingId }: TeamTrackProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)

  const open = members.find((m) => m.id === openId) ?? null

  // Both true at once means the track does not overflow, which is the signal
  // the controls use to take themselves off the page.
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

    // Advance by however many cards are fully on screen, never more. A fixed
    // two-card page skipped someone on a phone, where only one card fits at a
    // time. Capped at two so the wider layouts keep the rhythm they had.
    const visible = Math.max(1, Math.floor(el.clientWidth / step))
    el.scrollBy({ left: step * Math.min(2, visible) * direction, behavior: 'smooth' })
  }

  return (
    <>
      <div className="container">
        <Reveal className={styles.head}>
          <div>
            <h2 id={headingId} className={styles.heading}>
              {heading}
            </h2>
          </div>

          <div className={styles.controls} hidden={atStart && atEnd}>
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
        {members.map((member) => {
          const photo = member.photo ? photos[member.photo] : undefined
          const openable = Boolean(member.bio?.length)

          // Wrapped in a span rather than laid out by the button itself:
          // WebKit does not treat a <button>'s children as real flex items,
          // which collapsed the aspect-ratio box holding each portrait. It
          // renders correctly in Blink, so DevTools device emulation cannot
          // reproduce it — only a real iOS browser shows the empty cards.
          const inner = (
            <span className={styles.cardLayout}>
              <span className={styles.label}>
                <span className={styles.name}>{member.name}</span>
                <span className={styles.role}>{member.role}</span>
              </span>
              <span className={styles.photoWrap}>
                {photo ? (
                  <Image
                    src={photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 48rem) 20rem, 70vw"
                    /* Eager, not lazy. The track scrolls sideways, so every
                       card past the fourth is outside the viewport and lazy
                       loading correctly refuses to fetch it — which means a
                       reader swiping the roster on a phone met an empty frame
                       and waited for it. Eleven portraits at a phone's size is
                       a cheaper trade than that. */
                    loading="eager"
                    /* And a blur while the bytes land, so the frame is never
                       blank even on a slow connection. */
                    placeholder="blur"
                    className={styles.photo}
                  />
                ) : (
                  <Initials name={member.name} />
                )}
                {openable ? (
                  <span className={styles.readBio} aria-hidden="true">
                    Read bio
                  </span>
                ) : null}
              </span>
            </span>
          )

          return (
            <li key={member.id} className={styles.card}>
              {/* Nothing to open until the bio lands, so the card stays a
                  plain block rather than a button that does nothing. */}
              {openable ? (
                <button
                  type="button"
                  className={styles.cardButton}
                  onClick={() => setOpenId(member.id)}
                  aria-haspopup="dialog"
                >
                  {inner}
                </button>
              ) : (
                <div className={styles.cardStatic}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>

      <BioPanel member={open} photos={photos} onClose={() => setOpenId(null)} />
    </>
  )
}

/** The bio itself, in a panel that comes in from the right edge. */
function BioPanel({
  member,
  photos,
  onClose,
}: {
  member: TeamMember | null
  photos: Record<string, StaticImageData>
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  // Escape closes, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!member) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [member, onClose])

  return (
    <AnimatePresence>
      {member ? (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
        >
          <button
            type="button"
            className={styles.scrim}
            onClick={onClose}
            tabIndex={-1}
            aria-hidden="true"
          />

          <motion.aside
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bio-name"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close bio"
            >
              <Cross />
            </button>

            <div className={styles.panelScroll}>
              <div className={styles.panelPhoto}>
                {member.photo && photos[member.photo] ? (
                  <Image
                    src={photos[member.photo]!}
                    alt=""
                    fill
                    sizes="(min-width: 48rem) 34rem, 100vw"
                    placeholder="blur"
                    className={styles.panelImg}
                  />
                ) : (
                  <Initials name={member.name} />
                )}
              </div>

              <div className={styles.panelBody}>
                <p className={styles.panelRole}>{member.role}</p>
                <h3 id="bio-name" className={styles.panelName}>
                  {member.name}
                </h3>
                <div className={styles.panelBio}>
                  {member.bio?.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/**
 * Stands in for a headshot that has not landed yet. Initials on the section's
 * own field rather than a grey box, so an incomplete card still belongs to the
 * page. Never substitute another member's photo here.
 */
function Initials({ name }: { name: string }) {
  const letters = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0] ?? '')
    .join('')

  return (
    <span className={styles.initials} aria-hidden="true">
      {letters}
    </span>
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

function Cross() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
