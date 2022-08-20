import { LiteralUnion } from '@starleaguecompany/package-react-utils'

import { FieldProps } from '../../../types/Field.types'
import { InputPlacemenInGroup } from '../../../types/InputPlacemenInGroup'

export interface TextInputProps extends FieldProps<HTMLInputElement>, InputPlacemenInGroup {
  /** The type of input */
  type?: LiteralUnion<'email' | 'hidden' | 'password' | 'search' | 'text' | 'url' | 'tel', string>
}
