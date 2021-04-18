import * as path from 'path'

// config and build process
export const dev = {
  dependencies: {
    '@css': 'dependencies/css',
    '@js': 'dependencies/js',
    '@assets': 'dependencies/assets'
  }
}

export const prod = {
  dependencies: {
    '@css': 'css',
    '@js': 'js',
    '@assets': 'assets'
  }
}

// views
const viewsDir = path.resolve(path.join('.', 'src', 'views'))

export const views = {
  '@components': `${viewsDir}/components`,
  '@commons': `${viewsDir}/commons`
}
