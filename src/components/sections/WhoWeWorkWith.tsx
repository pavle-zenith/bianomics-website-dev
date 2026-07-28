import Image, { type StaticImageData } from 'next/image'
import { fitSituations } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './WhoWeWorkWith.module.css'

import founders from '../../../public/serve/founders.webp'
import peopleLeaders from '../../../public/serve/people-leaders.webp'
import operators from '../../../public/serve/operators.webp'

const photos: Record<string, StaticImageData> = {
  founders,
  'people-leaders': peopleLeaders,
  operators,
}

/**
 * Who we serve — tall photo cards, one per role, with the copy set over a
 * gradient at the foot of each image.
 */
export function WhoWeWorkWith() {
  return (
    <section
      id="who-we-work-with"
      className="section"
      aria-labelledby="who-heading"
    >
      <div className="container">
        <Reveal>
          <h2 id="who-heading" className={styles.heading}>
            Different roles. Same team.
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {fitSituations.map((fit, i) => (
            <Reveal
              as="li"
              key={fit.id}
              delay={i * 0.08}
              className={styles.card}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFill}>
                  <Image
                    src={photos[fit.photo] ?? founders}
                    alt=""
                    fill
                    sizes="(min-width: 52rem) 33vw, 100vw"
                    className={styles.photo}
                  />
                </div>
                <div className={styles.scrim} aria-hidden="true" />

                <div className={styles.caption}>
                  <p className={styles.lead}>{fit.lead}</p>
                  <h3 className={styles.cardTitle}>{fit.title}</h3>
                  <p className={styles.cardText}>{fit.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
