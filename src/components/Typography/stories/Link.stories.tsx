import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Space } from '../../Space'
import { Button } from '../../Button'
import { Link, Text } from '../index'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Typography } from '${reactDSImportPath}'
// Import types
import { LinkProps } from '${reactDSImportPath}/lib/Typography'

const { Link } = Typography
\`\`\``

export default {
  title: 'Typography/Link',
  component: Link,
  parameters: {
    componentSubtitle: 'The Link component is used for anchor links. This component renders a a element by default',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <Text>
    In order to learn more about this feature, visit <Link href="#">the developer center</Link>.
  </Text>
)
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Colors: Story = () => (
  <Space direction="vertical" size={20}>
    <Text>
      In order to learn more about this feature, visit{' '}
      <Link color="blue" href="#">
        the developer center
      </Link>
      .
    </Text>
    <Text>
      In order to learn more about this feature, visit{' '}
      <Link color="gray" href="#">
        the developer center
      </Link>
      .
    </Text>
    <Text>
      In order to learn more about this feature, visit{' '}
      <Link color="black" href="#">
        the developer center
      </Link>
      .
    </Text>
  </Space>
)

export const Strong: Story = () => (
  <Space direction="vertical" size={20}>
    <Text>
      In order to learn more about this feature, visit{' '}
      <Link color="blue" strong href="#">
        the developer center
      </Link>
      .
    </Text>
  </Space>
)

export const LinkAsButton: Story = () => (
  <Link href="https://sravni.ru" target="_blank">
    <Button color="green" variant="primary">
      I am link
    </Button>
  </Link>
)
