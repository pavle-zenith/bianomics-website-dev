import type { StaticImageData } from 'next/image'
import type { Lab, LabId } from '@/content/types'
import { brand } from '@/content/site'
import { WhatWeDoTrack } from './WhatWeDoTrack'
import styles from './WhatWeDo.module.css'

import visionTexture from '../../../public/labs/visionlab.webp'
import stageTexture from '../../../public/labs/stage.webp'
import blueprintTexture from '../../../public/labs/blueprint.webp'
import groundworkTexture from '../../../public/labs/groundwork.webp'

const textures: Record<LabId, StaticImageData> = {
  vision: visionTexture,
  stage: stageTexture,
  blueprint: blueprintTexture,
  groundwork: groundworkTexture,
}

/**
 * What We Do — the four practices as a looping carousel on a light canvas,
 * each slide a saturated card in that practice's colour.
 *
 * The heading is passed down rather than rendered here because the carousel's
 * arrows sit on its top line, and the arrows need the carousel's state.
 */
export function WhatWeDo({ labs }: { labs: Lab[] }) {
  return (
    <section
      id="what-we-do"
      className={`${styles.what} section section-tinted`}
      aria-labelledby="what-heading"
    >
      <div className={`${styles.headDots} bed bed-halftone`} aria-hidden="true" />

      <WhatWeDoTrack
        labs={labs}
        textures={textures}
        heading="Four practices. One job."
        accent={brand.method}
      />
    </section>
  )
}
