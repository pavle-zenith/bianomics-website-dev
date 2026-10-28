import Image from 'next/image'
import { getContent } from '@/content/live'
import { Reveal } from '@/components/ui/Reveal'
import portrait from '../../../public/team/bianca.jpg'
import styles from './Founder.module.css'

/**
 * Founder card: portrait on the left with the attribution on glass at its
 * foot, a word from the founder on the right.
 */
export async function Founder() {
  const { founder } = await getContent()
  return (
    <section id="founder" className="section" aria-labelledby="founder-heading">
      <div className="container">
        <Reveal className={styles.card}>
          <div className={styles.portrait}>
            <Image
              src={portrait}
              alt={`${founder.name}, ${founder.role}`}
              fill
              sizes="(min-width: 52rem) 24rem, 100vw"
              placeholder="blur"
              className={styles.portraitImg}
            />

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
