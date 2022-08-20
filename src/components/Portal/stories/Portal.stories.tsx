import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Portal } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Portal } from '${reactDSImportPath}'
// Import types
import { PortalProps } from '${reactDSImportPath}/lib/Portal'
\`\`\``

export default {
  title: 'Components/Portal',
  component: Portal,
  parameters: {
    componentSubtitle:
      'Portal is used to transport any component or element to the end of document.body and renders a React tree into it.',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => (
  <React.Fragment>
    <Portal>Portal content</Portal>
  </React.Fragment>
)
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}
