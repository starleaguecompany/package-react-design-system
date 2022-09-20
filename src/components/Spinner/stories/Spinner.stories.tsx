import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { CONTENT_SIZES } from '../../../constants/sizes';

import * as Grid from '../../Grid';

import { Spinner } from '..';
import { SpinnerProps } from '../types/Spinner.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Spinner } from '${reactDSImportPath}'
// Import types
import { SpinnerProps } from '${reactDSImportPath}/lib/Spinner'
\`\`\``;

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    componentSubtitle: 'A spinner for displaying loading state of a page or a section',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => <Spinner />;
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

const variants = [{ size: CONTENT_SIZES.S16 }, { size: CONTENT_SIZES.S20 }, { size: CONTENT_SIZES.S24 }];

export const Sizes: Story = () => (
  <Grid.Row gutter={20}>
    {variants.map((args, i) => (
      <Grid.Col key={i}>
        <Spinner {...(args as SpinnerProps)} />
      </Grid.Col>
    ))}
  </Grid.Row>
);
