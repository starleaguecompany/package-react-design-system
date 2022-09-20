import * as React from 'react';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Element width */
  width?: number;
}

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Block state */
  block?: boolean;
}
