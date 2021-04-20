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

export type UserMeta = {
  name: string
  age: number
  country: string
  role: string
  socialMedia: SocialMedia[],
  bio: string[],
  skills: string[]
}
