import * as React from 'react';
import { DateRange, Mode } from '../../../types/Date.types';
import { Omit } from '@starleaguecompany/package-react-utils';

export type DatePickerProps = {
  /** Mode */
  mode?: Mode;
  /** Selected dates */
  selection?: DateRange;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;
