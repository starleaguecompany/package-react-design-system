import * as React from 'react';

import { SPACE_SIZES } from '../../../constants/spaces';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The indent size */
  size?: typeof SPACE_SIZES[keyof typeof SPACE_SIZES];
}
