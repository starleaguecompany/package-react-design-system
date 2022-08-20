import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Menu } from '@starleaguecompany/react-icons'

import { Button } from '../../Button'
import { Icon } from '../../Icon'

import { Space } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Space } from '${reactDSImportPath}'
// Import types
import { SpaceProps } from '${reactDSImportPath}/lib/Space'
\`\`\``

export default {
  title: 'Components/Space',
  component: Space,
  parameters: {
    componentSubtitle: 'Set components spacing',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <Space size={20} align="center">
    <span>Text</span>
    <Button>Button</Button>
    <Icon icon={<Menu />} />
  </Space>
)
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Direction: Story = () => (
  <Space direction="vertical" align="start" size={20}>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
)

export const Size: Story = () => (
  <Space size={36}>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
)

export const Align: Story = () => (
  <Space direction="vertical" align="end" size={20}>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
)

export const Justify: Story = () => (
  <Space size={20} justify="space-around">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
)

export const Inline: Story = () => (
  <Space size={20} inline>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Space>
)

export const WithDifferentSpaceSizes: Story = () => (
  <Space size={[8, 16]} inline wrap>
    {Array.from(new Array(20)).map((_, index) => (
      <Button key={index}>Button {index}</Button>
    ))}
  </Space>
)

WithDifferentSpaceSizes.parameters = {
  docs: {
    storyDescription: 'You can set different sizes for horizontal and vertical space instead of the same sizes',
  },
}
