import type { StaticImageData } from 'next/image'
import { team } from '@/content/site'
import { TeamTrack } from './TeamTrack'
import styles from './Team.module.css'

import member1 from '../../../public/team/member-1.png'
import member2 from '../../../public/team/member-2.png'
import member3 from '../../../public/team/member-3.png'
import member4 from '../../../public/team/member-4.png'

const photos: Record<string, StaticImageData> = {
  'member-1': member1,
  'member-2': member2,
  'member-3': member3,
  'member-4': member4,
}

/**
 * Team — square headshots on a horizontal track that runs off the right edge,
 * paged with the arrow controls beside the title.
 */
export function Team() {
  return (
    <section id="team" className={`${styles.team} section`} aria-labelledby="team-heading">
      <TeamTrack members={team.members} photos={photos} heading={team.heading} />
    </section>
  )
}
