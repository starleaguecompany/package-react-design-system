import * as React from 'react'

import { CONTENT_SIZES } from '../../../constants/sizes'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size */
  size?: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES]
}
