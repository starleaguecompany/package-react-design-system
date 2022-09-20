import * as React from 'react';

import { UploaderProps } from './types/Uploader.types';
import UploaderRoot from './src/Uploader';
import UploaderItem from './src/UploaderItem';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<UploaderProps & React.RefAttributes<HTMLElement>> {
  Item: typeof UploaderItem;
}

const Uploader = UploaderRoot as CompoundedComponent;
Uploader.Item = UploaderItem;

export { Uploader, UploaderProps };
