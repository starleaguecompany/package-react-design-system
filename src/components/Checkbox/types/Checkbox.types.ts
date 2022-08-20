import * as React from 'react'

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  /** Name */
  name?: string
  /** Value */
  value?: any
  /** Checked state */
  checked?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Whether the input is invalid */
  readOnly?: boolean
  /** Check handler */
  onChange?: React.FormEventHandler<HTMLInputElement>
}
