import * as React from 'react'

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Whether to allow semi selection*/
  allowHalf?: boolean
  /** Star count */
  count?: number
  /** The default value */
  defaultValue?: number
  /** The current value */
  value?: number
  /** If read only, unable to interact */
  disabled?: boolean
  /** Callback when select value */
  onChange?: (value: number) => void
}
