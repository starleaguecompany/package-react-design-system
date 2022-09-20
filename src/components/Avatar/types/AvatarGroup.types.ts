import * as React from 'react';

import { CONTAINER_SIZES } from '../../../constants/sizes';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size */
  size?: typeof CONTAINER_SIZES[keyof typeof CONTAINER_SIZES];
}
