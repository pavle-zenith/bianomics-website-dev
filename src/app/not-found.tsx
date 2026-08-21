import type { Metadata } from 'next'
import { getNav } from '@/content'
import { anchors, routes } from '@/lib/routes'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist. Here is the way back.',
  robots: { index: false, follow: true },
}

/**
 * 404. Carries the site's own chrome rather than a bare message, so a
 * mistyped URL still lands somewhere that looks like the company, with the
 * nav and footer available to get out of.
 */
export default function NotFound() {
  const nav = getNav()

  return (
    <>
      <Nav links={nav} />
      <main id="main">
        <section className={`${styles.wrap} section bed bed-haze`} aria-labelledby="nf-heading">
          <div className={styles.scrim} aria-hidden="true" />

          <Reveal className={`${styles.inner} container`}>
            <p className={styles.code}>404</p>

            <h1 id="nf-heading" className={styles.heading}>
              That page has moved on without us.
            </h1>

            <p className={styles.body}>
              The link is broken or the page no longer exists. Nothing you did.
              Start again from the top, or take the shortcut and tell us where
              you stand.
            </p>

            <div className={styles.actions}>
              <Button
                href={routes.snapshot}
                variant="primary"
                event="cta_primary_click"
                location="not-found"
                arrow
              >
                Book a Snapshot
              </Button>
              <Button
                href={routes.home}
                variant="secondary"
                event="cta_secondary_click"
                location="not-found"
              >
                Back to the homepage
              </Button>
            </div>

            <ul className={styles.links}>
              {[
                { label: 'What we do', href: `/${anchors.whatWeDo}` },
                { label: 'Our process', href: `/${anchors.howItWorks}` },
                { label: 'Featured projects', href: `/${anchors.results}` },
                { label: 'Questions', href: `/${anchors.faq}` },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </main>
      <Footer links={nav} />
    </>
  )
}
