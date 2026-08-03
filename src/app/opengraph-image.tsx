import { ImageResponse } from 'next/og'
import { brand } from '@/content/site'

export const alt = `${brand.name}: ${brand.anchor}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Dark hero + logo + Brand Anchor. Uses system fonts (no custom font fetch)
// to keep OG generation fast and dependency-free.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0d0e11',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: '#0094b3',
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
            {brand.name}
          </div>
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 900,
          }}
        >
          {brand.anchor}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            color: '#b8bcc4',
          }}
        >
          <span>{brand.lockupHero}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
