import * as React from 'react'
import { tuple, tupleNum } from '@starleaguecompany/package-react-utils'

const HeadingLevels = tupleNum(1, 2, 3, 4, 5, 6)
const SizeRanges = tuple('desktop', 'mobile')

export type SizeRange = typeof SizeRanges[number]
export type HeadingLevel = typeof HeadingLevels[number]

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Element type */
  as?: keyof JSX.IntrinsicElements
  /** Heading level */
  level: HeadingLevel
  /**
   * **Deprecated:** Font size range
   * @deprecated Since version 0.2.21 Will be removed soon
   */
  sizeRange?: SizeRange
}
