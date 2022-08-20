import * as React from 'react'
import { Omit } from '@starleaguecompany/package-react-utils'

// @ts-ignore
export interface FieldProps<T, U = string | undefined> extends Omit<React.InputHTMLAttributes<T>, 'type'> {
  /** The input default value */
  defaultValue?: U
  /** The input value */
  value?: U
  /** The input icon */
  icon?: React.ReactNode
  /** The input label */
  label?: string
  /** The input postfix */
  postfix?: string | undefined
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is invalid */
  invalid?: boolean
  /** Whether the input is readOnly */
  readOnly?: boolean
  /** Whether the input has autoFocus */
  autoFocus?: boolean
  /** Loading */
  loading?: boolean
  /** Callback function that is fired when the user changes the input's value */
  onChange?: (event: React.FormEvent<T>) => void
}
