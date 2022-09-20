import * as React from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Carousel title */
  title?: string;
  /** Enable this property, if gradient on the left and right sides should be visible */
  gradient?: boolean;
}
