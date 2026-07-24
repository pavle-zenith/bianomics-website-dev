import type { CSSProperties } from 'react'
import { steps, brand } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './HowItWorks.module.css'

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section section-inverse"
      aria-labelledby="how-heading"
    >
      <div className="container">
        {/* Header: title left, description right. */}
        <Reveal className={styles.head}>
          <div className={styles.headLeft}>
            <span className={styles.eyebrowPill}>How it works</span>
            <h2 id="how-heading" className={styles.heading}>
              From a free read to work that holds
            </h2>
          </div>
          <div className={styles.headRight}>
            <p className={styles.headDesc}>
              Four plain steps, starting with a free Snapshot and ending with
              senior people building the work with you.
            </p>
            <p className={styles.framework}>{brand.framework}</p>
          </div>
        </Reveal>

        {/* Four vertical rectangle cards. */}
        <ol className={styles.grid}>
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 0.08}
              className={styles.card}
              distance={32}
            >
              <article
                className={styles.cardInner}
                style={
                  {
                    ['--step-fill' as string]: `var(--lab-${step.color}-fill)`,
                  } as CSSProperties
                }
              >
                <div className={styles.cardTop}>
                  <span className={styles.stepNum}>
                    {String(step.n).padStart(2, '0')}
                  </span>
                  <span className={styles.stepBar} aria-hidden="true" />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
