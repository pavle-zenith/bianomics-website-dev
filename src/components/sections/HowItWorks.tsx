import type { StaticImageData } from 'next/image'
import { getContent } from '@/content/live'
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
export async function HowItWorks() {
  const { steps, howItWorks } = await getContent()
  return (
    <section
      id="how-it-works"
      className={`${styles.how} section`}
      aria-labelledby="how-heading"
    >
      <div className="container">
        {/* Header: the label in the margin, the intro to the right. With the
            long title cut, the label carries the heading role — the section
            still needs an accessible name, and it is the only thing left
            naming it. */}
        <div className={styles.head}>
          <h2 id="how-heading" className={styles.headLabel}>
            {howItWorks.label}
          </h2>
          <div className={styles.headMain}>
            <Reveal variant="mask">
              <p className={styles.headDesc}>{howItWorks.description}</p>
            </Reveal>
          </div>
        </div>

        <ProcessRows steps={steps} photos={photos} />
      </div>
    </section>
  )
}
