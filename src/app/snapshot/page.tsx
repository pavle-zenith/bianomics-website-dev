import type { Metadata } from 'next'
import { getNav } from '@/content'
import { snapshotPage } from '@/content/snapshotPage'
import { brand } from '@/content/site'
import { anchors, routes } from '@/lib/routes'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SnapshotForm } from '@/components/form/SnapshotForm'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { CoverIcon } from './CoverIcons'
import styles from './snapshot.module.css'

const description =
  'A complimentary senior read of your communications and brand position. What is working, what is not, and what we would do about it. Yours to keep either way.'

export const metadata: Metadata = {
  title: 'Book a Snapshot',
  description,
  alternates: { canonical: routes.snapshot },
  openGraph: {
    type: 'website',
    url: routes.snapshot,
    siteName: brand.name,
    title: `Book a Snapshot: ${brand.name}`,
    description,
  },
}

/**
 * /snapshot — the standalone application page. The landing page's Snapshot
 * block is a two-column explainer beside the form; this one centres the whole
 * thing on the haze so the form is the only thing on screen, then answers the
 * questions people have before they send one in.
 */
export default function SnapshotPage() {
  const nav = getNav()
  const { eyebrow, headingLead, headingRest, intro, assurances, cover, faq, closing } =
    snapshotPage

  return (
    <>
      <Nav links={nav} />
      <main id="main">
        {/* --- Centred hero on the haze, form inline beneath it --- */}
        <section className={`${styles.hero} bed bed-haze`} aria-labelledby="snapshot-heading">
          <div className={styles.heroScrim} aria-hidden="true" />
          <div className={`${styles.heroDots} bed bed-halftone`} aria-hidden="true" />

          <div className={`${styles.heroInner} container`}>
            <Reveal className={styles.heroCopy}>
              <p className={styles.eyebrow}>{eyebrow}</p>

              <h1 id="snapshot-heading" className={styles.heading}>
                {headingLead}{' '}
                <span className={styles.headingRest}>{headingRest}</span>
              </h1>

              <p className={styles.intro}>{intro}</p>

              <ul className={styles.assurances}>
                {assurances.map((line) => (
                  <li key={line} className={styles.assurance}>
                    <Check />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* The form is the page. Everything below it is a follow-up. */}
            <Reveal delay={0.12} className={styles.formCard}>
              <SnapshotForm />
            </Reveal>
          </div>
        </section>

        {/* --- What the read covers --- */}
        <section className="section section-tinted" aria-labelledby="cover-heading">
          <div className="container">
            <Reveal className={styles.coverHead}>
              <h2 id="cover-heading" className={styles.coverHeading}>
                {cover.heading}
              </h2>
              <p className={styles.coverIntro}>{cover.intro}</p>
            </Reveal>

            <ul className={styles.coverGrid}>
              {cover.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.id}
                  delay={(i % 3) * 0.06}
                  className={styles.coverItem}
                >
                  <div className={styles.coverTop}>
                    <span className={styles.coverIcon}>
                      <CoverIcon name={item.id} />
                    </span>
                    <p className={styles.coverIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <h3 className={styles.coverTitle}>{item.title}</h3>
                  <p className={styles.coverBody}>{item.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* --- FAQ: intro left, accordion right, matching the landing page --- */}
        <section className="section" aria-labelledby="snapshot-faq-heading">
          <div className="container">
            <div className={styles.faqGrid}>
              <Reveal className={styles.faqIntro}>
                <h2 id="snapshot-faq-heading" className={styles.faqHeading}>
                  {faq.heading}
                </h2>
                <p className={styles.faqText}>{faq.intro}</p>
                <div className={styles.faqActions}>
                  <Button
                    href={`${routes.snapshot}#top`}
                    variant="primary"
                    event="cta_primary_click"
                    location="snapshot-page-faq"
                  >
                    Apply now
                  </Button>
                  <Button
                    href={`/${anchors.faq}`}
                    variant="secondary"
                    event="cta_secondary_click"
                    location="snapshot-page-faq"
                  >
                    More questions
                  </Button>
                </div>
              </Reveal>

              <div className={styles.faqList}>
                {faq.items.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.05}>
                    <details className={`${styles.faqItem} disclosure`}>
                      <summary className={styles.faqQuestion}>
                        <span>{item.question}</span>
                        <span className={styles.faqIcon} aria-hidden="true" />
                      </summary>
                      <p className={styles.faqAnswer}>{item.answer}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Closing band. The landing page's treatment, shared rather than
            rebuilt: the two pages end on the same image and the same pair of
            actions. The primary points at this page's own form, and the
            secondary needs the leading slash to leave /snapshot. --- */}
        <ClosingCta
          heading={closing.heading}
          body={closing.body}
          primaryHref={`${routes.snapshot}#top`}
          secondaryHref={`/${anchors.whatWeDo}`}
          location="snapshot-page-closing"
          headingId="snapshot-closing-heading"
        />
      </main>
      <Footer links={nav} />
    </>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M3 8.5 6.2 11.5 13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
