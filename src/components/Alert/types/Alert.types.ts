import * as React from 'react'
import { Omit, tuple } from '@starleaguecompany/package-react-utils'

import { COLORS } from '../../../constants/colors'

const AlertColors = tuple('light', 'dark', COLORS.GREEN, COLORS.ORANGE, COLORS.RED, COLORS.BLUE)

export type AlertColor = typeof AlertColors[number]

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The alert's title */
  title?: React.ReactNode
  /** The alert's subtitle */
  subtitle?: React.ReactNode
  /** The alert's Icon */
  icon?: React.ReactNode
  /** Whether the Alert can be closed */
  closable?: boolean
  /** Color */
  color?: AlertColor
  /** Footer content */
  footer?: React.ReactNode
  /** Callback executed when tag is closed */
  onClose?: React.MouseEventHandler<HTMLSpanElement>
}
