import * as React from 'react';
import { tuple } from '@starleaguecompany/package-react-utils';

import { SPACE_SIZES } from '../../../constants/spaces';

const SpaceDirections = tuple('horizontal', 'vertical', 'row-reverse', 'column-reverse');
const SpaceAligns = tuple('start', 'end', 'center', 'baseline');
const SpaceJustifies = tuple('start', 'end', 'center', 'space-between', 'space-around', 'stretch');

export type SpaceDirection = typeof SpaceDirections[number];
export type SpaceAlign = typeof SpaceAligns[number];
export type SpaceJustify = typeof SpaceJustifies[number];
export type SpaceSize = typeof SPACE_SIZES[keyof typeof SPACE_SIZES];

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The space direction */
  direction?: SpaceDirection;
  /** Horizontal and vertical space sizes. Available space size value: 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /** Align items */
  align?: SpaceAlign;
  /** Justify items */
  justify?: SpaceJustify;
  /** Inline layout */
  inline?: boolean;
  /** Wrap items */
  wrap?: boolean;
}
