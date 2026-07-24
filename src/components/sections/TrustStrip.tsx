import { recognitionMarks, reachStatement } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './TrustStrip.module.css'

/**
 * Thin credibility band, placed high. Recognition marks are rendered as
 * text lockups (real mark assets pending, plan open item #3).
 */
export function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Recognition and reach">
      <Reveal>
        <div className={`${styles.inner} container`}>
          <ul className={styles.marks}>
            {recognitionMarks.map((mark) => (
              <li key={mark.label} className={styles.mark} title={mark.full}>
                <abbr title={mark.full} className={styles.abbr}>
                  {mark.label}
                </abbr>
              </li>
            ))}
          </ul>
          <p className={styles.reach}>{reachStatement}</p>
        </div>
      </Reveal>
    </section>
  )
}
