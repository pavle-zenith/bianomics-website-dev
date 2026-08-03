import type { StaticImageData } from 'next/image'
import type { Lab, LabId } from '@/content/types'
import { brand } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { WhatWeDoTrack } from './WhatWeDoTrack'
import styles from './WhatWeDo.module.css'

import visionTexture from '../../../public/labs/vision.png'
import stageTexture from '../../../public/labs/stage.png'
import blueprintTexture from '../../../public/labs/blueprint.png'
import groundworkTexture from '../../../public/labs/groundwork.png'

const textures: Record<LabId, StaticImageData> = {
  vision: visionTexture,
  stage: stageTexture,
  blueprint: blueprintTexture,
  groundwork: groundworkTexture,
}

/**
 * What We Do — the four practices as a horizontal, scroll-snapped track on a
 * dark canvas, with a progress bar and slide counter at the foot.
 */
export function WhatWeDo({ labs }: { labs: Lab[] }) {
  return (
    <section
      id="what-we-do"
      className={`${styles.what} section section-inverse`}
      aria-labelledby="what-heading"
      data-nav-tone="dark"
    >
      <div className={`${styles.head} container`}>
        <Reveal variant="mask">
          <h2 id="what-heading" className={styles.heading}>
            Four practices. One job.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className={styles.accent}>{brand.method}</p>
        </Reveal>
      </div>

      <WhatWeDoTrack labs={labs} textures={textures} />
    </section>
  )
}
