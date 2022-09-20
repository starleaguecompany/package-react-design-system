import { LiteralUnion } from '@starleaguecompany/package-react-utils';

export type InputPlacemenInGroup = {
  /** The position of input in a group. Needed for ControlGroup*/
  positionInGroup?: LiteralUnion<'start' | 'middle' | 'end', string>;
  /** The direction of inputs in a group. Needed for ControlGroup*/
  directionGroup?: LiteralUnion<'horizontal' | 'vertical', string>;
};
