import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { Lab, LabId } from '@/content/types'
import { brand } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
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

export function WhatWeDo({ labs }: { labs: Lab[] }) {
  return (
    <section id="what-we-do" className="section" aria-labelledby="what-heading">
      <div className="container">
        <Reveal>
          <h2 id="what-heading" className={styles.heading}>
            Four practices, built to work as one team
          </h2>
          {/* The one quiet philosophy accent line. */}
          <p className={styles.accent}>{brand.method}</p>
        </Reveal>
      </div>

      {/* Sticky-stack: each card sticks near the top and the next slides
          over it as the user scrolls. */}
      <ol className={`${styles.stack} container`}>
        {labs.map((lab, i) => (
          <li
            key={lab.id}
            className={styles.stackItem}
            style={{ ['--stack-index' as string]: String(i) } as CSSProperties}
          >
            <article className={styles.card}>
              <Image
                src={textures[lab.id]}
                alt=""
                fill
                sizes="(min-width: 60rem) 1216px, 100vw"
                className={styles.cardBg}
              />
              <div className={styles.cardScrim} aria-hidden="true" />

              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.mode}>{lab.mode}</span>
                </div>

                <div className={styles.cardMain}>
                  <h3 className={styles.labName}>
                    <LabName name={lab.name} />
                  </h3>
                  <p className={styles.labDesc}>{lab.description}</p>

                  <ul className={styles.pills}>
                    {lab.subservices.map((s) => (
                      <li key={s} className={styles.pill}>
                        <span className={styles.pillDot} aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

/**
 * Renders a lab name with the trademark sign as a styled superscript
 * (the raw ™ glyph at display sizes reads as literal "TM" letters).
 */
function LabName({ name }: { name: string }) {
  if (!name.endsWith('™')) return <>{name}</>
  return (
    <>
      {name.slice(0, -1)}
      <sup className={styles.tm}>™</sup>
    </>
  )
}
