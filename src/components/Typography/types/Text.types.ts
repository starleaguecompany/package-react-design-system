import * as React from 'react'

import { FONT_SIZES } from '../../../constants/sizes'

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element type */
  as?: keyof JSX.IntrinsicElements
  /** Size */
  size?: typeof FONT_SIZES[keyof typeof FONT_SIZES]
  /** Bold */
  strong?: boolean
  /** Uppercase */
  uppercase?: boolean
  /** Lowercase */
  lowercase?: boolean
  /** Capitalize */
  capitalize?: boolean
  /** Truncate text */
  truncate?: boolean
  /** Nowrap text */
  nowrap?: boolean
  /** Strikethrough text */
  lineThrough?: boolean
}
