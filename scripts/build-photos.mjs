// Dev-only, one-shot: normalise the raw brand photography dropped into
// _source/ into public/ at web sizes.
// Run with: npm run build-photos
//
// The originals are 3-7MB JPEGs straight off the shoot. The process frames
// only ever render at roughly half a column, so 1600px is the honest ceiling;
// the hero underlay is full-bleed and gets the wider render.

import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const jobs = [
  // One frame per process step, in step order.
  { from: 'process/Laptop Screen.jpg', to: 'process/snapshot.webp', width: 1600 },
  { from: 'process/Billboard (1).jpg', to: 'process/story.webp', width: 1600 },
  { from: 'process/Signage.jpg', to: 'process/plan.webp', width: 1600 },
  { from: 'process/Totebag (1).jpg', to: 'process/build.webp', width: 1600 },
  // Full-bleed behind the hero.
  { from: 'hero/underlay.jpg', to: 'hero/underlay.webp', width: 2400 },
  // One thumbnail per practice. The frame is square and never wider than
  // half a card, so 1000 covers it at 2x.
  { from: 'labs/Vision Lab.png', to: 'labs/visionlab.webp', width: 1000 },
  { from: 'labs/Stage.png', to: 'labs/stage.webp', width: 1000 },
  { from: 'labs/BluePrint.png', to: 'labs/blueprint.webp', width: 1000 },
  { from: 'labs/Groundwork.png', to: 'labs/groundwork.webp', width: 1000 },
  // One per half of the offer. The cards are landscape at two-up and never
  // wider than half the container, so 1400 covers them at 2x.
  { from: 'serve/social-impact.png', to: 'serve/social-impact.webp', width: 1400 },
  { from: 'serve/career-seekers.png', to: 'serve/career-seekers.webp', width: 1400 },
]

for (const job of jobs) {
  const dest = join(root, 'public', job.to)
  await mkdir(dirname(dest), { recursive: true })

  const info = await sharp(join(root, '_source', job.from))
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest)

  console.log(
    `${job.to.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  )
}
