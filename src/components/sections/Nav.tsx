'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { NavLink } from '@/content/types'
import { brand } from '@/content/site'
import { anchors } from '@/lib/routes'
import { track } from '@/lib/analytics'
import logo from '../../../public/Horizontal_Monochrome_White.png'
import styles from './Nav.module.css'

/**
 * Transparent nav layered over the hero: logo left, centered link cluster
 * (with dropdown carets), a pill CTA on the right. Turns solid + condenses
 * once the user scrolls past the hero. Logo mark is a placeholder star
 * until the official logo files land (plan open item #3).
 */
export function Nav({ links }: { links: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>
        <a href={anchors.hero} className={styles.logo} aria-label={`${brand.name} home`}>
          <Image src={logo} alt="" priority className={styles.logoImg} />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                  {link.hasDropdown ? (
                    <svg
                      className={styles.caret}
                      viewBox="0 0 12 12"
                      width="11"
                      height="11"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href={anchors.snapshot}
            className={styles.cta}
            onClick={() => track('cta_primary_click', { location: 'nav' })}
          >
            Contact Us
          </a>
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

      {menuOpen ? (
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
                href={anchors.snapshot}
                className={styles.mobileCta}
                onClick={() => {
                  track('cta_primary_click', { location: 'nav' })
                  setMenuOpen(false)
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
