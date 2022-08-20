import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Divider } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Divider } from '${reactDSImportPath}'
// Import types
import { DividerProps } from '${reactDSImportPath}/lib/Divider'
\`\`\``

export default {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    componentSubtitle: 'A divider line separates different content',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <React.Fragment>
    <Divider />
  </React.Fragment>
)
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}
