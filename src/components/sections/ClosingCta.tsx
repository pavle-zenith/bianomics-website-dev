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
        {/* section-inverse marks this as a dark canvas so the shared Button's
            secondary variant flips to light-on-dark inside it. */}
        <Reveal className={`${styles.panel} section-inverse`}>
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
            <p className={styles.lockup}>{brand.lockupClosing}</p>

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
                  arrow
                >
                  Book a Snapshot
                </Button>
                <Button
                  href={anchors.whatWeDo}
                  variant="secondary"
                  event="cta_secondary_click"
                  location="closing"
                >
                  See what we do
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
