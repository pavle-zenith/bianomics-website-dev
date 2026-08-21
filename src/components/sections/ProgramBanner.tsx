import { programBanner } from '@/content/site'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import styles from './ProgramBanner.module.css'

/**
 * One time-bound announcement: the Beyond Duty cohort and its application
 * form. Rendered by About, closing that section under the capability pills
 * and the reach card, so it reads as the last item in that block rather than
 * as a band interrupting the page.
 *
 * It runs on Groundwork's own orange because Beyond Duty is a Groundwork
 * programme, and `tone-oncolor` resolves the copy to ink against it.
 * Deliberately not a `section`: giving it a heading would put a rung in the
 * outline that the page does not need.
 *
 * Time-bound by nature — when the cohort closes this comes off the page, so
 * it is one component and one content block to remove.
 */
export function ProgramBanner() {
  return (
    <aside
      className={styles.banner}
      aria-label={`${programBanner.program} announcement`}
    >
      <Reveal className={`${styles.strip} tone-oncolor`}>
        <p className={styles.copy}>
          <span className={styles.program}>{programBanner.program}</span>
          <span className={styles.message}>{programBanner.message}</span>
        </p>

        <Button
          href={programBanner.href}
          variant="secondary"
          event="cta_primary_click"
          location="program-banner"
          external
          className={styles.cta}
        >
          {programBanner.ctaLabel}
        </Button>
      </Reveal>
    </aside>
  )
}
