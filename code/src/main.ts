import * as fs from 'fs-extra'
import * as ejs from 'ejs'
import * as yaml from 'yaml'

import * as aliases from './aliases'
import { CONFIG_FILE_PATH, ENVIRONMENT } from './constants'
import { choose, not } from './utils'
import { Config, EnvItem } from './types'

// core
;(async () => {
  // * config-based approach
  const config: Config = yaml.parse(await fs.readFile(CONFIG_FILE_PATH, 'utf8'))
  const mode = config.mode
  const isDev = mode === 'dev'

  const env: EnvItem = choose(isDev, ENVIRONMENT.dev, ENVIRONMENT.prod)
  const dependenciesAliases = aliases.dependencies
  const viewsAliases = aliases.views

  // prepare output dirs
  const outdir = env.outdir
  const outdirExists = await fs.pathExists(outdir)

  // if does not exists, create it, otherwise empty it.
  if (not(outdirExists)) {
    fs.mkdir(outdir)
  } else {
    fs.emptyDir(outdir)
  }
})()
