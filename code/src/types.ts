type Mode = 'dev' | 'prod'

export type Config = {
  mode: Mode
  data: string
}

export type EnvItem = {
  outdir: string
  name: Mode
}

export type Env = {
  dev: EnvItem
  prod: EnvItem
}

export type Alias = {
  [key: string]: string
}

type SocialMedia = {
  name: string
  url: string
}

type Pictures = {
  cover: string
  portrait: string
}

export type UserMeta = {
  name: string
  username: string
  pictures: Pictures
  socialMedia: SocialMedia[],
  bio: string[],
  skills: string[]
}
