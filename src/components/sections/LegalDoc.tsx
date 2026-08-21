import type { LegalDocument } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import styles from './LegalDoc.module.css'

/**
 * The shared renderer for the legal pages. Both documents use the same
 * content shape, so both get the same measure, rhythm, and contents list
 * without either page owning any layout of its own.
 */
export function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <article className={`${styles.doc} section`}>
      <div className="container">
        <Reveal className={styles.head}>
          <h1 className={styles.title}>{doc.title}</h1>
          <p className={styles.lede}>{doc.description}</p>
          <p className={styles.effective}>Effective {doc.effective}</p>
        </Reveal>

        <div className={styles.layout}>
          {/* A contents list, because these are long and people arrive
              looking for one clause. */}
          <nav className={styles.toc} aria-label={`${doc.title} contents`}>
            <p className={styles.tocHead}>Contents</p>
            <ol className={styles.tocList}>
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={styles.tocLink}>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.body}>
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className={styles.section}
                aria-labelledby={`${section.id}-heading`}
              >
                <h2 id={`${section.id}-heading`} className={styles.heading}>
                  {section.heading}
                </h2>

                {section.body.map((block, i) =>
                  typeof block === 'string' ? (
                    <p key={i} className={styles.para}>
                      {block}
                    </p>
                  ) : (
                    <ul key={i} className={styles.list}>
                      {block.list.map((item) => (
                        <li key={item} className={styles.item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
