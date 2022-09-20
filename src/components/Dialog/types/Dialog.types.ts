import * as React from 'react';
import { Omit } from '@starleaguecompany/package-react-utils';

export interface DialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal dialog is visible or not */
  visible?: boolean;
  /** Whether the modal dialog is fullscreen */
  fullscreen?: boolean;
  /** Whether a close (x) button is visible on top right of the modal dialog or not */
  closable?: boolean;
  /** Specify a function that will be called when a user clicks the close button */
  onClose?: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The modal dialog's title */
  title?: React.ReactNode;
  /** The modal dialog's subtitle */
  subtitle?: string;
  /** The modal dialog's Icon */
  icon?: React.ReactNode;
}

export type ContentProps = React.HTMLAttributes<HTMLDivElement>;

export type FooterProps = React.HTMLAttributes<HTMLDivElement>;
