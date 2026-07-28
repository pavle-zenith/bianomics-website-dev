import { snapshot, brand } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { SnapshotForm } from '@/components/form/SnapshotForm'
import styles from './Snapshot.module.css'

export function Snapshot() {
  return (
    <section
      id="snapshot"
      className={`${styles.snapshot} section section-tinted`}
      aria-labelledby="snapshot-heading"
    >
      <div className="container">
        <div className={styles.grid}>
          {/* Left: the offer explainer. */}
          <Reveal className={styles.explainer}>
            <h2 id="snapshot-heading" className={styles.heading}>
              A free, senior read of where you stand
            </h2>
            <p className={styles.intro}>{snapshot.intro}</p>

            <ul className={styles.points}>
              <li className={styles.point}>
                <span className={styles.pointMark} aria-hidden="true" />
                It is complimentary, with no obligation to go further.
              </li>
              <li className={styles.point}>
                <span className={styles.pointMark} aria-hidden="true" />
                Our senior team does the read, not a junior.
              </li>
              <li className={styles.point}>
                <span className={styles.pointMark} aria-hidden="true" />
                Every submission is reviewed personally.
              </li>
            </ul>

            <p className={styles.tagline}>{brand.tagline}</p>
          </Reveal>

          {/* Right: the actual application form. */}
          <Reveal delay={0.1} className={styles.formCard}>
            <SnapshotForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
