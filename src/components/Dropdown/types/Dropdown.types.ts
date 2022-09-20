import { Omit } from '@starleaguecompany/package-react-utils';

import { SelectOption, SelectValue, SelectMode } from '../../../types/Select.types';
import { Placement } from '../../../types/Placements.types';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** The select default value */
  defaultValue?: SelectValue;
  /** The select value */
  value?: SelectValue;
  /** Placement position */
  placement?: Placement;
  /** Dropdown options. Will get better perf than jsx definition */
  options: Array<SelectOption>;
  /** Multiple mode */
  mode?: SelectMode;
  /** Change callback */
  onChange?: (value: SelectValue) => void;
  /** Callback executed when dropdown is opening */
  onOpen?: () => void;
  /** Callback executed when dropdown is closing */
  onClose?: () => void;
}
