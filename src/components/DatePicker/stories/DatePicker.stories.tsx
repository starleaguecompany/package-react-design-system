import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { DatePicker } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { DatePicker } from '${reactDSImportPath}'
// Import types
import { DatePickerProps } from '${reactDSImportPath}/lib/DatePicker'
\`\`\``;

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    componentSubtitle: 'Container for displaying data in calendar form.',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => <DatePicker />;
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
