import type { Metadata } from 'next'
import { getNav } from '@/content'
import { privacyPolicy } from '@/content/legal'
import { brand } from '@/content/site'
import { routes } from '@/lib/routes'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { LegalDoc } from '@/components/sections/LegalDoc'

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: routes.privacy },
  openGraph: {
    type: 'article',
    url: routes.privacy,
    siteName: brand.name,
    title: `${privacyPolicy.title}: ${brand.name}`,
    description: privacyPolicy.description,
  },
}

export default function PrivacyPage() {
  const nav = getNav()

  return (
    <>
      <Nav links={nav} />
      <main id="main">
        <LegalDoc doc={privacyPolicy} />
      </main>
      <Footer links={nav} />
    </>
  )
}
