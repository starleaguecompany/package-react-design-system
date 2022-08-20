export type DateRange = {
  /** Start date */
  from?: Date
  /** End date */
  to?: Date
}

export type DateValue = Date | DateRange
export type Mode = 'single' | 'range'

export type DateGenericProps = {
  /** End date */
  maxDate?: Date
  /** Start date */
  minDate?: Date
  /** Range limit */
  rangeLimit?: number
  /** Defines the date (respectively month) of the calendar to be displayed when it is opened */
  defaultDate?: Date
  /** Disabled interval */
  disabledIntervals?: DateRange[]
  /** Change callback */
  onChange?: (range: DateRange) => void
}
