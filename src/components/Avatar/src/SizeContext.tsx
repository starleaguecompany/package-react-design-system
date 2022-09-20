import * as React from 'react';

import { AvatarProps } from '../types/Avatar.types';

const SizeContext = React.createContext<AvatarProps['size'] | undefined>(undefined);

export interface SizeContextProps {
  size?: AvatarProps['size'];
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => (
  <SizeContext.Consumer>
    {originSize => <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>}
  </SizeContext.Consumer>
);

export default SizeContext;
