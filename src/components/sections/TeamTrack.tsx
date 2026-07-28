'use client'

import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { TeamMember } from '@/content/types'
import styles from './Team.module.css'

interface TeamTrackProps {
  members: readonly TeamMember[]
  photos: Record<string, StaticImageData>
}

/**
 * Team headshots as a horizontal sticky stack: the row bleeds off the right
 * edge, and as it scrolls each card sticks at the left container edge while
 * the next slides over it, so they pile up rather than scrolling past.
 */
export function TeamTrack({ members, photos }: TeamTrackProps) {
  return (
    <div className={styles.trackViewport}>
      <ul className={styles.track}>
        {members.map((member, i) => (
          <li
            key={member.id}
            className={styles.card}
            style={{ ['--i' as string]: String(i) } as CSSProperties}
          >
            <div className={styles.cardInner}>
              <div className={styles.photoWrap}>
                <Image
                  src={photos[member.photo] ?? Object.values(photos)[0]!}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(min-width: 60rem) 20rem, 70vw"
                  className={styles.photo}
                />
              </div>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
