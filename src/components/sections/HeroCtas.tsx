'use client'

import { anchors } from '@/lib/routes'
import { Button } from '@/components/ui/Button'
import styles from './Hero.module.css'

/**
 * Hero CTAs. Both are the shared Button: the secondary used to be a bespoke
 * underlined text link, which made a third button treatment on the page for
 * no reason other than that it was the hero.
 */
export function HeroCtas() {
  return (
    <div className={styles.ctas}>
      <Button
        href={anchors.whatWeDo}
        variant="secondary"
        event="cta_secondary_click"
        location="hero"
      >
        See what we do
      </Button>
      <Button
        href={anchors.snapshot}
        variant="primary"
        event="cta_primary_click"
        location="hero"
        arrow
      >
        Book a Snapshot
      </Button>
    </div>
  )
}
