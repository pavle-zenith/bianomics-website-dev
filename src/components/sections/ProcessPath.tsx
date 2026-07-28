'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { Step } from '@/content/types'
import styles from './HowItWorks.module.css'

/**
 * The winding path that connects the steps. A single SVG curve is drawn twice:
 * a dim track, and a bright brand-colored copy whose stroke fills in as the
 * section scrolls. Each node lights up once the fill reaches it.
 *
 * The viewBox is 1000 wide and 260 tall per step, so the curve scales with the
 * column while the stroke stays a constant width (vector-effect).
 */
const STEP_H = 260

/** Serpentine control points: the path swings right, left, right, left. */
function buildPath(count: number): string {
  const midX = 500
  const swing = 300
  let d = `M ${midX} 0`
  for (let i = 0; i < count; i++) {
    const y0 = i * STEP_H
    const dir = i % 2 === 0 ? 1 : -1
    const cx = midX + swing * dir
    // Two mirrored cubics per step make one smooth S-bend.
    d += ` C ${cx} ${y0 + STEP_H * 0.25}, ${cx} ${y0 + STEP_H * 0.75}, ${midX} ${y0 + STEP_H}`
  }
  return d
}

export function ProcessPath({ steps }: { steps: readonly Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // Fill starts as the section enters and completes before it leaves.
    offset: ['start 0.8', 'end 0.4'],
  })

  // Smooth the raw scroll value so the stroke glides rather than jitters.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  const height = steps.length * STEP_H
  const d = buildPath(steps.length)

  return (
    <div ref={wrapRef} className={styles.pathWrap}>
      <svg
        className={styles.pathSvg}
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Dim track */}
        <path
          d={d}
          className={styles.pathTrack}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Brand-colored fill, revealed by scroll */}
        <motion.path
          d={d}
          className={styles.pathFill}
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : progress }}
        />

        {/* A node per step, lighting up as the fill passes it. */}
        {steps.map((step, i) => (
          <Node
            key={step.n}
            index={i}
            total={steps.length}
            progress={progress}
            reduce={!!reduce}
          />
        ))}
      </svg>
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
  // The node sits where its step's curve meets the centre line.
  const y = (index + 1) * STEP_H
  const at = (index + 1) / total

  // Light up just before the stroke arrives, so it feels led rather than lagged.
  const opacity = useTransform(progress, [at - 0.12, at - 0.02], [0.25, 1])
  const scale = useTransform(progress, [at - 0.12, at - 0.02], [0.7, 1])

  return (
    <motion.circle
      cx={500}
      cy={y}
      r={9}
      className={styles.pathNode}
      style={reduce ? { opacity: 1 } : { opacity, scale }}
      // Scale from the circle's own centre, not the viewBox origin.
      transform-origin={`500 ${y}`}
    />
  )
}
