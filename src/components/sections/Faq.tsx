import type { FaqItem } from '@/content/types'
import { faqIntro } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Faq.module.css'

/**
 * FAQ: intro text on the left, a card-style accordion on the right.
 * Uses native <details>/<summary> — accessible, keyboard-friendly, no JS.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className={`${styles.faq} section`} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.grid}>
          {/* Left: intro */}
          <Reveal className={styles.intro}>
            <p className="eyebrow">{faqIntro.eyebrow}</p>
            <h2 id="faq-heading" className={styles.heading}>
              {faqIntro.heading}
            </h2>
            <p className={styles.description}>{faqIntro.description}</p>
          </Reveal>

          {/* Right: accordion */}
          <div className={styles.list}>
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <details className={styles.item}>
                  <summary className={styles.question}>
                    <span className={styles.questionText}>{item.question}</span>
                    <span className={styles.toggle} aria-hidden="true">
                      <span className={styles.icon} />
                    </span>
                  </summary>
                  <p className={styles.answer}>{item.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
