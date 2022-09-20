import { tuple } from '@starleaguecompany/package-react-utils';

export const Placements = tuple(
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'auto-start'
);

export type Placement = typeof Placements[number];
