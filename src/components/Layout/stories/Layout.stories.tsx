import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Layout } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Layout } from '${reactDSImportPath}'
\`\`\``;

export default {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    componentSubtitle: 'Handling the overall layout of a page',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <React.Fragment>
    <Layout>
      <div style={{ background: 'var(--color-D06)', textAlign: 'center', height: '60px', lineHeight: '60px' }}>
        content
      </div>
    </Layout>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
