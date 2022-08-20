import * as React from 'react'
import { tupleNum } from '@starleaguecompany/package-react-utils'

const ColSpans = tupleNum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)

export type ColSpan = typeof ColSpans[number]

export interface BreakPointParams extends React.HTMLAttributes<HTMLDivElement> {
  /** Col size */
  span?: ColSpan
  /** Col order */
  order?: number
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Col size */
  span?: ColSpan
  /** Col order */
  order?: number
  /** Col break points params */
  breakpoints?: { mobile?: BreakPointParams; tablet?: BreakPointParams }
}
