import type { StaticImageData } from 'next/image'
import { steps, howItWorks } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { ProcessRows } from './ProcessRows'
import styles from './HowItWorks.module.css'

import snapshot from '../../../public/process/snapshot.webp'
import story from '../../../public/process/story.webp'
import plan from '../../../public/process/plan.webp'
import build from '../../../public/process/build.webp'

/** One frame per step, in step order. */
const photos: StaticImageData[] = [snapshot, story, plan, build]

/**
 * How it works — the steps as hairline-divided rows on a light canvas, with a
 * progress rail down the margin that runs through the four practice colours in
 * the order the steps take them.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`${styles.how} section`}
      aria-labelledby="how-heading"
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

        <ProcessRows steps={steps} photos={photos} />
      </div>
    </section>
  )
}
