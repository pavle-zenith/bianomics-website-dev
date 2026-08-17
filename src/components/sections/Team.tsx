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
}

/**
 * Team — square headshots on a horizontal track that runs off the right edge,
 * paged with the arrow controls beside the title. Selecting a card opens that
 * person's full bio in a panel from the right.
 */
export function Team() {
  return (
    <section id="team" className={`${styles.team} section`} aria-labelledby="team-heading">
      <TeamTrack members={team.members} photos={photos} heading={team.heading} />
    </section>
  )
}
