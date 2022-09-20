import { Omit, tuple } from '@starleaguecompany/package-react-utils';

import { FieldProps } from '../../../types/Field.types';

const DecimalSeparators = tuple('.', ',');

export type DecimalSeparator = typeof DecimalSeparators[number];

export interface NumberInputProps extends Omit<FieldProps<HTMLInputElement, number | ''>, 'onChange'> {
  /** The minimum value */
  min?: number;
  /** The maximum value */
  max?: number;
  /** The number to which the current value rounded. It can be an integer or decimal */
  step?: number;
  /** The decimal separator */
  decimalSeparator?: DecimalSeparator;
  /** The thousand separator */
  thousandSeparator?: string;
  /** Specifies the number of decimal places */
  decimalScale?: number;
  /** Enable for adding zeros to the end to match the decimal scale */
  fixedDecimalScale?: boolean;
  /** Specifies the format of the value presented, puts numbers instead of a hash (ex. '##/##') */
  format?: string;
  /** Callback function that is fired when the user changes the input's value */
  onChange?: (value: number | undefined) => void;
}
