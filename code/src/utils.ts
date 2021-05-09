import { Alias } from './types'

export const print = console.log.bind(console)

export const choose = (condition: boolean, ifTrue: any, ifFalse: any) =>
  condition ? ifTrue : ifFalse

export const not = (bool: boolean) => !bool

export const resolveAliases = (aliases: Alias) => (path: string) => {
  const segments = path.split('/')
  const pathWithAliasesReplaced = segments
    .map((segment) => {
      const isAlias = segment.startsWith('@')
      const foundAlias = isAlias && aliases[segment]
      return foundAlias ? foundAlias : segment
    })
    .join('/')

  return pathWithAliasesReplaced
}
