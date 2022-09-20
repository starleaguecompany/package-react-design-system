import * as React from 'react';
import { Omit } from '@starleaguecompany/package-react-utils';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current TabPane's index */
  defaultIndex?: number;
  /** Callback executed when active tab is changed */
  onChange?: (key: number) => void;
}
