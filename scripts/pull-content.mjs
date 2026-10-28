#!/usr/bin/env node
// Refreshes src/content/cms.json, the snapshot of the published Sanity copy.
// Pages fetch Sanity live (src/content/live.ts); this snapshot is only the
// fallback they render if Sanity can't be reached. Runs before every build
// (npm "prebuild") and by hand with:
//   npm run content:pull
//
// The dataset is public, so no token is needed: only published documents are
// readable without one. If Sanity can't be reached, the committed cms.json is
// kept. Set CMS_REQUIRED=1 to fail instead.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outFile = join(root, 'src/content/cms.json')

const projectId = process.env.SANITY_PROJECT_ID || 'tx3mrc2w'
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = '2025-02-19'

// One fixed document per section. Duplicates created in the Studio are ignored.
const ids = [
  'aboutSection',
  'audienceSection',
  'comparisonSection',
  'contactDetails',
  'faqSection',
  'founderSection',
  'opportunityLabSection',
  'practicesSection',
  'processSection',
  'programBanner',
  'resultsSection',
  'snapshotLandingPage',
  'teamSection',
  'trustStrip',
]

const SYSTEM_FIELDS = new Set(['_id', '_rev', '_createdAt', '_updatedAt', '_system'])

function strip(value) {
  if (Array.isArray(value)) return value.map(strip)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([k]) => !SYSTEM_FIELDS.has(k))
        .map(([k, v]) => [k, strip(v)]),
    )
  }
  return value
}

async function main() {
  const query = '*[_id in $ids]'
  const url =
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
    `?query=${encodeURIComponent(query)}` +
    `&%24ids=${encodeURIComponent(JSON.stringify(ids))}` +
    `&perspective=published`

  const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`Sanity responded ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const { result } = await res.json()
  if (!Array.isArray(result) || result.length === 0) throw new Error('Sanity returned no documents')

  const byId = {}
  for (const doc of result.sort((a, b) => a._id.localeCompare(b._id))) byId[doc._id] = strip(doc)

  const next = JSON.stringify(byId, null, 2) + '\n'
  let prev = ''
  try {
    prev = await readFile(outFile, 'utf8')
  } catch {}
  await writeFile(outFile, next)
  console.log(
    `[cms] Pulled ${result.length}/${ids.length} documents from Sanity ${projectId}/${dataset}` +
      (prev === next ? ' (no changes)' : ' (updated)'),
  )
}

main().catch((err) => {
  if (process.env.CMS_REQUIRED === '1') {
    console.error('[cms] Pull failed:', err.message)
    process.exit(1)
  }
  console.warn(`[cms] Pull failed, building with the last pulled copy: ${err.message}`)
})
