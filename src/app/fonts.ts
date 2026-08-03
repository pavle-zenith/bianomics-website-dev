import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// Causten — primary geometric sans. Used for everything structural.
// Files self-hosted from public/fonts (converted by scripts/convert-fonts.mjs).
// 800 is deliberately not loaded: hierarchy comes from size and tracking,
// never from weight, so nothing above 700 is ever set.
export const causten = localFont({
  variable: '--font-causten',
  display: 'swap',
  src: [
    { path: '../../public/fonts/causten-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/causten-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/causten-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/causten-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/causten-700.woff2', weight: '700', style: 'normal' },
  ],
})

// JetBrains Mono — technical voice. Reserved for section counters (01 / 04),
// margin labels, tags, and metadata. Never headlines, never body copy.
// next/font/google self-hosts at build time, so there is no runtime request.
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
})

// HV Fitzgerald — secondary serif. Reserved for pull-quotes and elevated
// statements only. Loaded lean (Regular + Italic).
export const fitzgerald = localFont({
  variable: '--font-fitzgerald',
  display: 'swap',
  src: [
    { path: '../../public/fonts/fitzgerald-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/fitzgerald-400-italic.woff2', weight: '400', style: 'italic' },
  ],
})
