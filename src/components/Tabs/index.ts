import * as React from 'react';

import { TabsProps } from './types/Tabs.types';
import TabsRoot from './src/Tabs';
import TabPane from './src/TabPane';

interface CompoundedComponent extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLElement>> {
  TabPane: typeof TabPane;
}

const Tabs = TabsRoot as CompoundedComponent;

Tabs.TabPane = TabPane;

export { Tabs, TabsProps };
