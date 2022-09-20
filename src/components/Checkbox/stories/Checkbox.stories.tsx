import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Checkbox } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Checkbox } from '${reactDSImportPath}'
// Import types
import { CheckboxProps } from '${reactDSImportPath}/lib/Checkbox'
\`\`\``;

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    componentSubtitle: 'The Checkbox component allows user to select multiple items from a list',
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
      <Checkbox checked={checked} onChange={handleChange}>
        Checkbox default
      </Checkbox>
    </React.Fragment>
  );
};

const variants = [
  { label: 'Checkbox default' },
  { label: 'Checkbox disabled', disabled: true },
  { label: 'Checkbox checked', checked: true },
  { label: 'Checkbox checked and disabled', disabled: true, checked: true },
];

export const Variants: Story = () => (
  <React.Fragment>
    {variants.map(({ label, ...args }, i) => (
      <div key={i} className="h-mb-12">
        <Checkbox {...args}>{label}</Checkbox>
      </div>
    ))}
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
