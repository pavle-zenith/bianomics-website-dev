import type { Metadata, Viewport } from 'next'
import { causten, fitzgerald } from './fonts'
import { brand } from '@/content/site'
import { PostHogProvider } from '@/components/PostHogProvider'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bianomics.com'
const description =
  'Bianomics builds your brand, runs your events, tightens your operations, and develops your people as one team. Book a free Snapshot.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} — ${brand.descriptor}`,
    template: `%s — ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  keywords: [
    'brand strategy',
    'PR',
    'events',
    'operations',
    'team development',
    'El Paso',
    'anti-agency',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} — ${brand.anchor}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — ${brand.anchor}`,
    description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0d0e11',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${causten.variable} ${fitzgerald.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
