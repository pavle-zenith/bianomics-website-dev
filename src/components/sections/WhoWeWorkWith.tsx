import { fitSituations } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './WhoWeWorkWith.module.css'

export function WhoWeWorkWith() {
  return (
    <section
      id="who-we-work-with"
      className="section"
      aria-labelledby="who-heading"
    >
      <div className="container">
        <Reveal>
          <p className="eyebrow">Who we work with</p>
          <h2 id="who-heading" className={styles.heading}>
            You might recognize yourself here
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {fitSituations.map((fit, i) => (
            <Reveal as="li" key={fit.id} delay={i * 0.08} className={styles.card}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>{fit.title}</h3>
              <p className={styles.cardBody}>{fit.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
