import * as React from 'react'
import { Omit } from '@starleaguecompany/package-react-utils'
import { DateGenericProps, DateRange, DateValue, Mode } from '../../../types/Date.types'

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>, DateGenericProps {
  /** Mode */
  mode?: Mode
  /** Selected dates */
  selection?: DateRange
}

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  month: Date
  onChange?: (direction: string | undefined) => void
}

export interface MonthProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  month: Date
  selected?: DateValue
  /** End date */
  maxDate?: Date | undefined
  /** Start date */
  minDate?: Date | undefined
  /** Range limit */
  rangeLimit?: number
  /** Disabled interval */
  disabledIntervals?: DateRange[]
  selectionStart?: Date | undefined
  selectionEnd?: Date | undefined
  selectionInProgress?: boolean
  /** Mode */
  mode?: Mode
  onChange?: (range: DateRange) => void
}

export interface WeekProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  date: Date
  month: Date
  selected?: DateValue
  /** End date */
  maxDate?: Date | undefined
  /** Start date */
  minDate?: Date | undefined
  /** Disabled interval */
  disabledIntervals?: DateRange[]
  selectionStart?: Date | undefined
  selectionEnd?: Date | undefined
  highlightedStart?: Date | undefined
  highlightedEnd?: Date | undefined
  /** Mode */
  mode?: Mode
  onChange?: (date: Date) => void
  onMouseEnter?: (event: React.SyntheticEvent<HTMLSpanElement>) => void
}

export interface DayProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  date: Date
  weekend?: boolean
  active?: boolean
  disabled?: boolean
  highlighted?: boolean
  today?: boolean
  onChange?: (date: Date) => void
}
