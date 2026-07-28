import Image from 'next/image'
import { opportunityLab } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import styles from './OpportunityLab.module.css'

// NOTE: stand-in image. Swap for a photo of funded Opportunity Lab work
// when one is available; only this import needs to change.
import labImage from '../../../public/about/team.png'

/**
 * Opportunity Lab — a full-width two-line title over a split band:
 * a dark content panel (60%) beside a flush image (40%). The two
 * halves share one row and one radius, reading as a single object.
 */
export function OpportunityLab() {
  const { ethos } = opportunityLab

  return (
    <section
      id="opportunity-lab"
      className="section"
      aria-labelledby="opportunity-heading"
    >
      <div className="container">
        <Reveal className={styles.intro}>
          <h2 id="opportunity-heading" className={styles.sectionHeading}>
            {opportunityLab.heading}
          </h2>
        </Reveal>

        <Reveal className={styles.split}>
          {/* 60% — dark content panel */}
          <div className={styles.content}>
            <div className={styles.contentTop}>
              <p className={styles.ethosEyebrow}>{ethos.eyebrow}</p>
              <p className={styles.statement}>{ethos.statement}</p>
            </div>

            <div className={styles.contentFoot}>
              <p className={styles.footEyebrow}>{ethos.footEyebrow}</p>
              <p className={styles.footText}>{ethos.footText}</p>
              <Button
                href={anchors.snapshot}
                event="cta_secondary_click"
                location="opportunity-lab"
                className={styles.cta}
              >
                {ethos.ctaLabel}
              </Button>
            </div>
          </div>

          {/* 40% — image */}
          <div className={styles.media}>
            <Image
              src={labImage}
              alt=""
              fill
              sizes="(min-width: 60rem) 40vw, 100vw"
              className={styles.mediaImage}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
