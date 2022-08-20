import * as React from 'react'
import { Omit } from '@starleaguecompany/package-react-utils'

export interface SheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the sheet is visible or not */
  visible?: boolean
  /** Whether a close (x) button is visible on top right of the sheet or not */
  closable?: boolean
  /** Whether the sheet is fullscreen */
  fullscreen?: boolean
  /** Specify a function that will be called when a user clicks the close button */
  onClose?: React.MouseEventHandler<HTMLDivElement>
}

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The sheet's title */
  title?: React.ReactNode
  /** The sheet's subtitle */
  subtitle?: string
  /** Whether a close (x) button is visible on top right of the sheet or not */
  closable?: boolean
}

export type FooterProps = React.HTMLAttributes<HTMLDivElement>
