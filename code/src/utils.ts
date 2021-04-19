export const print = console.log.bind(console)

export const choose = (condition: boolean, ifTrue: any, ifFalse: any) =>
  condition ? ifTrue : ifFalse

export const not = (bool: boolean) => !bool
