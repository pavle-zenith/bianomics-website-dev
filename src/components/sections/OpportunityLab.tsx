import { opportunityLab } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './OpportunityLab.module.css'

export function OpportunityLab() {
  return (
    <section
      id="opportunity-lab"
      className="section"
      aria-labelledby="opportunity-heading"
    >
      <div className="container">
        <Reveal className={styles.card}>
          <span className={styles.dot} aria-hidden="true" />
          <div className={styles.body}>
            <p className="eyebrow">The nonprofit arm</p>
            <h2 id="opportunity-heading" className={styles.heading}>
              {opportunityLab.name}
            </h2>
            <p className={styles.text}>{opportunityLab.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
