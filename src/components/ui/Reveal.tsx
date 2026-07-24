'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger offset in seconds. */
  delay?: number
  /** Travel distance in px for the y-transform. */
  distance?: number
  as?: 'div' | 'section' | 'li' | 'span'
  className?: string
}

/**
 * Scroll reveal wrapper. Fades + lifts content once as it enters the
 * viewport. Respects prefers-reduced-motion by rendering children
 * statically (no transform, no opacity animation).
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  as = 'div',
  className,
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: 0.64,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </MotionTag>
  )
}
