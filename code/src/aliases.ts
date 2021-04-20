import * as path from 'path'

export const dependencies = {
  dev: {
    '@css': './src/dependencies/css',
    '@js': './src/dependencies/js',
    '@assets': './src/dependencies/assets'
  },
  prod: {
    '@css': 'dependencies/css',
    '@js': 'dependencies/js',
    '@assets': 'dependencies/assets'
  }
}

const viewsDir = path.resolve(path.join('.', 'src', 'views'))
export const views = {
  '@components': `${viewsDir}/components`,
  '@commons': `${viewsDir}/commons`
}
