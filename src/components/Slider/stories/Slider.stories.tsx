import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Slider } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Slider } from '${reactDSImportPath}'
// Import types
import { SliderProps } from '${reactDSImportPath}/lib/Slider'
\`\`\``;

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    componentSubtitle: 'A Slider component for displaying current value and intervals in range',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const [value, setValue] = React.useState(50000);

  const handleChange = React.useCallback(
    value => {
      setValue(value);
    },
    [value]
  );

  return <Slider min={1000} max={100000} step={1} value={value} onChange={handleChange} />;
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => <Slider value={42} disabled />;
