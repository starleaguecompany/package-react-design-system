import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Switch } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Switch } from '${reactDSImportPath}'
// Import types
import { SwitchProps } from '${reactDSImportPath}/lib/Switch'
\`\`\``;

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    componentSubtitle:
      'The Switch component is used to switch between two options and the result of the change is immediate',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
  };

  return (
    <React.Fragment>
      <Switch checked={checked} onChange={handleChange}>
        Switch default
      </Switch>
    </React.Fragment>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

const variants = [
  { label: 'Switch default' },
  { label: 'Switch disabled', disabled: true },
  { label: 'Switch checked', checked: true },
  { label: 'Switch checked and disabled', disabled: true, checked: true },
];

export const Variants: Story = () => (
  <React.Fragment>
    {variants.map(({ label, ...args }, i) => (
      <div key={i} className="h-mb-12">
        <Switch {...args}>{label}</Switch>
      </div>
    ))}
  </React.Fragment>
);
