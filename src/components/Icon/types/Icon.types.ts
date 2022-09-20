import * as React from 'react';
import { tuple } from '@starleaguecompany/package-react-utils';

import { COLORS } from '../../../constants/colors';
import { CONTENT_SIZES } from '../../../constants/sizes';

const IconShapes = tuple('circle', 'round');
// const IconModes = tuple('fill', 'outline')

export type IconShape = typeof IconShapes[number];

// export type IconMode = typeof IconModes[number]

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Icon element */
  icon?: React.ReactNode;
  /** Size */
  size?: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES];
  /** Color */
  strong?: boolean;
  /** Color */
  color?: typeof COLORS[keyof typeof COLORS];
  /** Can be set icon shape */
  shape?: IconShape;
}
