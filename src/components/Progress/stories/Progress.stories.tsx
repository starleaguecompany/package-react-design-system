import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Progress } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Progress } from '${reactDSImportPath}'
// Import types
import { ProgressProps } from '${reactDSImportPath}/lib/Progress'
\`\`\``;

export default {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    componentSubtitle: 'Display the current progress of an operation flow',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <React.Fragment>
    <Progress percent={30} />
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
