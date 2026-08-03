'use client'

import { useRef, useState, type MouseEvent } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { LabColorKey, Step } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { ProcessPath } from './ProcessPath'
import styles from './HowItWorks.module.css'

/** Travel of the parallax, in px. Deliberately small — this should register
 *  as life in the surface, not as motion you notice. */
const DRIFT = 10

/**
 * The process steps as tall tabs: copy at the foot of the left half, the
 * step's image filling the right. Every image stays on screen; the cursor
 * only drifts them a few pixels, so the section breathes without moving.
 */
export function ProcessRows({
  steps,
  textures,
}: {
  steps: readonly Step[]
  textures: Record<LabColorKey, StaticImageData>
}) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 90, damping: 26, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 26, mass: 0.6 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const zone = zoneRef.current
    if (!zone || reduce) return
    const r = zone.getBoundingClientRect()
    // Normalised to -1..1 from the centre, then scaled right down.
    x.set((((e.clientX - r.left) / r.width) * 2 - 1) * DRIFT)
    y.set((((e.clientY - r.top) / r.height) * 2 - 1) * DRIFT)
  }

  return (
    <div
      ref={zoneRef}
      className={styles.zone}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
    >
      <ProcessPath steps={steps}>
        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`${styles.step} ${active === i ? styles.stepActive : ''}`}
              onMouseEnter={() => setActive(i)}
            >
              <Reveal className={styles.stepInner} distance={32}>
                <div className={styles.stepBody}>
                  <span className={styles.stepNum}>
                    <span className={styles.stepDot} aria-hidden="true" />
                    {String(step.n).padStart(2, '0')}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.description}</p>
                </div>

                <div className={styles.stepMedia} aria-hidden="true">
                  <motion.div
                    className={styles.stepMediaInner}
                    style={reduce ? undefined : { x: sx, y: sy }}
                  >
                    <Image
                      src={textures[step.color]}
                      alt=""
                      fill
                      sizes="(min-width: 60rem) 46vw, 100vw"
                      className={styles.stepImg}
                    />
                  </motion.div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </ProcessPath>
    </div>
  )
}
