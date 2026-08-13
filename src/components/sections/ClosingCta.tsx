import Image from 'next/image'
import { brand } from '@/content/site'
import { anchors, routes } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import ctaBg from '../../../public/hero/underlay.webp'
import styles from './ClosingCta.module.css'

/**
 * Closing CTA — a full-bleed band on the light canvas: the haze bed with the
 * El Paso photograph soft-lit into it, the same treatment the hero opens on,
 * so the page closes on the image it started with. The band runs to both edges
 * of the viewport; the copy inside holds the same measure as every other
 * section.
 */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing-heading">
      <Reveal className={`${styles.panel} bed bed-haze`}>
        {/* Soft-lit rather than laid on top: what survives is the road's
            structure as tone in the haze, not a photograph behind a scrim. */}
        <div className={styles.fill}>
          <Image src={ctaBg} alt="" fill sizes="100vw" className={styles.bg} />
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={`${styles.content} container`}>
          <p className={styles.lockup}>{brand.lockupClosing}</p>

          <div className={styles.foot}>
            <h2 id="closing-heading" className={styles.heading}>
              Ready to be seen for what you actually do?
            </h2>

            <div className={styles.actions}>
              <Button
                href={routes.snapshot}
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
    </section>
  )
}
