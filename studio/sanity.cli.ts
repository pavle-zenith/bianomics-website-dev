import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'tx3mrc2w',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {
    appId:'w1yxzu7k7a5m5ib3k6rcbxwn',
    // Studio picks up Sanity fixes and features without redeploying.
    autoUpdates: true,
  },
})
