import * as React from 'react';

export interface CountDownProps extends React.HTMLAttributes<HTMLSpanElement> {
  from: number;
  to: number;
  speed?: number;
  interval?: number;
  formatter?: (value: number) => number | string;
}
