import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Rate } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Rate } from '${reactDSImportPath}'
// Import types
import { RateProps } from '${reactDSImportPath}/lib/Rate'
\`\`\``

export default {
  title: 'Components/Rate',
  component: Rate,
  parameters: {
    componentSubtitle: 'A quick rating operation on something',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <React.Fragment>
    <Rate />
  </React.Fragment>
)
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Disabled: Story = () => (
  <React.Fragment>
    <Rate defaultValue={3.5} disabled />
  </React.Fragment>
)
Disabled.parameters = {
  docs: {
    storyDescription: 'Read only, can not use mouse to interact',
  },
}

export const CustomCount: Story = () => (
  <React.Fragment>
    <Rate count={1} value={1} disabled />
  </React.Fragment>
)
CustomCount.parameters = {
  docs: {
    storyDescription: 'Support star count',
  },
}

export const HalfStar: Story = () => (
  <React.Fragment>
    <Rate defaultValue={2.95} allowHalf />
  </React.Fragment>
)
HalfStar.parameters = {
  docs: {
    storyDescription: 'Support select half star',
  },
}
