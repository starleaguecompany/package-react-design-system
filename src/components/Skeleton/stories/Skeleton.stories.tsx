import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Space } from '../../Space';

import { Skeleton } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Skeleton } from '${reactDSImportPath}'
// Import types
import { SkeletonProps } from '${reactDSImportPath}/lib/Skeleton'
\`\`\``;

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  subcomponents: {
    Avatar: Skeleton.Avatar,
    Button: Skeleton.Button,
    Paragraph: Skeleton.Paragraph,
  },
  parameters: {
    docs: {
      componentSubtitle:
        "Provide a placeholder while you wait for content to load, or to visualise content that doesn't exist yet",
      docs: {
        description: {
          component: Import,
        },
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <Skeleton>
    <Space size={40} align="start">
      <Skeleton.Avatar />
      <Space direction="vertical" align="start" size={20}>
        <Skeleton.Paragraph />
        <Skeleton.Paragraph />
        <Skeleton.Paragraph width={65} />
      </Space>
      <Skeleton.Button />
    </Space>
  </Skeleton>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const WithBlockButton: Story = () => (
  <Skeleton>
    <Space size={40} align="start">
      <Skeleton.Avatar />
      <Space direction="vertical" align="start" size={20}>
        <Skeleton.Paragraph />
        <Skeleton.Paragraph />
        <Skeleton.Paragraph width={65} />
        <Skeleton.Button block />
      </Space>
    </Space>
  </Skeleton>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
