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
npm run dev       # http://localhost:3333; preview targets www.bianomics.com
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000 npm run dev   # preview your local site instead
npm run deploy    # first time: log in, pick a hostname (e.g. "bianomics")
```

`deploy` uses auto-updates, so the hosted Studio picks up Sanity releases without redeploying. After the first deploy, copy the `appId` it prints into `deployment.appId` in `sanity.cli.ts`.

## How the site reads it

- **Fetching:** `src/sanity/live.ts` has the client and `sanityFetch()`.
  - Visitors get published content, cached under the `sanity` tag, and pages stay static.
  - Draft mode (the visual editor) gets uncached drafts with stega markers.
- **Mapping:** `src/content/live.ts` (`getContent()`) fetches the 14 section documents and lays them over the code defaults through `src/content/cms.ts`. Sections render with `await getContent()`.
- **Publishing:** a Sanity webhook POSTs to `/api/revalidate`, which is signed with `SANITY_REVALIDATE_SECRET`. That route expires the `sanity` tag, so the next visit shows the change within seconds, with no rebuild.
- **Visual Editing:** the Presentation tool calls `/api/draft-mode/enable`. `<SanityVisualEditing />` then draws the click-to-edit overlays and refreshes the preview as she types. `cms.ts` strips the markers from ids, colors, photo and image keys, and links.
- **Fallback:** if Sanity can't be reached, the site renders `src/content/cms.json`. That's a snapshot refreshed by `npm run content:pull`, which also runs before every build.
- **Why not `defineLive` / `<SanityLive />`:** in `next-sanity` v13 it needs Next.js Cache Components, which this app doesn't enable.

## Changing the content model

1. Edit `schemaTypes/index.ts`.
2. Map the new field in `src/content/cms.ts` (site).
3. Redeploy the Studio.

AI tools that connect through the Sanity MCP read a separate MCP-managed copy of the schema. Re-deploy it with the MCP `deploy_schema` tool when fields change, using the same declarations.
