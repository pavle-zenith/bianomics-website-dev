import Image from 'next/image'
import { anchors, routes } from '@/lib/routes'
import type { CtaLocation } from '@/lib/analytics'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import ctaBg from '../../../public/hero/underlay.webp'
import styles from './ClosingCta.module.css'

interface ClosingCtaProps {
  /** Overrides the headline. */
  heading?: string
  /** Optional paragraph under the headline. The landing page passes none. */
  body?: string
  /** Where the primary button goes. On /snapshot it is the form, not the page. */
  primaryHref?: string
  /** The secondary link. Anchors need a leading `/` from anywhere but home. */
  secondaryHref?: string
  /** Analytics label, so the two placements stay distinguishable. */
  location?: CtaLocation
  /** Unique per page: two of these would collide on the labelling id. */
  headingId?: string
}

/**
 * Closing CTA — a full-bleed band on the light canvas: the haze bed with the
 * El Paso photograph soft-lit into it, the same treatment the hero opens on,
 * so the page closes on the image it started with. The band runs to both edges
 * of the viewport; the copy inside holds the same measure as every other
 * section.
 *
 * Shared by the landing page and /snapshot. Everything that differs between
 * the two is a prop, so the treatment cannot drift apart into two copies.
 */
export function ClosingCta({
  heading = 'Ready to be seen for what you actually do?',
  body,
  primaryHref = routes.snapshot,
  secondaryHref = anchors.whatWeDo,
  location = 'closing',
  headingId = 'closing-heading',
}: ClosingCtaProps = {}) {
  return (
    <section aria-labelledby={headingId}>
      <Reveal className={`${styles.panel} bed bed-haze`}>
        {/* Soft-lit rather than laid on top: what survives is the road's
            structure as tone in the haze, not a photograph behind a scrim. */}
        <div className={styles.fill}>
          <Image src={ctaBg} alt="" fill sizes="100vw" className={styles.bg} />
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={`${styles.content} container`}>
          <div className={styles.foot}>
            <div className={styles.copy}>
              <h2 id={headingId} className={styles.heading}>
                {heading}
              </h2>
              {body ? <p className={styles.body}>{body}</p> : null}
            </div>

            <div className={styles.actions}>
              <Button
                href={primaryHref}
                variant="primary"
                event="cta_primary_click"
                location={location}
                arrow
              >
                Book a Snapshot
              </Button>
              <Button
                href={secondaryHref}
                variant="secondary"
                event="cta_secondary_click"
                location={location}
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
