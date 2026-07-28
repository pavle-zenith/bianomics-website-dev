import Image from 'next/image'
import type { NavLink } from '@/content/types'
import { brand, contact } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import logo from '../../../public/Horizontal_Monochrome_White.png'
import styles from './Footer.module.css'

/**
 * Footer: a two-tone headline and CTA on the left, link columns on the
 * right, and the wordmark oversized across the bottom edge.
 */
export function Footer({ links }: { links: NavLink[] }) {
  const year = 2026

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="visually-hidden">
        Footer
      </h2>

      <div className={`${styles.inner} container`}>
        {/* Left: headline + CTA */}
        <div className={styles.lead}>
          <p className={styles.headline}>
            <span className={styles.headlineLead}>{contact.invitationLead}</span>{' '}
            <span className={styles.headlineRest}>{contact.invitationRest}</span>
          </p>

          <Button
            href={anchors.snapshot}
            event="cta_secondary_click"
            location="footer"
            className={styles.cta}
          >
            Book a Snapshot
          </Button>
        </div>

        {/* Right: link columns, two per row */}
        <div className={styles.cols}>
          <div className={styles.col}>
            <p className={styles.colHead}>Connect</p>
            <ul className={styles.inlineList}>
              <li>
                <a
                  href={contact.linkedinUrl}
                  className={styles.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={contact.youtubeUrl}
                  className={styles.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <p className={styles.colHead}>Reach us</p>
            <ul className={styles.list}>
              <li>
                <a href={contact.emailHref} className={styles.link}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className={styles.link}>
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <p className={styles.colHead}>Company</p>
            <ul className={styles.list}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colHead}>Utility</p>
            <ul className={styles.list}>
              <li>
                <a href="/privacy" className={styles.navLink}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className={styles.navLink}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href={contact.academyUrl} className={styles.navLink} rel="noopener noreferrer" target="_blank">
                  Workforce Academy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className={`${styles.legal} container`}>
        &copy; {year} {brand.name}. All rights reserved.
      </p>

      {/* The brand lockup, set full-width across the foot of the page. The
          asset is white-on-transparent, so it sits directly on the canvas. */}
      <div className={`${styles.wordmarkWrap} container`}>
        <Image
          src={logo}
          alt={brand.name}
          className={styles.wordmark}
          sizes="100vw"
          priority={false}
        />
      </div>
    </footer>
  )
}
