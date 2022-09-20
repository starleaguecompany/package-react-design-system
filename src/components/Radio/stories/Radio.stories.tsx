import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Radio } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Radio } from '${reactDSImportPath}'
// Import types
import { RadioProps } from '${reactDSImportPath}/lib/Radio'
\`\`\``;

export default {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    componentSubtitle: 'The Radio component allows user to select a single item from a list',
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
      <Radio checked={checked} onChange={handleChange}>
        Radio default
      </Radio>
    </React.Fragment>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

const variants = [
  { label: 'Radio default' },
  { label: 'Radio disabled', disabled: true },
  { label: 'Radio checked', checked: true },
  { label: 'Radio checked and disabled', disabled: true, checked: true },
];

export const Variants: Story = () => (
  <React.Fragment>
    {variants.map(({ label, ...args }, i) => (
      <div key={i} className="h-mb-12">
        <Radio {...args}>{label}</Radio>
      </div>
    ))}
  </React.Fragment>
);
// Basic.storyName = 'Radio'
