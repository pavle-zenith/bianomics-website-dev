import Image from 'next/image'
import type { NavLink } from '@/content/types'
import { brand } from '@/content/site'
import { getContent } from '@/content/live'
import { anchors, routes } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { CookieSettingsButton } from '@/components/ui/CookieSettingsButton'
import logo from '../../../public/Horizontal_Monochrome_White.png'
import styles from './Footer.module.css'

/**
 * Footer: a full-bleed texture carrying the closing statement and CTA on the
 * left, the link columns on the right, and the wordmark oversized across the
 * bottom edge. It takes the same dark grain as the projects section, so the
 * two dark bands read as one material.
 */
export async function Footer({
  links,
  /* Defaults to the standalone page because the footer also renders on the
     legal pages and the 404, where an in-page #snapshot would resolve to
     nothing. The landing page and /snapshot pass their own in-page target. */
  ctaHref = routes.snapshot,
}: {
  links: NavLink[]
  ctaHref?: string
}) {
  const { contact } = await getContent()
  const year = 2026

  return (
    <footer
      className={`${styles.footer} tone-dark bed bed-dark`}
      aria-labelledby="footer-heading"
      data-nav-tone="dark"
    >
      <h2 id="footer-heading" className="visually-hidden">
        Footer
      </h2>

      {/* Scrim over the grain bed, behind everything. */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.scrim} />
      </div>

      <div className={`${styles.inner} container`}>
        {/* Left: statement + CTA pair */}
        <div className={styles.lead}>
          <p className={styles.headline}>
            {contact.invitationLead} {contact.invitationRest}
          </p>

          <Button
            href={ctaHref}
            variant="primary"
            event="cta_secondary_click"
            location="footer"
            arrow
          >
            Book a Snapshot
          </Button>
        </div>

        {/* Right: link columns, each opened by a hairline */}
        <div className={styles.cols}>
          <nav className={styles.col} aria-label="Footer">
            <p className={styles.colHead}>Navigate</p>
            <ul className={styles.list}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colHead}>Connect</p>
            <ul className={styles.list}>
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
              <li>
                <a href={contact.emailHref} className={styles.link}>
                  Email
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className={styles.link}>
                  Call
                </a>
              </li>
            </ul>
          </div>

          <a href={anchors.hero} className={styles.toTop} aria-label="Back to top">
            <Arrow up />
          </a>
        </div>
      </div>

      {/* The foot: lockup on the left, legal line on the right, both on the
          same baseline. The asset is white-on-transparent, so it sits
          directly on the texture. */}
      <div className={`${styles.foot} container`}>
        <Image
          src={logo}
          alt={brand.name}
          className={styles.wordmark}
          sizes="(min-width: 48rem) 14rem, 40vw"
          priority={false}
        />

        <div className={styles.legal}>
          <p>
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <ul className={styles.legalLinks}>
            <li>
              <a href={routes.privacy} className={styles.link}>
                Privacy
              </a>
            </li>
            <li>
              <a href={routes.terms} className={styles.link}>
                Terms
              </a>
            </li>
            <li>
              <CookieSettingsButton className={styles.link} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d={up ? 'M8 13V3M3.5 7.5 8 3l4.5 4.5' : 'M3 8h10M8.5 3.5 13 8l-4.5 4.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
