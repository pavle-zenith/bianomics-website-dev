'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Step } from '@/content/types'
import styles from './HowItWorks.module.css'

/**
 * The progress rail beside the steps. A 1px vertical line is drawn twice: a
 * dim track and a brand-colored copy whose stroke fills in as the section
 * scrolls, with a node lighting at each step just before the fill arrives.
 *
 * The viewBox is 2 units wide and 100 tall, stretched to the rail's box, so
 * the geometry is resolution-independent and the stroke stays 1px via
 * vector-effect regardless of the non-uniform scale.
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
          style={{ scaleY: reduce ? 1 : progress }}
        />

        {/* A node per step, sitting at that row's share of the rail. */}
        {steps.map((step, i) => (
          <Node
            key={step.n}
            index={i}
            total={steps.length}
            progress={progress}
            reduce={!!reduce}
          />
        ))}
      </div>

      {children}
    </div>
  )
}

function Node({
  index,
  total,
  progress,
  reduce,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useSpring>
  reduce: boolean
}) {
  // Centre each node in its row's band of the rail.
  const at = (index + 0.5) / total

  // Light up just before the stroke arrives, so it feels led rather than lagged.
  const opacity = useTransform(progress, [at - 0.14, at - 0.02], [0.2, 1])
  const scale = useTransform(progress, [at - 0.14, at - 0.02], [0.6, 1])

  return (
    <motion.span
      className={styles.railNode}
      style={
        reduce
          ? { top: `${at * 100}%`, opacity: 1 }
          : { top: `${at * 100}%`, opacity, scale }
      }
    />
  )
}
