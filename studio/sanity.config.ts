import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure, SINGLETON_TYPES} from './structure'
import {resolve} from './presentation'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'tx3mrc2w'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
/** The site the Presentation tool previews. Point at http://localhost:3000 for local work. */
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://bianomics.com'

export default defineConfig({
  name: 'default',
  title: 'Bianomics Website',
  projectId,
  dataset,

  plugins: [
    // Visual editing: the live site with click-to-edit. Listed first so it is
    // the tool the Studio opens on.
    presentationTool({
      title: 'Visual editor',
      resolve,
      previewUrl: {
        initial: previewUrl,
        previewMode: {enable: '/api/draft-mode/enable'},
      },
      allowOrigins: [previewUrl, 'http://localhost:*'],
    }),
    structureTool({title: 'Content', structure}),
  ],

  schema: {
    types: schemaTypes,
    // No "create new" for sections: each one is a single fixed document.
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Sections can be edited and published, never deleted, duplicated or unpublished.
    actions: (actions, {schemaType}) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
    newDocumentOptions: (items) => items.filter(({templateId}) => !SINGLETON_TYPES.has(templateId)),
  },
})
