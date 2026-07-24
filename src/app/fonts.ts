import localFont from 'next/font/local'

// Causten — primary geometric sans. Used for everything structural.
// Files self-hosted from public/fonts (converted by scripts/convert-fonts.mjs).
export const causten = localFont({
  variable: '--font-causten',
  display: 'swap',
  src: [
    { path: '../../public/fonts/causten-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/causten-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/causten-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/causten-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/causten-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/causten-800.woff2', weight: '800', style: 'normal' },
  ],
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
