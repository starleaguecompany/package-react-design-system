import { Omit } from '@starleaguecompany/package-react-utils'
import * as React from 'react'

import { SelectOption } from '../../../types/Select.types'
import { FieldProps } from '../../../types/Field.types'
import { Placement } from '../../../types/Placements.types'
import { InputPlacemenInGroup } from '../../../types/InputPlacemenInGroup'

export { SelectOption as AutocompleteOption }

export type AutocompleteValue = string | number | undefined

export interface AutocompleteProps
  extends Omit<FieldProps<HTMLTextAreaElement, AutocompleteValue>, 'onChange'>,
    InputPlacemenInGroup {
  /**
   * **Deprecated:** The input postfix
   * @deprecated Since version 0.2.24 Will be removed soon
   */
  postfix?: string | undefined
  /** Select options. Will get better perf than jsx definition */
  options: Array<SelectOption>
  /** Dropdown menu position */
  placement?: Placement
  /** Fixed dropdown menu width. If `true`, the dropdown menu will match the width of the input at all times */
  fixedWidth?: boolean
  /** Allows to replace default message with custom component when no result matches */
  notFoundContent?: React.ReactNode
  /** Autocomplete height adjusts to label content. **NOTE, should be used with mobile devices only** */
  resizable?: boolean
  /** Defines the behavior of the scroll. By default is `true`, when opening a list of options, scrolls it so that the active option is visible to the user */
  scrollIntoView?: boolean
  /** Called when searching items */
  onSearch?: (value: string) => void
  /** Callback function that is fired when the user changes the select value */
  onChange?: (value: AutocompleteValue) => void
}
