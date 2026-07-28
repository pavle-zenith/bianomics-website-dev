import Image from 'next/image'
import { brand } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import ctaBg from '../../../public/hero/hero-bg.png'
import styles from './ClosingCta.module.css'

/**
 * Closing CTA — an inset panel over the brand texture: the ask bottom-left,
 * the actions bottom-right.
 */
export function ClosingCta() {
  return (
    <section className="section" aria-labelledby="closing-heading">
      <div className="container">
        <Reveal className={styles.panel}>
          <div className={styles.fill}>
            <Image
              src={ctaBg}
              alt=""
              fill
              sizes="100vw"
              className={styles.bg}
            />
          </div>
          <div className={styles.scrim} aria-hidden="true" />

          <div className={styles.content}>
            <p className={styles.lockup}>{brand.lockup}</p>

            <div className={styles.foot}>
              <h2 id="closing-heading" className={styles.heading}>
                Ready to be seen for what you actually do?
              </h2>

              <div className={styles.actions}>
                <Button
                  href={anchors.snapshot}
                  variant="primary"
                  event="cta_primary_click"
                  location="closing"
                >
                  Book a Snapshot
                </Button>
                <a href={anchors.whatWeDo} className={styles.secondary}>
                  See what we do
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
