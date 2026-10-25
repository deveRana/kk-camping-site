import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'roac4c6v',
    dataset: 'production'
  },
  studioHost: 'lakeora',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    appId: 'q7xuvtf3ll2xulwmesf17fky',
    autoUpdates: true,
  },
})
