import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { ResultsContent } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { ResultsCta } from './ResultsCta'
import styles from './Results.module.css'

import case1 from '../../../public/results/case-1.png'
import case2 from '../../../public/results/case-2.png'
import case3 from '../../../public/results/case-3.png'

const textures: Record<string, StaticImageData> = {
  'case-1': case1,
  'case-2': case2,
  'case-3': case3,
}

/**
 * Results — up to three case studies, each a left texture panel (client logo
 * + title + intro) paired with a right stat panel colored by the driving
 * service, ending in the Snapshot CTA. Renders a placeholder if empty.
 */
export function Results({ results }: { results: ResultsContent }) {
  const { caseStudies } = results

  return (
    <section id="results" className="section" aria-labelledby="results-heading">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Results</p>
          <h2 id="results-heading" className={styles.heading}>
            Featured projects
          </h2>
        </Reveal>

        {caseStudies.length === 0 ? (
          <Reveal>
            <div className={styles.placeholder}>
              <p className={styles.placeholderText}>
                We are adding client stories here. Ask for a reference when you
                book your Snapshot and we will connect you with someone we have
                worked with.
              </p>
            </div>
          </Reveal>
        ) : (
          <ul className={styles.list}>
            {caseStudies.map((cs, i) => (
              <Reveal as="li" key={cs.id} delay={i * 0.06} className={styles.pair}>
                {/* Left: texture panel */}
                <div className={styles.left}>
                  <Image
                    src={textures[cs.texture] ?? case1}
                    alt=""
                    fill
                    sizes="(min-width: 60rem) 66vw, 100vw"
                    className={styles.leftBg}
                  />
                  <div className={styles.leftScrim} aria-hidden="true" />
                  <p className={styles.client}>{cs.client}</p>
                  <div className={styles.leftBody}>
                    <h3 className={styles.title}>{cs.title}</h3>
                    <p className={styles.intro}>{cs.intro}</p>
                  </div>
                </div>

                {/* Right: service-colored stat panel */}
                <div
                  className={styles.right}
                  style={
                    {
                      ['--case-fill' as string]: `var(--lab-${cs.color}-fill)`,
                    } as CSSProperties
                  }
                >
                  <ul className={styles.metrics}>
                    {cs.metrics.map((m) => (
                      <li key={m.label} className={styles.metric}>
                        <span className={styles.metricValue}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </li>
                    ))}
                  </ul>
                  <ResultsCta />
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
