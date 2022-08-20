import * as React from 'react'
import { Omit, tuple } from '@starleaguecompany/package-react-utils'

import { Placement } from '../../../types/Placements.types'

const TriggerModes = tuple('hover', 'click')

export type TriggerMode = typeof TriggerModes[number]

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tooltip title */
  title?: string
  /** Tooltip content */
  content?: string
  /** Tooltip footer */
  footer?: React.ReactNode
  /** Tooltip width */
  width?: string | number
  /** Whether a close (x) button is visible on top right of the Tooltip or not. **NOTE, title must be set for showing close icon** */
  closable?: boolean
  /** Placement position */
  placement?: Placement
  /** Specify a function that will be called when a user clicks the close button */
  onClose?: React.MouseEventHandler<HTMLDivElement>
}
