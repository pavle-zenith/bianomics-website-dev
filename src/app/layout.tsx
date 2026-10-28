// Global styles first, deliberately. CSS order follows import order, so a
// component imported above this line ships its module CSS ahead of the token
// layer, and any global utility it also uses then wins the cascade against it.
import './globals.css'

import type { Metadata, Viewport } from 'next'
import { causten, fitzgerald, jetbrainsMono } from './fonts'
import { draftMode } from 'next/headers'
import { SanityVisualEditing } from '@/components/SanityVisualEditing'
import { brand } from '@/content/brand'
import { PostHogProvider } from '@/components/PostHogProvider'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { Intro } from '@/components/ui/Intro'

/**
 * Runs before first paint so a repeat visit inside the session never flashes
 * the intro. Doing this in an effect would be too late: the panel would paint
 * and then vanish, which is worse than showing it.
 *
 * It appends a rule rather than putting a class on <html>. React owns that
 * element's className, so mutating it before hydration is a guaranteed
 * mismatch; an injected <style> is invisible to the reconciler.
 */
const introGuard = `try{if(sessionStorage.getItem('bnx-intro')){var s=document.createElement('style');s.textContent='[data-intro]{display:none!important}.page-shell{animation:none!important;filter:none!important}';document.head.appendChild(s)}}catch(e){}`

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bianomics.com'
const description =
  'Brand, events, operations, and the people doing the work, orchestrated into one ecosystem tuned to the same voice. Book a Snapshot.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // No em dashes anywhere in our copy, including metadata.
  title: {
    default: `${brand.name}: ${brand.descriptor}`,
    template: `%s: ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  keywords: [
    'brand strategy',
    'PR',
    'events',
    'operations',
    'workforce development',
    'veteran workforce readiness',
    'team development',
    'El Paso',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name}: ${brand.anchor}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name}: ${brand.anchor}`,
    description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0d0e11',
  colorScheme: 'light',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // True only inside the Studio's Presentation view (or after visiting
  // /api/draft-mode/enable). Visitors always get the static published site.
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${causten.variable} ${fitzgerald.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGuard }} />
        {/* Without scripts nothing takes the panel down, so it never goes up.
            The page blur has to be cancelled too: hiding the panel leaves it
            in the DOM, so :has() would still match and the page would sit
            behind a defocus that never lifts. */}
        <noscript>
          <style>
            {`[data-intro]{display:none !important}.page-shell{animation:none !important;filter:none !important}`}
          </style>
        </noscript>
        {/* No intro animation while editing in the Studio preview. */}
        {isDraftMode && (
          <style>
            {`[data-intro]{display:none !important}.page-shell{animation:none !important;filter:none !important}`}
          </style>
        )}
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Intro />
        {/* The page gets its own wrapper so the intro's defocus can be applied
            to it alone. It cannot go on <body>: a filter there would catch the
            intro panel too, and would also make <body> the containing block
            for the fixed nav. */}
        <div className="page-shell">
          <PostHogProvider>{children}</PostHogProvider>
        </div>

        {/* Outside `.page-shell` for the same reason the nav is: the intro's
            defocus puts a filter on that wrapper, and a filtered ancestor
            becomes the containing block for anything fixed inside it. */}
        <CookieBanner />

        {/* Renders nothing until consent is granted. */}
        <GoogleAnalytics />

        {/* Click-to-edit overlays and live refresh, only in the Studio preview. */}
        {isDraftMode && <SanityVisualEditing />}
      </body>
    </html>
  )
}
