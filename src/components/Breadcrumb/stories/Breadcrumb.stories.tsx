import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu } from '@starleaguecompany/react-icons';

import { Icon } from '../../Icon';

import { Breadcrumb } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Breadcrumb } from '${reactDSImportPath}'
// Import types
import { BreadcrumbProps } from '${reactDSImportPath}/lib/Breadcrumb'
\`\`\``;

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    Item: Breadcrumb.Item,
  },
  parameters: {
    componentSubtitle:
      'A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <React.Fragment>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Сравни.ру</Breadcrumb.Item>
      <Breadcrumb.Item href="/rko">Для бизнеса</Breadcrumb.Item>
      <Breadcrumb.Item href="/rko">РКО</Breadcrumb.Item>
    </Breadcrumb>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const WithIcon: Story = () => (
  <React.Fragment>
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <Icon size={16} icon={<Menu />} /> Сравни.ру
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/rko">
        <Icon size={16} icon={<Menu />} /> Для бизнеса
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/rko">
        <Icon size={16} icon={<Menu />} /> РКО
      </Breadcrumb.Item>
    </Breadcrumb>
  </React.Fragment>
);
WithIcon.parameters = {
  docs: {
    storyDescription: 'Breadcrumb components can contain an Icon',
  },
};
