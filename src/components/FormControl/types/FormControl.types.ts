import * as React from 'react'

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  invalid?: boolean
  disabled?: boolean
}

export type HelperTextProps = React.HTMLAttributes<HTMLDivElement>
