import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Space } from '../../Space';

import { Avatar, AvatarGroup } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Avatar } from '${reactDSImportPath}'
// Import types
import { AvatarProps } from '${reactDSImportPath}/lib/Avatar'
\`\`\``;

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    componentSubtitle:
      'The Avatar component is used to represent users. And should only be used for avatars and logotypes',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <Space size={12}>
    <Avatar size={60}>U</Avatar>
    <Avatar size={60} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
  </Space>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const WithText: Story = () => <Avatar size={52}>U</Avatar>;

export const WithImage: Story = () => (
  <Avatar size={52} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
);

export const Sizes: Story = () => (
  <React.Fragment>
    <Space direction="vertical" align="start" size={20}>
      <Space align="start" size={8}>
        <Avatar size={36}>U</Avatar>
        <Avatar size={44}>U</Avatar>
        <Avatar size={52}>U</Avatar>
        <Avatar size={60}>U</Avatar>
      </Space>
      <Space align="start" size={8}>
        <Avatar size={36} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar size={44} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar size={52} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar size={60} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Space>
    </Space>
  </React.Fragment>
);

export const Group: Story = () => (
  <AvatarGroup size={60}>
    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
  </AvatarGroup>
);
