// Dev-only, one-shot: convert the four needed Causten .ttf weights to .woff2
// and copy the HV Fitzgerald .woff2 files into public/fonts/.
// Run with: node scripts/convert-fonts.mjs
// Not part of the runtime bundle. Source fonts live in _source/ (gitignored).

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import wawoff2 from 'wawoff2'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'fonts')
const caustenDir = join(root, '_source', 'Causten')
const fitzDir = join(root, '_source', 'HV Fitzgerald Font')

// Causten: the four weights the handoff calls for.
const caustenJobs = [
  { src: 'Causten Regular.ttf', dest: 'causten-400.woff2' },
  { src: 'Causten Regular Oblique.ttf', dest: 'causten-400-italic.woff2' },
  { src: 'Causten Medium.ttf', dest: 'causten-500.woff2' },
  { src: 'Causten Semi Bold.ttf', dest: 'causten-600.woff2' },
  { src: 'Causten Bold.ttf', dest: 'causten-700.woff2' },
  { src: 'Causten Extra Bold.ttf', dest: 'causten-800.woff2' },
]

// HV Fitzgerald: already .woff2 upstream, just copy + rename to lowercase-kebab.
const fitzJobs = [
  { src: 'Fitzgerald-Regular.woff2', dest: 'fitzgerald-400.woff2' },
  { src: 'Fitzgerald-Italic.woff2', dest: 'fitzgerald-400-italic.woff2' },
]

async function main() {
  await mkdir(out, { recursive: true })

  for (const { src, dest } of caustenJobs) {
    const ttf = await readFile(join(caustenDir, src))
    const woff2 = await wawoff2.compress(ttf)
    await writeFile(join(out, dest), woff2)
    console.log(`converted  ${src}  ->  ${dest}  (${woff2.length} bytes)`)
  }

  for (const { src, dest } of fitzJobs) {
    const buf = await readFile(join(fitzDir, src))
    await writeFile(join(out, dest), buf)
    console.log(`copied     ${src}  ->  ${dest}  (${buf.length} bytes)`)
  }

  console.log('\nFonts written to public/fonts/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
