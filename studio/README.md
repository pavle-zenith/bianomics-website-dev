# Bianomics Studio

The Sanity Studio for the website's copy (project `tx3mrc2w`, dataset `production`). It's a standalone app that lives in this folder and deploys to `*.sanity.studio`. Sanity recommends this setup for Next.js sites over embedding the Studio, because it builds faster, auto-updates and keeps the site bundle clean.

## For editors

- **Visual editor** (opens by default): the live website with click-to-edit.
  1. Hover any text and click it. The field opens beside the page.
  2. Type, and the preview updates as you go. These are drafts, so nothing is public yet.
  3. Click **Publish**. The live site updates within seconds.
- **Content**: the same sections as plain forms, in page order. In lists (FAQ, team, steps, case studies), drag items to reorder, use "Add item" to add one, and use the ⋯ menu to remove or duplicate.
- **History**: the clock icon on any section shows past versions. Restore one, then publish it.

**Not editable here:**
- Photos and images. Ask Pavle.
- The locked brand lines (hero headline, tagline, Snapshot form copy), the nav and the legal pages.

## Run / deploy

```bash
cd studio
npm install
npm run dev       # http://localhost:3333; preview targets bianomics.com
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000 npm run dev   # preview your local site instead
npm run deploy    # first time: log in, pick a hostname (e.g. "bianomics")
```

`deploy` uses auto-updates, so the hosted Studio picks up Sanity releases without redeploying. After the first deploy, copy the `appId` it prints into `deployment.appId` in `sanity.cli.ts`.

## How the site reads it

- **Fetching:** `src/sanity/live.ts` defines `sanityFetch` and `<SanityLive />`, which use the Live Content API.
- **Mapping:** `src/content/live.ts` (`getContent()`) fetches the 14 section documents and lays them over the code defaults through `src/content/cms.ts`. Sections render with `await getContent()`.
- **Live updates:** pages are static for visitors. `<SanityLive />` revalidates them the moment something is published, so no webhook or rebuild is needed.
- **Visual Editing:** the Presentation tool calls `/api/draft-mode/enable`. In draft mode the site fetches drafts with stega markers, and `<VisualEditing />` draws the click-to-edit overlays. `cms.ts` strips the markers from ids, colors, photo and image keys and links.
- **Fallback:** if Sanity can't be reached, the site renders `src/content/cms.json`. That's a snapshot refreshed by `npm run content:pull`, which also runs before every build.

## Changing the content model

1. Edit `schemaTypes/index.ts`.
2. Map the new field in `src/content/cms.ts` (site).
3. Redeploy the Studio.

AI tools that connect through the Sanity MCP read a separate MCP-managed copy of the schema. Re-deploy it with the MCP `deploy_schema` tool when fields change, using the same declarations.
