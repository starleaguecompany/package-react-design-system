import * as React from 'react';
import { tupleNum } from '@starleaguecompany/package-react-utils';

import { CONTAINER_SIZES } from '../../../constants/sizes';

const RadioButtonSizes = tupleNum(CONTAINER_SIZES.S36, CONTAINER_SIZES.S44, CONTAINER_SIZES.S52);

export type RadioButtonSize = typeof RadioButtonSizes[number];

export type RadioButtonOption = {
  /** Label text */
  label: string;
  /** Value */
  value: string | number;
  /** Disabled state */
  disabled?: boolean;
};

export interface RadioButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The options of RadioButton*/
  options: Array<RadioButtonOption>;
  /** Value */
  value?: string | number;
  /** Default value */
  defaultValue?: string | number;
  /** Size */
  size?: RadioButtonSize;
  /** Change handler */
  onChange?: (value: string | number) => void;
}
