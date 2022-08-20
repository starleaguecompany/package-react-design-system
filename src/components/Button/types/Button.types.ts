import * as React from 'react'
import { tuple } from '@starleaguecompany/package-react-utils'

import { COLORS } from '../../../constants/colors'
import { CONTAINER_SIZES } from '../../../constants/sizes'

const ButtonVariants = tuple('outlined', 'primary', 'secondary', 'text')

export type ButtonVariant = typeof ButtonVariants[number]

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** View variant */
  variant?: ButtonVariant
  /** Color */
  color?: typeof COLORS[keyof typeof COLORS]
  /** Size */
  size?: typeof CONTAINER_SIZES[keyof typeof CONTAINER_SIZES]
  /** Block layout */
  block?: boolean
  /** Loading */
  loading?: boolean
  /** Active state */
  active?: boolean
}
