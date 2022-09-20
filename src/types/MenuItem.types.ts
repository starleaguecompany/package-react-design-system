import * as React from 'react';

export interface MenuItem extends React.HTMLAttributes<HTMLDivElement> {
  /** Item value */
  value?: unknown;
  /** Item icon */
  icon?: React.ReactNode;
  /** Item control */
  control?: React.ReactNode;
  /** Hint text */
  hint?: string;
  /** Hint description */
  description?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Active state */
  active?: boolean;
}
