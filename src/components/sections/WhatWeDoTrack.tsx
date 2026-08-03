'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Lab, LabId } from '@/content/types'
import { anchors } from '@/lib/routes'
import styles from './WhatWeDo.module.css'

/** Below this the section un-pins and the practices stack vertically. */
const PIN_MIN_WIDTH = 960

/**
 * The practices as a pinned horizontal track: while the section is on screen
 * the page's vertical scroll drives the slides sideways, so all four are seen
 * before the page moves on. Falls back to a plain vertical stack on narrow
 * viewports and under prefers-reduced-motion, where hijacking scroll is
 * hostile rather than helpful.
 */
export function WhatWeDoTrack({
  labs,
  textures,
}: {
  labs: Lab[]
  textures: Record<LabId, StaticImageData>
}) {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()

  const [pinned, setPinned] = useState(false)
  const [distance, setDistance] = useState(0)

  // Decide whether to pin at all.
  useEffect(() => {
    const decide = () => setPinned(window.innerWidth >= PIN_MIN_WIDTH && !reduce)
    decide()
    window.addEventListener('resize', decide)
    return () => window.removeEventListener('resize', decide)
  }, [reduce])

  // Measure only AFTER pinning has been applied: the track lays out as a
  // vertical stack until then, so measuring in the same pass would read a
  // width of zero and the transform would never move.
  useEffect(() => {
    if (!pinned) {
      setDistance(0)
      return
    }
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    const raf = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

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

  // The track finishes travelling at 0.8, leaving the last fifth of the pin
  // as a hold so the final practice sits on screen instead of sliding into
  // place just as the section releases.
  const x = useTransform(progress, [0, 0.8], [0, -distance], { clamp: true })
  const fill = useTransform(progress, [0, 0.8], [0.02, 1], { clamp: true })

  const [active, setActive] = useState(1)
  useEffect(() => {
    return progress.on('change', (v) => {
      setActive(Math.min(labs.length, Math.floor(v * labs.length) + 1))
    })
  }, [progress, labs.length])

  return (
    <div
      ref={pinRef}
      className={`${styles.pin} ${pinned ? styles.pinActive : ''}`}
      style={{ ['--slides' as string]: String(labs.length) }}
    >
      <div className={styles.sticky}>
        <motion.ol
          ref={trackRef}
          className={styles.track}
          style={pinned ? { x } : undefined}
        >
          {labs.map((lab, i) => (
            <li key={lab.id} className={styles.slide}>
              <article className={styles.slideInner}>
                <p className={styles.counter}>
                  Practice {String(i + 1).padStart(2, '0')}
                </p>

                <div className={styles.media}>
                  <Image
                    src={textures[lab.id]}
                    alt=""
                    fill
                    sizes="(min-width: 60rem) 40vw, 85vw"
                    className={styles.mediaImage}
                  />
                </div>

                {/* Above the image and blending where it crosses. */}
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
        </motion.ol>

        {/* Foot: progress, counter, and the way on. */}
        <div className={`${styles.foot} container`}>
          <div className={styles.progress} aria-hidden="true">
            <motion.span
              className={styles.progressFill}
              style={pinned ? { scaleX: fill } : { scaleX: 1 }}
            />
          </div>

          <div className={styles.footRow}>
            <p className={styles.count}>
              [ {String(pinned ? active : labs.length).padStart(2, '0')} /{' '}
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
