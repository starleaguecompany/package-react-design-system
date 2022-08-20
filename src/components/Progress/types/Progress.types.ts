import * as React from 'react'
import { tupleNum } from '@starleaguecompany/package-react-utils'

const ProgressSizes = tupleNum(2, 6)

export type ProgressSize = typeof ProgressSizes[number]

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** To set the completion percentage */
  percent?: number
}
