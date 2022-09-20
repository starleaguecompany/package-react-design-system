import * as React from 'react';
import { Omit } from '@starleaguecompany/package-react-utils';

export interface MenuItemGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Group label */
  label: React.ReactNode;
}
