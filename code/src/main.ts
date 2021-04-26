import * as fs from 'fs-extra'
import * as ejs from 'ejs'
import * as yaml from 'yaml'
import * as path from 'path'

import * as aliases from './aliases'
import { CONFIG_FILE_PATH, ENVIRONMENT, VIEWS_PAGES } from './constants'
import { choose, not, resolveAliases, print } from './utils'
import { Config, EnvItem, UserMeta } from './types'

// core
;(async () => {
  // * config-based approach
  const config: Config = yaml.parse(await fs.readFile(CONFIG_FILE_PATH, 'utf8'))
  const mode = config.mode
  const isDev = mode === 'dev'

  const env: EnvItem = choose(isDev, ENVIRONMENT.dev, ENVIRONMENT.prod)
  const { dev: devAliases, prod: prodAliases } = aliases.dependencies
  const dependenciesAliases = choose(isDev, devAliases, prodAliases)
  const viewsAliases = aliases.views

  // prepare output dirs
  const outdir = env.outdir
  const outdirExists = await fs.pathExists(outdir)

  // if does not exist, create it, otherwise empty it.
  if (not(outdirExists)) {
    await fs.mkdir(outdir)
  } else {
    await fs.emptyDir(outdir)
  }

  // in prod mode all dependencies will be copied to outdir
  if (config.mode === 'prod') {
    // create dependencies dir
    const dependenciesPath = `${env.outdir}/dependencies`
    await fs.mkdir(dependenciesPath)
    await fs.copy('src/dependencies', dependenciesPath)
  }

  // shared views util functions
  const utils = {
    resolve: resolveAliases({ ...viewsAliases, ...dependenciesAliases })
  }

  /**
   * * create views structure and parse views
   *  dev
   *    - index.html
   *    - profiles
   *      - edwin.html
   *
   *  prod
   *    - index.html
   *    - profiles
   *      - edwin.html
   *    - dependencies
   *      - css
   *      - js
   *
   * * NOTE: there may be more dependencies
   */
  const [indexViewPath, profileViewPath] = ['index', 'profile'].map(
    (viewName) => `${VIEWS_PAGES}/${viewName}.ejs`
  )

  // * generating index page
  const indexViewTemplate = await fs.readFile(indexViewPath, 'utf8')
  const parsedIndexView = ejs.render(indexViewTemplate, {
    ...utils
  })

  // * generating profiles
  // read and compile profile template
  const profileViewTemplate = await fs.readFile(profileViewPath, 'utf8')
  const profileViewGenerator = ejs.compile(profileViewTemplate)

  // get data files path and the corresponding name of each file (without the extension)
  const dataNamesAndPath = (await fs.readdir(config.data))
    .filter((path) => path.endsWith('.yaml'))
    .map((path) => [path.replace('.yaml', ''), `${config.data}/${path}`])

  // read the data from the files path and also return its corresponding name
  const namesAndRawData = await Promise.all(
    dataNamesAndPath.map(async ([name, path]) => {
      const rawData = await fs.readFile(path, 'utf8')
      return [name, rawData]
    })
  )

  // parse with yaml the raw data, and also return its name
  const namesAndData: [
    string,
    UserMeta
  ][] = namesAndRawData.map(([name, raw]) => [name, yaml.parse(raw)])

  // render the profiles and return an object with information
  // about the each rendered template
  // for example, name is be the name of the output file
  const profilesViewNodes = namesAndData.map(([name, user]) => {
    const renderedProfileView = profileViewGenerator({
      ...utils,
      user
    })

    return {
      name,
      body: renderedProfileView
    }
  })

  // * files will be created based on the structure of this tree
  const tree = {
    index: {
      body: parsedIndexView
    },

    profiles: {
      body: [...profilesViewNodes]
    }
  }

  // create index.html based on the index entry of render tree
  const indexPagePath = `${env.outdir}/index.html`
  await fs.writeFile(indexPagePath, tree.index.body)

  // create profiles directory for profiles
  const profilesDirPath = `${env.outdir}/profiles`
  await fs.mkdir(profilesDirPath)

  // write every profile page to /profiles
  tree.profiles.body.forEach(async (profile) => {
    const profilePagePath = `${env.outdir}/profiles/${profile.name}.html`
    await fs.writeFile(profilePagePath, profile.body)
  })
})()
