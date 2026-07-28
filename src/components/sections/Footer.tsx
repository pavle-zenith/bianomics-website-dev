import Image from 'next/image'
import type { NavLink } from '@/content/types'
import { brand, contact } from '@/content/site'
import { anchors } from '@/lib/routes'
import { AntiAgencyBadge } from '@/components/ui/AntiAgencyBadge'
import logo from '../../../public/Horizontal_Monochrome_White.png'
import styles from './Footer.module.css'

export function Footer({ links }: { links: NavLink[] }) {
  const year = 2026

  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="visually-hidden">
        Footer
      </h2>
      <div className={`${styles.top} container`}>
        <div className={styles.brandCol}>
          <a href={anchors.hero} className={styles.logo} aria-label={`${brand.name} home`}>
            <Image src={logo} alt="" className={styles.logoImg} />
          </a>
          <p className={styles.tagline}>{brand.tagline}</p>
          <AntiAgencyBadge tone="inverse" />
        </div>

        <nav className={styles.navCol} aria-label="Footer">
          <p className={styles.colHead}>Explore</p>
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

        <div className={styles.navCol}>
          <p className={styles.colHead}>Connect</p>
          <ul className={styles.list}>
            <li>
              <a href={contact.linkedinUrl} className={styles.link} rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.youtubeUrl} className={styles.link} rel="noopener noreferrer" target="_blank">
                YouTube
              </a>
            </li>
            <li>
              <a href={contact.academyUrl} className={styles.link} rel="noopener noreferrer" target="_blank">
                Workforce Academy
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.navCol}>
          <p className={styles.colHead}>Reach us</p>
          <ul className={styles.list}>
            <li>
              <a href={contact.phoneHref} className={styles.link}>
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className={styles.link}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${styles.bottom} container`}>
        <p className={styles.legal}>
          &copy; {year} {brand.name}. All rights reserved.
        </p>
        <ul className={styles.legalLinks}>
          <li>
            <a href="/privacy" className={styles.link}>
              Privacy
            </a>
          </li>
          <li>
            <a href="/terms" className={styles.link}>
              Terms
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
