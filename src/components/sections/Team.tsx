import Image, { type StaticImageData } from 'next/image'
import { team } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
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

export function Team() {
  return (
    <section id="team" className="section" aria-labelledby="team-heading">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{team.eyebrow}</p>
          <h2 id="team-heading" className={styles.heading}>
            {team.heading}
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {team.members.map((member, i) => (
            <Reveal as="li" key={member.id} delay={i * 0.07} className={styles.card}>
              <div className={styles.photoWrap}>
                <Image
                  src={photos[member.photo] ?? member1}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(min-width: 60rem) 25vw, (min-width: 40rem) 50vw, 100vw"
                  className={styles.photo}
                />
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    className={styles.social}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon />
                  </a>
                ) : null}
              </div>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06C20.4 8.58 22 10.55 22 14v7h-4v-6.2c0-1.48-.03-3.39-2.07-3.39-2.07 0-2.39 1.62-2.39 3.29V21H9V9Z" />
    </svg>
  )
}
