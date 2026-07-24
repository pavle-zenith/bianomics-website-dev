# Bianomics — Phase 1 Landing Page

A single, production-quality long-scroll landing page for Bianomics ("The Anti-Agency").
Its one job is converting warm visitors into a submitted **Snapshot** request. Built so its
sections lift into the Phase 2 multi-page site.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **CSS Modules** over a global CSS-variable token layer (no Tailwind) — restyleable by
  editing tokens, not components
- **Framer Motion** for scroll reveals (respects `prefers-reduced-motion`)
- **Typed content config** under `src/content/` (Sanity-ready via accessor seam)
- **Snapshot form** → `/api/snapshot` route handler → **Resend** (via the `deliverSnapshot` seam)
- **PostHog** analytics (typed event wrappers)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in Resend + PostHog keys (optional for local UI)
npm run dev                         # http://localhost:3000
```

Scripts: `npm run build`, `npm run start`, `npm run typecheck`, `npm run lint`,
`npm run convert-fonts` (regenerates `public/fonts/*.woff2` from `_source/`).

## Where things live

| Area | Path |
|---|---|
| Design tokens (single source of truth) | `src/app/tokens/{palette,semantic,scale,base,utilities}.css` |
| Editable content (labs, faq, results, nav, copy) | `src/content/` (read via `src/content/index.ts` accessors) |
| Section components (one per landing-page section) | `src/components/sections/` |
| UI primitives | `src/components/ui/` |
| Snapshot form | `src/components/form/SnapshotForm.tsx` |
| Form validation (shared client+server) | `src/lib/validation.ts` |
| Delivery seam (swap Resend for a CRM here) | `src/lib/deliver.ts` |
| Analytics events (typed) | `src/lib/analytics.ts` |
| Phase-2 route map | `src/lib/routes.ts` |

## Conventions

- **No hardcoded hex in components.** Only `src/app/tokens/palette.css` holds hex; components
  consume semantic tokens (`var(--color-*)`, `var(--lab-*)`). Guard:
  `grep -rEn '#[0-9a-fA-F]{6}' src/components` must be empty.
- **The four labs** are Vision / Stage / Blueprint / Groundwork. Opportunity Lab is the
  nonprofit arm (its own section, not a lab).
- **Locked brand language** lives in `src/content/site.ts` — used verbatim, do not paraphrase.
- `_source/` (raw fonts + brand PDFs) is gitignored and not shipped.

## Before launch (open items)

See the plan file / handoff. Key ones: Resend key + verified domain + destination inbox;
a dedicated Bianomics PostHog project key (do **not** reuse ISKRA); official logo files;
founder portrait; one case study + two testimonials (fills `src/content/results.ts`);
confirmed "what size organizations" FAQ answer; font license confirmation.
