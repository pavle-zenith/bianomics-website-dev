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
 * Opportunity Lab — a three-panel bento: the story on the left, a tall
 * image through the middle, and who the work is for (plus the way in)
 * on the right. Collapses to a single column below 60rem.
 */
export function OpportunityLab() {
  return (
    <section
      id="opportunity-lab"
      className="section"
      aria-labelledby="opportunity-heading"
    >
      <div className="container">
        <Reveal className={styles.intro}>
          <p className="eyebrow">{opportunityLab.eyebrow}</p>
          <h2 id="opportunity-heading" className={styles.sectionHeading}>
            {opportunityLab.heading}
          </h2>
        </Reveal>

        <div className={styles.bento}>
          {/* Left: the story */}
          <Reveal className={styles.panel}>
            <span className={styles.dot} aria-hidden="true" />
            <div className={styles.panelBody}>
              <h3 className={styles.name}>{opportunityLab.name}</h3>
              <p className={styles.text}>{opportunityLab.description}</p>
            </div>
          </Reveal>

          {/* Center: image */}
          <Reveal className={styles.media} delay={0.06}>
            <Image
              src={labImage}
              alt=""
              fill
              sizes="(min-width: 60rem) 45vw, 100vw"
              className={styles.mediaImage}
            />
            <span className={styles.mediaCaption}>{opportunityLab.imageCaption}</span>
          </Reveal>

          {/* Right: who it's for + the way in */}
          <Reveal className={styles.panel} delay={0.12}>
            <span className={styles.mark} aria-hidden="true" />
            <div className={styles.panelBody}>
              <p className={styles.missionEyebrow}>{opportunityLab.mission.eyebrow}</p>
              <h3 className={styles.missionHeading}>{opportunityLab.mission.heading}</h3>
              <p className={styles.text}>{opportunityLab.mission.description}</p>
              <Button
                href={anchors.snapshot}
                variant="secondary"
                event="cta_secondary_click"
                location="opportunity-lab"
                className={styles.cta}
              >
                {opportunityLab.mission.ctaLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
