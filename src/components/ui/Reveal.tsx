'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'rise' | 'fade' | 'mask'

interface RevealProps {
  children: ReactNode
  /** Stagger offset in seconds. */
  delay?: number
  /** Travel distance in px for the y-transform. */
  distance?: number
  /**
   * `rise` (default) — fade + lift. The workhorse.
   * `fade`  — opacity only, for content that shouldn't move.
   * `mask`  — the display treatment: type rises out from behind its own
   *           baseline. Reserved for hero and major section titles so it
   *           stays an event rather than a tic.
   */
  variant?: Variant
  as?: 'div' | 'section' | 'li' | 'span' | 'h1' | 'h2'
  className?: string
}

/**
 * Scroll reveal wrapper. Respects prefers-reduced-motion by rendering
 * children statically (no transform, no opacity animation).
 */
export function Reveal({
  children,
  delay = 0,
  distance = 24,
  variant = 'rise',
  as = 'div',
  className,
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<'div'>>

  // The mask variant clips to the element's own box and slides the type up
  // into it, so the line appears to emerge from its baseline. Longer and
  // more settled than the standard reveal.
  if (variant === 'mask') {
    return (
      <MotionTag
        className={className}
        style={{ willChange: 'clip-path, transform' }}
        initial={{ clipPath: 'inset(0 0 100% 0)', y: '0.18em' }}
        whileInView={{ clipPath: 'inset(-25% 0 -25% 0)', y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: variant === 'fade' ? 0 : distance }}
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
