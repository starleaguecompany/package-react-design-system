import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Heading, Text } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Typography } from '${reactDSImportPath}'
// Import types
import { HeadingProps } from '${reactDSImportPath}/lib/Typography'

const { Heading } = Typography
\`\`\``

export default {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    componentSubtitle: 'The Heading component is used for all headings',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <React.Fragment>
    <Text className="h-mb-8 h-color-D60">Level 1. Desktop - 50px/52px, Mobile - 30px/38px</Text>
    <Heading level={1} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Heading>
    <Text className="h-mb-8 h-color-D60">Level 2. Desktop - 38px/44px, Mobile - 25px/32px</Text>
    <Heading level={2} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Heading>
    <Text className="h-mb-8 h-color-D60">Level 3. Desktop - 28px/32px, Mobile - 21px/27px</Text>
    <Heading level={3} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Heading>
    <Text className="h-mb-8 h-color-D60">Level 4. Desktop - 22px/26px, Mobile - 18px/24px</Text>
    <Heading level={4} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Heading>
    <Text className="h-mb-8 h-color-D60">Level 5. Desktop - 16px/20px, Mobile - 14px/18px</Text>
    <Heading level={5} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Heading>
    <Text className="h-mb-8 h-color-D60">Level 6. Desktop - 14px/18px, Mobile - 12px/16px</Text>
    <Heading level={6}>The quick brown fox jumps over the lazy dog</Heading>
  </React.Fragment>
)
Basic.storyName = 'Heading'
