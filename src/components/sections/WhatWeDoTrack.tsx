'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { Lab, LabId } from '@/content/types'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import styles from './WhatWeDo.module.css'

/** How far a drag has to travel before it counts as a page, in px. */
const DRAG_THRESHOLD = 70

/**
 * Below this the carousel un-pages and the four practices stack. A card that
 * runs the full width of a phone leaves no room for the neighbours to peek in,
 * so there is nothing on screen to say the set continues sideways.
 */
const CAROUSEL_MIN_WIDTH = '(min-width: 60rem)'

/**
 * The practices as a looping carousel: one card centred in the viewport, its
 * neighbours peeking in at both edges, paged by dragging or by the arrows on
 * the heading's line.
 *
 * This replaced a scroll-pinned horizontal track. Pinning spent the reader's
 * scroll unevenly — the last practice arrived as the section was already
 * releasing, so Groundwork was on screen for a fraction of the time Vision
 * got. Paging gives all four the same turn, and the loop means neither end of
 * the set is a dead stop.
 */
export function WhatWeDoTrack({
  labs,
  textures,
  heading,
  accent,
}: {
  labs: Lab[]
  textures: Record<LabId, StaticImageData>
  heading: string
  accent: string
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const slideRefs = useRef<(HTMLLIElement | null)[]>([])

  const [index, setIndex] = useState(0)

  // The media query as an external store rather than state synced in an
  // effect: React reads it during render, so there is no pass where the
  // component has mounted but still believes it is the other layout. The
  // server snapshot is `true`, so the markup ships as a carousel and only
  // narrow clients correct on hydration.
  const carousel = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(CAROUSEL_MIN_WIDTH)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(CAROUSEL_MIN_WIDTH).matches,
    () => true,
  )

  const dragState = useRef({ active: false, startX: 0, distance: 0 })

  /**
   * Centre the active card: shift the track by the distance between the
   * viewport's midline and the card's own, plus however far a drag in
   * progress has travelled. Measured rather than computed from a slide width,
   * so the gap and the fluid card width need no bookkeeping.
   *
   * Written straight to the node rather than held in state. The offset is
   * purely visual and is derived from a measurement, so routing it through a
   * render would mean a measure-then-set-state round trip on every pointer
   * move for a value React never needs to know.
   */
  const applyOffset = useCallback(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    const slide = slideRefs.current[index]
    if (!track || !viewport || !slide) return
    // Stacked, the track is a plain column and must not be shifted.
    const base = carousel
      ? viewport.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2)
      : 0
    track.style.transform = `translate3d(${base + dragState.current.distance}px, 0, 0)`
  }, [index, carousel])

  // No dependency array: the offset depends on the rendered layout, so it is
  // re-applied after every commit.
  useLayoutEffect(applyOffset)

  useEffect(() => {
    window.addEventListener('resize', applyOffset)
    return () => window.removeEventListener('resize', applyOffset)
  }, [applyOffset])

  // Wrapping in both directions, so the set has no first or last.
  const step = useCallback(
    (delta: number) => setIndex((i) => (i + delta + labs.length) % labs.length),
    [labs.length],
  )

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Let the browser keep secondary buttons and pen erasers to itself.
    if (e.button !== 0 || !carousel) return
    dragState.current = { active: true, startX: e.clientX, distance: 0 }
    // The track has to follow the finger exactly; easing reads as lag.
    if (trackRef.current) trackRef.current.style.transition = 'none'
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return
    dragState.current.distance = e.clientX - dragState.current.startX
    applyOffset()
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return
    const { distance } = dragState.current
    dragState.current = { active: false, startX: 0, distance: 0 }
    e.currentTarget.releasePointerCapture(e.pointerId)
    // Hand the easing back to the stylesheet before the track settles.
    if (trackRef.current) trackRef.current.style.transition = ''
    if (Math.abs(distance) > DRAG_THRESHOLD) step(distance < 0 ? 1 : -1)
    else applyOffset()
  }

  return (
    <>
      <div className={`${styles.head} container`}>
        <div className={styles.headMain}>
          <Reveal variant="mask">
            <h2 id="what-heading" className={styles.heading}>
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={styles.accent}>{accent}</p>
          </Reveal>
        </div>

        {/* On the heading's line, where the reader is already looking when the
            set opens, rather than at the foot after four cards of scrolling.
            Stacked, there is nothing to page. */}
        <div className={styles.arrows} hidden={!carousel}>
          <button type="button" className={styles.arrow} onClick={() => step(-1)}>
            <span className="visually-hidden">Previous practice</span>
            <Chevron direction="left" />
          </button>
          <button type="button" className={styles.arrow} onClick={() => step(1)}>
            <span className="visually-hidden">Next practice</span>
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      <div className={styles.carousel}>
        <div
          className={`${styles.viewport} ${carousel ? '' : styles.viewportStacked}`}
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <ol
            ref={trackRef}
            className={`${styles.track} ${carousel ? '' : styles.trackStacked}`}
          >
            {labs.map((lab, i) => (
              <li
                key={lab.id}
                ref={(el) => {
                  slideRefs.current[i] = el
                }}
                className={`${styles.slide} ${!carousel || i === index ? styles.slideActive : ''}`}
                // Only the centred card is in the reading order; the ones
                // peeking in at the edges are decoration until they are paged
                // to. Stacked, every card is real content.
                aria-hidden={!carousel || i === index ? undefined : true}
              >
                {/* The card IS the practice's colour. `tone-oncolor` resolves
                    the copy to ink, which all four fills clear at AA. */}
                <article
                  className={`${styles.slideInner} tone-oncolor`}
                  style={
                    {
                      '--slide-fill': `var(--lab-${lab.color}-fill)`,
                    } as CSSProperties
                  }
                >
                  {/* The haze, soft-lit into the fill the way the hero does
                      it, so the card carries the texture's form in its own
                      colour rather than the texture's cyan. */}
                  <div className={styles.slideHaze} aria-hidden="true" />

                  <p className={styles.counter}>
                    Practice {String(i + 1).padStart(2, '0')}
                  </p>

                  <div className={styles.media}>
                    <Image
                      src={textures[lab.id]}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width: 60rem) 40vw, 85vw"
                      className={styles.mediaImage}
                    />
                  </div>

                  {/* Straddles the frame's right edge. */}
                  <h3 className={styles.title}>
                    <LabName name={lab.name} />
                  </h3>

                  <div className={styles.meta}>
                    <p className={styles.mode}>{lab.mode}</p>
                    <ul className={styles.services}>
                      {lab.subservices.map((s) => (
                        <li key={s} className={styles.service}>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.desc}>{lab.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* Foot: progress, counter, and the way on. Stacked, the reader has
            already passed all four, so only the way on is left. */}
        <div className={`${styles.foot} container`}>
          <div className={styles.progress} aria-hidden="true" hidden={!carousel}>
            <span
              className={styles.progressFill}
              style={{ transform: `scaleX(${(index + 1) / labs.length})` }}
            />
          </div>

          <div className={styles.footRow}>
            <p className={styles.count} hidden={!carousel}>
              [ {String(index + 1).padStart(2, '0')} /{' '}
              {String(labs.length).padStart(2, '0')} ]
            </p>

            <a href={anchors.snapshot} className={styles.footLink}>
              Book a Snapshot
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * Renders a lab name with the trademark sign as a styled superscript
 * (the raw ™ glyph at display sizes reads as literal "TM" letters).
 */
function LabName({ name }: { name: string }) {
  if (!name.endsWith('™')) return <>{name}</>
  return (
    <>
      {name.slice(0, -1)}
      <sup className={styles.tm}>™</sup>
    </>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
