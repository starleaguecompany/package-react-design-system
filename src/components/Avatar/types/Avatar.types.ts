import * as React from 'react';

import { CONTAINER_SIZES } from '../../../constants/sizes';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The address of the image for an image avatar */
  src?: string;
  /** The size of the avatar */
  size?: typeof CONTAINER_SIZES[keyof typeof CONTAINER_SIZES];
}
