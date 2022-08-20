import { Omit } from '@starleaguecompany/package-react-utils'
import { tuple } from '@starleaguecompany/package-react-utils'

import { FieldProps } from '../../../types/Field.types'
import { InputPlacemenInGroup } from '../../../types/InputPlacemenInGroup'
import { DateGenericProps, DateRange } from '../../../types/Date.types'
import { Placement } from '../../../types/Placements.types'

type DateInputGeneralProps = {
  /** Date format */
  dateFormat?: DateFormat | [DateFormat, DateFormat]
  /** Placement of the Calendar */
  placement?: Placement
}

type DateInputSingleProps = Omit<FieldProps<HTMLInputElement, Date>, 'onChange'> & {
  /** Mode */
  mode?: 'single'
}

type DateInputRangeProps = Omit<FieldProps<HTMLInputElement, DateRange>, 'onChange'> & {
  /** Mode */
  mode?: 'range'
}

const DateFormats = tuple('dd', 'dd MMMM', 'dd.MM.yyyy', 'dd MMMM yyyy')

export type DateFormat = typeof DateFormats[number]

export type DateInputProps = InputPlacemenInGroup &
  DateGenericProps &
  DateInputGeneralProps &
  (DateInputSingleProps | DateInputRangeProps)
