import { steps, brand } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { ProcessPath } from './ProcessPath'
import styles from './HowItWorks.module.css'

/**
 * How it works — an inverted section. A brand-colored path winds down the
 * middle and fills as you scroll, with the four steps set alternately to
 * either side of it.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className={`${styles.how} section section-inverse`}
      aria-labelledby="how-heading"
    >
      <div className="container">
        {/* Header: title left, description right. */}
        <Reveal className={styles.head}>
          <div className={styles.headLeft}>
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

        {/* The path, with the steps laid alongside it. */}
        <div className={styles.track}>
          <ProcessPath steps={steps} />

          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.n} className={styles.step}>
                <Reveal className={styles.stepInner} distance={32}>
                  <span className={styles.stepNum}>
                    {String(step.n).padStart(2, '0')}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
