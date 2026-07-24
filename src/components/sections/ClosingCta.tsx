import { contact } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import styles from './ClosingCta.module.css'

export function ClosingCta() {
  return (
    <section className="section section-inverse" aria-labelledby="closing-heading">
      <div className="container">
        <Reveal className={styles.inner}>
          <h2 id="closing-heading" className={styles.heading}>
            See what happens when the whole picture moves together.
          </h2>
          <div className={styles.ctaRow}>
            <Button
              href={anchors.snapshot}
              variant="primary"
              event="cta_primary_click"
              location="closing"
            >
              Book a Snapshot
            </Button>
            <div className={styles.reach}>
              <a href={contact.phoneHref} className={styles.reachLink}>
                {contact.phone}
              </a>
              <span className={styles.reachSep} aria-hidden="true">
                ·
              </span>
              <a href={contact.emailHref} className={styles.reachLink}>
                {contact.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
