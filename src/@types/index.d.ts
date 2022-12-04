export * from './article'
export * from './authorization'
export * from './modal'

export type Rules = Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
export type VisibilityState = 'visible' | 'hidden'

export interface Item {
  label: string
  value: string
}
