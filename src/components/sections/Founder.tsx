import { founder } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Founder.module.css'

/**
 * Founder card: portrait on the left with the attribution on glass at its
 * foot, a word from the founder on the right. The portrait is a labeled
 * placeholder until the real photograph lands (plan open item #4).
 */
export function Founder() {
  return (
    <section id="founder" className="section" aria-labelledby="founder-heading">
      <div className="container">
        <Reveal className={styles.card}>
          {/* Portrait slot — swap for <Image> when the photo lands. */}
          <div className={styles.portrait}>
            <span className={styles.portraitInitials} aria-hidden="true">
              BC
            </span>

            {/* Attribution rides inside the frame, on glass. */}
            <div className={styles.attribution}>
              <p className={styles.name}>{founder.name}</p>
              <p className={styles.role}>{founder.role}</p>
            </div>
          </div>

          <div className={styles.body}>
            <h2 id="founder-heading" className={styles.heading}>
              A word from our founder
            </h2>

            {/* Quote and note sit at the foot of the panel. */}
            <div className={styles.bodyFoot}>
              <blockquote className={styles.quote}>
                &ldquo;{founder.promise}&rdquo;
              </blockquote>

              <div className={styles.note}>
                {founder.note.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
