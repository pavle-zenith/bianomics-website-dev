// Dev-only, one-shot: normalise the portfolio mockups dropped into
// _source/portfolio/ into public/results/ at web sizes.
// Run with: npm run build-portfolio
//
// The originals are 2-4MB 2050px square PNGs straight out of the mockup
// renders. The grid runs two columns inside a 1440px container, so a card is
// roughly 660px wide and 1400 covers it at 2x. Square in, square out: these
// are composed images, and the frames are square so nothing gets cropped.

import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Source file → the `texture` key each case study carries in results.ts.
const jobs = [
  { from: 'GROUNDWORK YOUTH PROGRAM.png', to: 'groundwork-youth' },
  { from: 'BEYOND DUTY.png', to: 'beyond-duty' },
  { from: 'WORKFORCE SOLUTIONS BORDERPLEX.png', to: 'workforce-solutions' },
  { from: 'TCFEP.png', to: 'challenge-foundation' },
  { from: 'EPLA.png', to: 'epla' },
  { from: 'READYONE INDUSTRIES.png', to: 'readyone' },
  { from: 'DRIVEN AGAINST SILENCE.png', to: 'driven-against-silence' },
]

await mkdir(join(root, 'public', 'results'), { recursive: true })

for (const job of jobs) {
  const dest = join(root, 'public', 'results', `${job.to}.webp`)

  const info = await sharp(join(root, '_source', 'portfolio', job.from))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest)

  console.log(
    `${job.to.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`,
  )
}
