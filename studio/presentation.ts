import {defineDocuments, defineLocations, type PresentationPluginOptions} from 'sanity/presentation'
import {SINGLETONS} from './structure'

/** Where each section shows up on the site, for the Presentation tool. */
export const resolve: PresentationPluginOptions['resolve'] = {
  // Opening a page in the preview opens the document that drives it.
  mainDocuments: defineDocuments([
    {route: '/snapshot', filter: `_id == "snapshotLandingPage"`},
  ]),
  locations: Object.fromEntries(
    SINGLETONS.map((s) => [
      s.type,
      defineLocations({
        locations:
          s.type === 'snapshotLandingPage'
            ? [{title: 'Snapshot page', href: '/snapshot'}]
            : s.type === 'contactDetails'
              ? [
                  {title: 'Home (footer)', href: '/'},
                  {title: 'Snapshot page (footer)', href: '/snapshot'},
                ]
              : [{title: 'Home page', href: '/'}],
      }),
    ]),
  ),
}
