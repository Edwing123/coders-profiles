import * as path from 'path'
import { DEV_DEPENDENDIES_BASE_PATH } from './constants'

const base = DEV_DEPENDENDIES_BASE_PATH

export const dependencies = {
  dev: {
    '@css': `${base}/css`,
    '@js': `${base}/js`,
    '@assets': `${base}/assets`,
    '@icons': `${base}/assets/icons`,
    '@images': `${base}/assets/images`
  },
  prod: {
    '@css': '/dependencies/css',
    '@js': '/dependencies/js',
    '@assets': '/dependencies/assets',
    '@icons': '/dependencies/assets/icons',
    '@images': '/dependencies/assets/images'
  }
}

const viewsDir = path.resolve(path.join('.', 'src', 'views'))
export const views = {
  '@components': `${viewsDir}/components`,
  '@commons': `${viewsDir}/commons`
}
