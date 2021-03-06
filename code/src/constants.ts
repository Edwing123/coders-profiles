import { Env } from './types'

export const CONFIG_FILE_PATH = 'config.yaml'

export const DEV_DEPENDENDIES_BASE_PATH = '/src/dependencies'

export const VIEWS_PAGES = 'src/views/pages'

export const ENVIRONMENT: Env = {
  dev: {
    name: 'dev',
    outdir: 'dev'
  },

  prod: {
    name: 'prod',
    outdir: 'dist'
  }
}
