import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Logo } from '..'
import { COLORS } from '../../../constants/colors'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Logo } from '${reactDSImportPath}'
\`\`\``

export default {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    componentSubtitle: 'Main logo',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <React.Fragment>
    <Logo />
  </React.Fragment>
)

Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const WithColor: Story = () => (
  <React.Fragment>
    <Logo color={COLORS.BLUE} />
  </React.Fragment>
)

WithColor.parameters = {
  docs: {
    storyDescription: 'With color',
  },
}
