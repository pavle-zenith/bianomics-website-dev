import { founder } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Founder.module.css'

/**
 * Founder section. Portrait and a personal note/clip are pending real
 * content (plan open item #4); the portrait slot renders a labeled
 * placeholder until then.
 */
export function Founder() {
  return (
    <section id="founder" className="section" aria-labelledby="founder-heading">
      <div className="container">
        <div className={styles.grid}>
          <Reveal className={styles.portraitWrap}>
            {/* Portrait slot — swap for <Image> when the photo lands. */}
            <div className={styles.portrait} role="img" aria-label={`${founder.name}, ${founder.role}`}>
              <span className={styles.portraitInitials} aria-hidden="true">
                BC
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className={styles.body}>
            <p className="eyebrow">The founder</p>
            <h2 id="founder-heading" className={styles.heading}>
              {founder.name}
            </h2>
            <p className={styles.role}>{founder.role}</p>
            <p className={styles.promise}>{founder.promise}</p>
            {founder.note ? <p className={styles.note}>{founder.note}</p> : null}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
