'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { brand } from '@/content/site'
import logo from '../../../public/Horizontal_Original_Blue.png'
import styles from './Intro.module.css'

/** Total run: the last keyframe ends at 1950ms, plus a frame of slack. */
const LIFETIME = 2000

/**
 * First-visit intro: the haze, the lockup, the tagline, then the whole panel
 * wipes upward off the screen.
 *
 * The markup is server-rendered and the animation is pure CSS, so it starts on
 * the first paint rather than waiting for hydration — an intro that begins
 * late is worse than none. This component's only jobs are to mark the visit as
 * seen and to take the panel out of the DOM once it has played, so no fixed
 * element is left hanging over the page.
 *
 * Two guards keep it from ever trapping anyone: an inline script in the layout
 * hides it before paint on repeat visits within the session, and a <noscript>
 * rule hides it outright when scripts are off, since nothing would remove it.
 */
export function Intro() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      // Repeat visits within the session are hidden pre-paint by the layout's
      // inline guard; this is what tells it about the current one.
      seen = Boolean(sessionStorage.getItem('bnx-intro'))
      sessionStorage.setItem('bnx-intro', '1')
    } catch {
      // Private modes can throw on storage. The intro just plays every time.
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Both skip cases unmount on the next tick rather than synchronously: the
    // panel is already hidden by CSS in either, so there is nothing to see,
    // and routing every unmount through the timer keeps the state update out
    // of the effect body.
    const delay = seen || reduce ? 0 : LIFETIME
    if (delay) document.body.style.overflow = 'hidden'

    const timer = window.setTimeout(() => {
      document.body.style.overflow = ''
      setDone(true)
    }, delay)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  if (done) return null

  return (
    <div className={styles.intro} data-intro aria-hidden="true">
      <div className={styles.haze} />
      <div className={styles.scrim} />

      <div className={styles.lockup}>
        {/* Drawn 2.75rem tall at most, so roughly 254px wide. Same reason
            as the nav: unhinted, this preloads the 3840w candidate. */}
        <Image
          src={logo}
          alt=""
          priority
          sizes="(min-width: 48rem) 254px, 162px"
          className={styles.logo}
        />
        <p className={styles.tagline}>
          <span className={styles.taglineInner}>{brand.tagline}</span>
        </p>
      </div>
    </div>
  )
}
