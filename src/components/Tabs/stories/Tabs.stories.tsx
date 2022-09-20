import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu } from '@starleaguecompany/react-icons';

import { Icon } from '../../Icon';

import { Tabs } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Tabs } from '${reactDSImportPath}'
// Import types
import { TabsProps } from '${reactDSImportPath}/lib/Tabs'
\`\`\``;

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: {
    TabPane: Tabs.TabPane,
  },
  parameters: {
    componentSubtitle: 'Use Tabs to organize your content into logical groups',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const [activeKey, setActiveKey] = React.useState<string>('tab-1');

  const handleChangeTab = React.useCallback(
    key => {
      setActiveKey(key);
    },
    [activeKey]
  );

  return (
    <Tabs onChange={handleChangeTab}>
      <Tabs.TabPane title="Все">Content of Tab Pane 1</Tabs.TabPane>
      <Tabs.TabPane title="Личные финансы">Content of Tab Pane 2</Tabs.TabPane>
      <Tabs.TabPane title="ОСАГО">Content of Tab Pane 3</Tabs.TabPane>
    </Tabs>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

const makeIconText = (text: string) => (
  <React.Fragment>
    <Icon icon={<Menu />} size={16} />
    {text}
  </React.Fragment>
);

export const WithIcon: Story = () => {
  return (
    <Tabs>
      <Tabs.TabPane title={makeIconText('Все')}>Content of Tab Pane 1</Tabs.TabPane>
      <Tabs.TabPane title={makeIconText('Личные финансы')}>Content of Tab Pane 2</Tabs.TabPane>
      <Tabs.TabPane title={makeIconText('ОСАГО')}>Content of Tab Pane 3</Tabs.TabPane>
    </Tabs>
  );
};

export const ManyTabs: Story = () => {
  return (
    <Tabs>
      {Array.from(new Array(20)).map((_, key) => (
        <Tabs.TabPane key={key} title={`Личные финансы ${key + 1}`}>
          Content of Tab Pane {key + 1}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
