import * as React from 'react'
import { tuple } from '@starleaguecompany/package-react-utils'

const LinkColors = tuple('blue', 'gray', 'black')
export type LinkColor = typeof LinkColors[number]

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Color */
  color?: LinkColor
  /** Bold */
  strong?: boolean
}
