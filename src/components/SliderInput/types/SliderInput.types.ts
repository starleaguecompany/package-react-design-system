import { NumberInputProps } from '../../NumberInput'
import { Omit } from '@starleaguecompany/package-react-utils'
import { InputPlacemenInGroup } from '../../../types/InputPlacemenInGroup'

export interface SliderInputProps extends Omit<NumberInputProps, 'format'>, InputPlacemenInGroup {
  /** Logarithmic scale */
  logarithmic?: boolean
}
