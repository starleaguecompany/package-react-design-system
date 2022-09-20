import * as React from 'react';
import { Props as InputMaskProps } from 'react-input-mask';
import { Omit } from '@starleaguecompany/package-react-utils';

import { FieldProps } from '../../../types/Field.types';
import { InputPlacemenInGroup } from '../../../types/InputPlacemenInGroup';

export interface MaskInputProps
  extends Omit<FieldProps<HTMLInputElement>, 'onChange'>,
    Omit<InputMaskProps, 'defaultValue' | 'value'>,
    InputPlacemenInGroup {
  /** Callback function that is fired when the user changes the input's value */
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}
