import type { StaticImageData } from 'next/image'
import type { LabColorKey } from '@/content/types'
import { steps, howItWorks } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { ProcessRows } from './ProcessRows'
import styles from './HowItWorks.module.css'

import visionTexture from '../../../public/labs/vision.png'
import stageTexture from '../../../public/labs/stage.png'
import blueprintTexture from '../../../public/labs/blueprint.png'
import groundworkTexture from '../../../public/labs/groundwork.png'

/** Each step already carries a lab colour, so the textures map straight over. */
const textures: Record<LabColorKey, StaticImageData> = {
  vision: visionTexture,
  stage: stageTexture,
  blueprint: blueprintTexture,
  groundwork: groundworkTexture,
}

/**
 * How it works — an inverted section. The steps are hairline-divided rows on
 * the left, with a preview on the right that follows the cursor while it is
 * inside the section, and a progress rail down the margin.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`${styles.how} section section-inverse`}
      aria-labelledby="how-heading"
      data-nav-tone="dark"
    >
      <div className="container">
        {/* Header: label in the margin, title and description to the right. */}
        <div className={styles.head}>
          <p className={styles.headLabel}>Our process</p>
          <div className={styles.headMain}>
            <Reveal variant="mask">
              <h2 id="how-heading" className={styles.heading}>
                {howItWorks.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.12} className={styles.headRow}>
              <p className={styles.headDesc}>{howItWorks.description}</p>
              <p className={styles.framework}>{howItWorks.floatingLine}</p>
            </Reveal>
          </div>
        </div>

        <ProcessRows steps={steps} textures={textures} />
      </div>
    </section>
  )
}
