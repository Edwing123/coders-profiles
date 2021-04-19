import { Env } from './types'

export const CONFIG_FILE_PATH = 'config.yaml'

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
