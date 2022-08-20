import * as React from 'react'
import { tuple } from '@starleaguecompany/package-react-utils'

const RowAligns = tuple('top', 'middle', 'bottom')
const RowJustifies = tuple('start', 'end', 'center', 'space-around', 'space-between')

export type RowAlign = typeof RowAligns[number]
export type RowJustify = typeof RowJustifies[number]
export type RowGutter = number

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Horizontal and vertical gutters */
  gutter?: RowGutter | [RowGutter, RowGutter]
  /** Vertical align */
  align?: RowAlign
  /** Horizontal alignment */
  justify?: RowJustify
  /** Wrap columns */
  wrap?: boolean
}
