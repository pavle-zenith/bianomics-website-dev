'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { NavLink } from '@/content/types'
import { brand } from '@/content/site'
import { anchors, routes } from '@/lib/routes'
import { track } from '@/lib/analytics'
import logoLight from '../../../public/Horizontal_Original_Blue.png'
import logoDark from '../../../public/Horizontal_Monochrome_White.png'
import styles from './Nav.module.css'

/**
 * Floating nav over the page: the logo sits in its own shell on the left, the
 * links and CTA share one shell on the right. Both shells invert with the
 * canvas beneath them — light-on-dark over dark sections, dark-on-light over
 * white ones — so the chrome stays legible the whole way down.
 */
export function Nav({ links }: { links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [onDark, setOnDark] = useState(true)

  // Watch a 1px band at the nav's own line: whichever region crosses it
  // decides the tone. Cheaper and steadier than reading pixels on scroll.
  useEffect(() => {
    const regions = document.querySelectorAll<HTMLElement>('[data-nav-tone="dark"]')
    if (!regions.length) return

    let observer: IntersectionObserver | null = null
    const dark = new Set<Element>()

    const build = () => {
      observer?.disconnect()
      const line = 56 // roughly the vertical centre of the floating shells
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) dark.add(e.target)
            else dark.delete(e.target)
          }
          setOnDark(dark.size > 0)
        },
        { rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px` },
      )
      regions.forEach((r) => observer!.observe(r))
    }

    build()
    window.addEventListener('resize', build)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', build)
    }
  }, [])

  return (
    <header
      className={`${styles.header} ${onDark ? styles.onDark : styles.onLight}`}
    >
      <div className={`${styles.inner} container`}>
        {/* Below the desktop breakpoint this is the single glass shell that
            holds everything; above it, `display: contents` dissolves it and
            the logo and actions float as their own shells again. */}
        <div className={styles.shell}>
          {/* Two marks rather than one inverted: the full-colour lockup keeps
              its blue dot, which a filter would push to orange. Each is hidden
              from the accessibility tree with the tone that is not showing. */}
          {/* Absolute, not the bare anchor: the nav is on /snapshot too, where
              a lone hash would look for a #hero that is not on the page. */}
          <a
            href={`${routes.home}${anchors.hero}`}
            className={styles.logo}
            aria-label={`${brand.name} home`}
          >
            <Image
              src={logoLight}
              alt=""
              priority
              className={`${styles.logoImg} ${styles.logoOnLight}`}
            />
            <Image
              src={logoDark}
              alt=""
              priority
              className={`${styles.logoImg} ${styles.logoOnDark}`}
            />
          </a>

          <div className={styles.actions}>
            {/* Links and the CTA sit inside one floating shell. */}
            <div className={styles.group}>
              <nav className={styles.desktopNav} aria-label="Primary">
                <ul className={styles.links}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* The Snapshot is the only ask in the chrome: a general
                  "Contact" competed with it and won nothing. */}
              <a
                href={routes.snapshot}
                className={styles.cta}
                onClick={() => track('cta_primary_click', { location: 'nav' })}
              >
                Book a Snapshot
              </a>
            </div>
            <button
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="visually-hidden">
                {menuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <span className={styles.menuBar} data-open={menuOpen} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        /* The panel floats on the same inset as the shell so the two read as
           one piece of chrome rather than a bar with a drawer under it. */
        <div className={`${styles.mobileNavWrap} container`}>
          <nav id="mobile-menu" className={styles.mobileNav} aria-label="Primary mobile">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={routes.snapshot}
                  className={styles.mobileCta}
                  onClick={() => {
                    track('cta_primary_click', { location: 'nav' })
                    setMenuOpen(false)
                  }}
                >
                  Book a Snapshot
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
