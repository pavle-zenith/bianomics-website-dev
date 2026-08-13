import Image from 'next/image'
import { opportunityLab } from '@/content/site'
import { routes } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import styles from './OpportunityLab.module.css'

// NOTE: stand-in image. Swap for a photo of funded Opportunity Lab work
// when one is available; only this import needs to change.
import labImage from '../../../public/about/team.png'

/**
 * Opportunity Lab — a full-width two-line title over a tight bento: the
 * photograph holds the left column full height, the ethos sits in a white
 * panel top right, and the way in gets a panel of its own beneath it.
 *
 * The gaps are the design. They run in the arm's own Gooseberry, so the three
 * cells read as tiles on a coloured field rather than as one split band.
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

        <Reveal className={styles.bento}>
          {/* Left column, full height of the bento. */}
          <div className={styles.media}>
            <Image
              src={labImage}
              alt=""
              fill
              sizes="(min-width: 60rem) 45vw, 100vw"
              className={styles.mediaImage}
            />
          </div>

          {/* The ethos. */}
          <div className={styles.panel}>
            <p className={styles.ethosEyebrow}>{ethos.eyebrow}</p>
            <p className={styles.statement}>{ethos.statement}</p>
          </div>

          {/* The way in, in its own tile. */}
          <div className={`${styles.panel} ${styles.ctaPanel}`}>
            <div className={styles.ctaCopy}>
              <p className={styles.footEyebrow}>{ethos.footEyebrow}</p>
              <p className={styles.footText}>{ethos.footText}</p>
            </div>
            <Button
              href={routes.snapshot}
              event="cta_secondary_click"
              location="opportunity-lab"
              className={styles.cta}
            >
              {ethos.ctaLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
