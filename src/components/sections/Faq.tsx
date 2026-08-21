import type { FaqItem } from '@/content/types'
import { faqIntro } from '@/content/site'
import { routes } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Faq.module.css'

/**
 * FAQ: intro and a support prompt on the left, a hairline-divided
 * accordion on the right. No cards — the rules do the separating.
 * Uses native <details>/<summary> — accessible, keyboard-friendly, no JS.
 * The `disclosure` class animates the open/close (see utilities.css).
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className={`${styles.faq} section`} aria-labelledby="faq-heading">
      <div className="container">
        <div className={styles.grid}>
          {/* Left: intro + support prompt */}
          <Reveal className={styles.intro}>
            <h2 id="faq-heading" className={styles.heading}>
              {faqIntro.heading}
            </h2>

            {/* Sits on the foot of the column, level with the last question
                rather than tucked under the heading. */}
            <Button
              href={routes.snapshot}
              variant="secondary"
              event="cta_secondary_click"
              location="faq"
              className={styles.supportCta}
            >
              {faqIntro.support.ctaLabel}
            </Button>
          </Reveal>

          {/* Right: accordion */}
          <div className={styles.list}>
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <details className={`${styles.item} disclosure`}>
                  <summary className={styles.question}>
                    <span className={styles.questionText}>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true" />
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
