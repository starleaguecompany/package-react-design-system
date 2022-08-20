import * as React from 'react'
import { Omit, tuple } from '@starleaguecompany/package-react-utils'

const AccordionSeparators = tuple('divider', 'space')
const AccordionBackgrounds = tuple('white')

export type AccordionSeparator = typeof AccordionSeparators[number]
export type AccordionBackground = typeof AccordionBackgrounds[number]

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current Items indexes */
  defaultIndex?: Array<number>
  /** The accordion item's separator */
  separator?: AccordionSeparator
  /** The accordion item's background */
  background?: AccordionBackground
  /** Defines the behavior of the scroll. By default is true, when opening an item, scrolls the screen so that the element is visible to the user */
  scrollIntoView?: boolean
  /** Callback executed when active item is changed */
  onChange?: (indexes: Array<number>) => void
}

export interface AccordionItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Active state */
  active?: boolean
  /** The accordion item's title */
  title?: React.ReactNode
  /** The accordion item's subtitle */
  subtitle?: string
  /** The accordion item's Icon */
  icon?: React.ReactNode
  /** Defines the behavior of the scroll. Should be set in Accordion props */
  scrollIntoView?: boolean
  /** Callback executed when active item is changed */
  onCollapse?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
}
