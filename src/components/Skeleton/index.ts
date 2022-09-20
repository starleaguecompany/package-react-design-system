import * as React from 'react';

import { SkeletonProps } from './types/Skeleton.types';
import SkeletonRoot from './src/Skeleton';
import Avatar from './src/Avatar';
import Button from './src/Button';
import Paragraph from './src/Paragraph';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLElement>> {
  Avatar: typeof Avatar;
  Button: typeof Button;
  Paragraph: typeof Paragraph;
}

const Skeleton = SkeletonRoot as CompoundedComponent;

Skeleton.Avatar = Avatar;
Skeleton.Button = Button;
Skeleton.Paragraph = Paragraph;

export { Skeleton, SkeletonProps };
