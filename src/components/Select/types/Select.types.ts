import { Omit } from '@starleaguecompany/package-react-utils'

import { SelectOption, SelectValue, SelectMode } from '../../../types/Select.types'
import { FieldProps } from '../../../types/Field.types'
import { Placement } from '../../../types/Placements.types'
import { InputPlacemenInGroup } from '../../../types/InputPlacemenInGroup'

export { SelectValue, SelectOption }

export interface SelectProps extends Omit<FieldProps<HTMLInputElement, SelectValue>, 'onChange'>, InputPlacemenInGroup {
  /** Select options. Will get better perf than jsx definition */
  options: Array<SelectOption>
  /** Multiple mode */
  mode?: SelectMode
  /** Dropdown menu position */
  placement?: Placement
  /** If `true`, the dropdown menu will change its placement and flip when it's about to overflow its boundary area */
  flip?: boolean
  /** Fixed dropdown menu width. If `true`, the dropdown menu will match the width of the input at all times */
  fixedWidth?: boolean
  /**
   * **Deprecated:** Defines the behavior of the scroll. By default is `true`, when opening a list of options, scrolls it so that the active option is visible to the user
   * @deprecated Since version 0.2.23 Will be removed soon
   */
  scrollIntoView?: boolean
  /** Determine if an icon is being used */
  withCrossIcon?: boolean
  /** Callback function that is fired when the user changes the select value */
  onChange?: (value: SelectValue) => void
}
