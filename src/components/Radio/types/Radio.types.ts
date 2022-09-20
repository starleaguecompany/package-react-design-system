import * as React from 'react';

export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  /** Name */
  name?: string;
  /** Value */
  value?: any;
  /** Checked state */
  checked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** readOnly state */
  readOnly?: boolean;
  /** Check handler */
  onChange?: React.FormEventHandler<HTMLInputElement>;
}
