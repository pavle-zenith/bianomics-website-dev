// Dev-only, one-shot: derive the shipped texture beds from the raw PNGs in
// _source/textures/ (gitignored, ~64MB) into public/texture/.
//
// The projects bed arrived as a HEIC, which sharp's build here cannot decode.
// It was converted once with `sips -s format png` on the way into _source/;
// do the same for any future HEIC drop rather than pointing this at one.
// Run with: npm run build-textures
//
// Only four of the five raw textures ship. The fifth (5.png) is a soft light
// falloff over fine grain; both halves are cheaper and sharper generated at
// runtime — a radial-gradient for the falloff and an feTurbulence data-URI for
// the grain — so its intensity is a token instead of a baked-in pixel value.
// See --texture-grain in src/app/tokens/texture.css.

import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, '_source', 'textures')
const out = join(root, 'public', 'texture')

// The haze is the one full-bleed hero bed, so it gets the wider render; the
// dark grains only ever sit behind copy at low contrast and hold up at 1920.
const jobs = [
  { from: '4.png', to: 'haze.webp', width: 2400, quality: 72 },
  { from: '1 (1).png', to: 'dark-01.webp', width: 1920, quality: 70 },
  { from: '2.png', to: 'dark-02.webp', width: 1920, quality: 70 },
  { from: '3.png', to: 'dark-03.webp', width: 1920, quality: 70 },
  // The projects bed. Portrait and soft-focus, so it takes the section's full
  // height on `cover` and the upscale never shows; 1600 is plenty.
  { from: 'projects-background.png', to: 'projects.webp', width: 1600, quality: 72 },
  // Behind the reach card. It only ever fills a card, and it is held at low
  // opacity there, so it does not need the width the beds do.
  { from: 'map.jpg', to: 'map.webp', width: 1200, quality: 70 },
]

await mkdir(out, { recursive: true })

for (const job of jobs) {
  const info = await sharp(join(src, job.from))
    .resize({ width: job.width })
    .webp({ quality: job.quality })
    .toFile(join(out, job.to))

  console.log(
    `${job.to.padEnd(14)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  )
}
