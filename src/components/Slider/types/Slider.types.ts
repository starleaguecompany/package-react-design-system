import * as React from 'react';
import { Omit } from '@starleaguecompany/package-react-utils';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The minimum value the slider can slide to */
  min?: number;
  /** The maximum value the slider can slide to */
  max?: number;
  /** The granularity the slider can step through values. Must greater than 0, and be divided by (max - min) */
  step?: number;
  /** The value of slider */
  value?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Logarithmic scale */
  logarithmic?: boolean;
  /** Callback function that is fired when the user changes the slider's value */
  onChange?: (value: number) => void;
}
