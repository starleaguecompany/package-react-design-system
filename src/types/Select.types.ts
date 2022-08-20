import { MenuItem } from './MenuItem.types'

export interface SelectOption extends MenuItem {
  /** Label text */
  label: string
  /** Value */
  value: string | number
}

export type SelectValue = string | number | Array<string | number>

export type SelectMode = 'multiple'
