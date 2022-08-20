import * as React from 'react'

import { tuple } from '@starleaguecompany/package-react-utils'
import { COLORS } from '../../../constants/colors'

const BadgeVariants = tuple('primary', 'secondary')
const BadgeShapes = tuple('circle', 'round')
const BadgePlacements = tuple('top-end', 'bottom-end')
const BadgeColors = tuple('white', ...Object.values(COLORS))

export type BadgeVariant = typeof BadgeVariants[number]
export type BadgeShape = typeof BadgeShapes[number]
export type BadgePlacement = typeof BadgePlacements[number]
export type BadgeColor = typeof BadgeColors[number]

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text */
  text?: string | number | React.ReactNode
  /** View variant */
  variant?: BadgeVariant
  /** Color */
  color?: BadgeColor
  /** Shape */
  shape?: BadgeShape
  /** Placement of the badge relatively to a child element */
  placement?: BadgePlacement
}
