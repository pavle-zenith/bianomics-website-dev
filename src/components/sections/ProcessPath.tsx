'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Step } from '@/content/types'
import styles from './HowItWorks.module.css'

/**
 * The progress rail beside the steps. A 1px vertical line is drawn twice: a
 * dim track and a coloured copy whose stroke fills in as the section scrolls,
 * with a node lighting at each step just before the fill arrives.
 *
 * The fill runs through the four practice colours in whatever order the steps
 * take them, so the rail reads as the descent through the practices rather
 * than as a generic progress bar. Built from the steps themselves, so it can
 * never drift out of step with the content.
 */
export function ProcessPath({
  steps,
  children,
}: {
  steps: readonly Step[]
  /** The step rows. Owned here so the fill can measure against them. */
  children: ReactNode
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Fill starts as the rows enter and completes before they leave.
    offset: ['start 0.85', 'end 0.55'],
  })

  // Smooth the raw scroll value so the stroke glides rather than jitters.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <div ref={trackRef} className={styles.track}>
      <div className={styles.rail} aria-hidden="true">
        {/* A straight rule needs no SVG: scaleY on a 1px element is exact at
            any height, and sidesteps the dash-array artefacts that pathLength
            produces on a non-uniformly stretched line. */}
        <span className={styles.railTrack} />
        <motion.span
          className={styles.railFill}
          style={
            {
              scaleY: reduce ? 1 : progress,
              '--rail-gradient': railGradient(steps),
            } as CSSProperties
          }
        />

        {/* A node per step, sitting at that row's share of the rail. */}
        {steps.map((step, i) => (
          <Node
            key={step.n}
            index={i}
            total={steps.length}
            progress={progress}
            reduce={!!reduce}
            color={step.color}
          />
        ))}
      </div>

      {children}
    </div>
  )
}

/**
 * A stop per step, each centred in its row's band of the rail, so the colour
 * changes where the reader crosses into the next step rather than at an
 * arbitrary fraction of the line.
 */
function railGradient(steps: readonly Step[]) {
  const stops = steps.map((step, i) => {
    const at = ((i + 0.5) / steps.length) * 100
    return `var(--lab-${step.color}-fill) ${at.toFixed(1)}%`
  })
  return `linear-gradient(to bottom, ${stops.join(', ')})`
}

function Node({
  index,
  total,
  progress,
  reduce,
  color,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useSpring>
  reduce: boolean
  color: Step['color']
}) {
  // Centre each node in its row's band of the rail.
  const at = (index + 0.5) / total

  // Light up just before the stroke arrives, so it feels led rather than lagged.
  const opacity = useTransform(progress, [at - 0.14, at - 0.02], [0.2, 1])
  const scale = useTransform(progress, [at - 0.14, at - 0.02], [0.6, 1])

  const position = {
    top: `${at * 100}%`,
    '--node-fill': `var(--lab-${color}-fill)`,
  } as CSSProperties

  return (
    <motion.span
      className={styles.railNode}
      style={
        reduce
          ? { ...position, opacity: 1 }
          : { ...position, opacity, scale }
      }
    />
  )
}
