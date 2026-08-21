import type { Metadata } from 'next'
import { getNav } from '@/content'
import { termsOfService } from '@/content/legal'
import { brand } from '@/content/site'
import { routes } from '@/lib/routes'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { LegalDoc } from '@/components/sections/LegalDoc'

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.description,
  alternates: { canonical: routes.terms },
  openGraph: {
    type: 'article',
    url: routes.terms,
    siteName: brand.name,
    title: `${termsOfService.title}: ${brand.name}`,
    description: termsOfService.description,
  },
}

export default function TermsPage() {
  const nav = getNav()

  return (
    <>
      <Nav links={nav} />
      <main id="main">
        <LegalDoc doc={termsOfService} />
      </main>
      <Footer links={nav} />
    </>
  )
}
