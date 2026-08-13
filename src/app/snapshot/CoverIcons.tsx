/**
 * Icons for the Snapshot page's cover grid, one per item, keyed by the item's
 * content id. Sourced from Lucide via better-icons and inlined rather than
 * imported: better-icons is an MCP server for retrieving icon markup, not a
 * runtime component library, and inlining is what every other icon in this
 * codebase does. All draw with currentColor, so they take the cell's colour.
 */

const paths: Record<string, React.ReactNode> = {
  // crosshair — where the position actually lands
  position: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M22 12h-4M6 12H2m10-6V2m0 20v-4" />
    </>
  ),
  // scan-search — the gaps costing the most
  gaps: (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
      <path d="m16 16l-1.9-1.9" />
    </>
  ),
  // layers — which practices you need
  practices: (
    <>
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m6.08 9.5l-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
      <path d="m6.08 14.5l-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
    </>
  ),
  // route — a shape for the work
  plan: (
    <>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </>
  ),
  // users — senior people, start to finish
  senior: (
    <>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </>
  ),
  // gift — yours to keep, regardless
  yours: (
    <>
      <path d="M12 7v14m8-10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8m3.5-4a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5a1 1 0 0 1 0 5" />
      <rect width="18" height="4" x="3" y="7" rx="1" />
    </>
  ),
}

export function CoverIcon({ name }: { name: string }) {
  const path = paths[name]
  if (!path) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
