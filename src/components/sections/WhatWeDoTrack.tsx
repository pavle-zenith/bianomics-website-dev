'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Lab, LabId } from '@/content/types'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import styles from './WhatWeDo.module.css'

/**
 * Below this the section un-pins and the four practices stack. A card that
 * runs the full width of a phone leaves no room for the neighbours to peek in,
 * and hijacking scroll on a touch device is hostile rather than helpful.
 */
const PIN_MIN_WIDTH = '(min-width: 60rem)'

/**
 * Where the travel finishes and the hold begins, as a share of the pin. The
 * track sweeps continuously from the first practice to the last across
 * everything before this, then the last one sits centred for the remainder.
 */
const HOLD_FROM = 0.78

/**
 * The practices as a scroll-pinned horizontal track: while the section is on
 * screen the page's vertical scroll drives the cards sideways, so all four are
 * seen before the page moves on.
 *
 * The travel is continuous: the track sweeps from the first practice to the
 * last as the reader scrolls, passing each one through the centre on the way.
 * The one departure from a straight mapping is at the end, where the last
 * practice is held centred for the closing stretch of the pin. Without that
 * hold it finishes arriving exactly as the section releases, which is how
 * Groundwork ended up with a fraction of the screen time Vision got.
 *
 * Falls back to a plain vertical stack on narrow viewports and under
 * prefers-reduced-motion.
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
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLLIElement | null)[]>([])
  const reduce = useReducedMotion()

  // The media query as an external store rather than state synced in an
  // effect: React reads it during render, so there is no pass where the
  // component has mounted but still believes it is the other layout. The
  // server snapshot is `true`, so the markup ships pinned and only narrow
  // clients correct on hydration.
  const wide = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(PIN_MIN_WIDTH)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(PIN_MIN_WIDTH).matches,
    () => true,
  )

  const pinned = wide && !reduce

  // One x-offset per practice, each centring that card in the viewport.
  // Measured rather than computed from a slide width, so the gap and the
  // fluid card width need no bookkeeping.
  const [offsets, setOffsets] = useState<number[]>([])

  const measure = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const next = slideRefs.current.map((slide) =>
      slide ? viewport.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2) : 0,
    )
    setOffsets((prev) =>
      prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next,
    )
  }, [])

  useLayoutEffect(() => {
    // Measured after paint rather than during the effect body, so the read
    // happens once the stacked/pinned layout it depends on has been applied.
    const frame = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(frame)
  }, [measure, pinned])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const { scrollYProgress } = useScroll({
    target: pinRef,
    // Starts once the section is pinned, ends as it releases.
    offset: ['start start', 'end end'],
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  // One keyframe per practice, spread evenly across the travel, plus a final
  // one repeating the last offset so the end of the pin holds it centred.
  // Keyed off the measured offsets rather than a single start-to-end span, so
  // each card passes through the centre even if the widths ever differ.
  const [stops, values] = useMemo(() => {
    const n = offsets.length
    if (n < 2) return [[0, 1], [offsets[0] ?? 0, offsets[0] ?? 0]]
    const inputs = offsets.map((_, i) => (i / (n - 1)) * HOLD_FROM)
    const outputs = [...offsets]
    inputs.push(1)
    outputs.push(offsets[n - 1]!)
    return [inputs, outputs]
  }, [offsets])

  const x = useTransform(progress, stops, values, { clamp: true })

  // The counter reads from the same mapping the track does, so it can never
  // disagree with what is centred: which practice is nearest the middle is
  // the travel's own progress rounded, and anything past the hold is the last.
  const [active, setActive] = useState(1)
  useEffect(() => {
    return progress.on('change', (v) => {
      const n = labs.length
      const along = Math.min(1, v / HOLD_FROM)
      setActive(Math.min(n, Math.max(1, Math.round(along * (n - 1)) + 1)))
    })
  }, [progress, labs.length])

  const fill = useTransform(progress, [0, 1], [1 / labs.length, 1], { clamp: true })

  /** Scroll the window to a practice's dwell, so the arrows drive the pin. */
  const goTo = (i: number) => {
    const pin = pinRef.current
    if (!pin) return
    const clamped = Math.min(labs.length - 1, Math.max(0, i))
    if (!pinned) {
      slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const travel = pin.offsetHeight - window.innerHeight
    const top = window.scrollY + pin.getBoundingClientRect().top
    // The last practice targets the middle of its hold; the rest target the
    // point on the sweep where they pass through the centre.
    const at =
      clamped === labs.length - 1
        ? (HOLD_FROM + 1) / 2
        : (clamped / (labs.length - 1)) * HOLD_FROM
    window.scrollTo({ top: top + travel * at, behavior: 'smooth' })
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

        {/* Kept alongside the scroll: the pin is the primary way through, but
            the arrows give the same journey to anyone who would rather click,
            and they drive the pin rather than fighting it. */}
        <div className={styles.arrows} hidden={!pinned}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active - 2)}
            disabled={active <= 1}
          >
            <span className="visually-hidden">Previous practice</span>
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active)}
            disabled={active >= labs.length}
          >
            <span className="visually-hidden">Next practice</span>
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      {/* The wrapper is tall; the inner sticks to the viewport while the page
          scrolls through it, and that vertical progress is what moves the
          track sideways. */}
      <div
        ref={pinRef}
        className={`${styles.pin} ${pinned ? styles.pinActive : ''}`}
        style={{ ['--slides' as string]: String(labs.length) }}
      >
        <div className={styles.sticky}>
          <div
            className={`${styles.viewport} ${pinned ? '' : styles.viewportStacked}`}
            ref={viewportRef}
          >
            <motion.ol
              className={`${styles.track} ${pinned ? '' : styles.trackStacked}`}
              style={pinned ? { x } : undefined}
            >
              {labs.map((lab, i) => (
                <li
                  key={lab.id}
                  ref={(el) => {
                    slideRefs.current[i] = el
                  }}
                  className={styles.slide}
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
                    {/* Fine grit rather than the haze: the haze is a large
                        soft image, and at any strength that read it also
                        washed the fill out. Grain adds tooth without touching
                        the colour. */}
                    <div className={styles.slideGrain} aria-hidden="true" />

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

                    <div className={styles.meta}>
                      {/* Leads the copy column, directly above its mode. */}
                      <h3 className={styles.title}>
                        <LabName name={lab.name} />
                      </h3>
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
            </motion.ol>
          </div>

          {/* Foot: progress, counter, and the way on. */}
          <div className={`${styles.foot} container`}>
            <div className={styles.progress} aria-hidden="true" hidden={!pinned}>
              <motion.span
                className={styles.progressFill}
                style={pinned ? { scaleX: fill } : { scaleX: 1 }}
              />
            </div>

            <div className={styles.footRow}>
              <p className={styles.count} hidden={!pinned}>
                [ {String(active).padStart(2, '0')} /{' '}
                {String(labs.length).padStart(2, '0')} ]
              </p>

              <a href={anchors.snapshot} className={styles.footLink}>
                Book a Snapshot
                <ArrowUpRight />
              </a>
            </div>
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
