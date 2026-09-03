import type { StaticImageData } from 'next/image'
import { team } from '@/content/site'
import { TeamTrack } from './TeamTrack'
import styles from './Team.module.css'

import bianca from '../../../public/team/bianca.jpg'
import hamna from '../../../public/team/hamna.jpg'
import desiree from '../../../public/team/desiree.jpg'
import milan from '../../../public/team/milan.jpg'
import kandolite from '../../../public/team/kandolite.jpg'
import chris from '../../../public/team/chris.jpg'
import pavle from '../../../public/team/pavle.jpg'
import vanessa from '../../../public/team/vanessa.jpg'
import minerva from '../../../public/team/minerva.jpg'
import celisse from '../../../public/team/celisse.jpg'
import greg from '../../../public/team/greg.jpg'
import nova from '../../../public/team/nova.jpg'
import talha from '../../../public/team/talha.jpg'

/**
 * Photos served as-is, skipping /_next/image. The Vercel image-optimization
 * quota is exhausted, and the optimizer answers any UNCACHED transformation
 * with 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED — a broken frame on the
 * page. Every headshot that predates the limit still renders from the CDN's
 * cached transforms, so only new or replaced photos belong here; drop a key
 * once the quota resets or the plan changes, and keep any file listed here
 * web-sized at the source, because it ships byte-for-byte.
 */
const unoptimizedPhotos = new Set(['milan'])

/** Keyed by `member.photo`. Add an entry here when a new headshot lands. */
const photos: Record<string, StaticImageData> = {
  bianca,
  hamna,
  desiree,
  milan,
  kandolite,
  chris,
  pavle,
  vanessa,
  minerva,
  celisse,
  greg,
  nova,
  talha,
}

/**
 * Team — square headshots on a horizontal track that runs off the right edge,
 * paged with the arrow controls beside the title. Selecting a card opens that
 * person's full bio in a panel from the right.
 *
 * Two tracks, not one: the collaborators are consultants rather than staff,
 * and a single roster would read as though they were on the payroll. Same
 * component either way, so the two groups behave identically.
 */
export function Team() {
  return (
    <section id="team" className={`${styles.team} section`} aria-labelledby="team-heading">
      <TeamTrack
        members={team.members}
        photos={photos}
        unoptimizedPhotos={unoptimizedPhotos}
        heading={team.heading}
        headingId="team-heading"
      />

      <div className={styles.group}>
        <TeamTrack
          members={team.collaborators}
          photos={photos}
          unoptimizedPhotos={unoptimizedPhotos}
          heading={team.collaboratorsHeading}
          headingId="collaborators-heading"
        />
      </div>
    </section>
  )
}
