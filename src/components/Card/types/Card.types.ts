import * as React from 'react';
import { tupleNum, tuple } from '@starleaguecompany/package-react-utils';

import { COLORS } from '../../../constants/colors';

const CardVariants = tuple('outlined', 'primary');
const CardSizes = tupleNum(16, 24, 32, 40);
const CardColors = tuple('light', 'dark', COLORS.GREEN, COLORS.BLUE, COLORS.RED, COLORS.ORANGE);

export type CardVariant = typeof CardVariants[number];
export type CardSize = typeof CardSizes[number];
export type CardColor = typeof CardColors[number];

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** View variant */
  variant?: CardVariant;
  /** Size */
  size?: CardSize;
  /** Color */
  color?: CardColor;
  /** Shadow */
  shadow?: boolean;
}
