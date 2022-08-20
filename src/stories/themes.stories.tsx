import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Source } from '@storybook/addon-docs'

import { Typography } from '..'
import { reactDSImportPath } from '../constants/imports'

const { Heading } = Typography

export default {
  title: 'Foundations/Themes',
  parameters: {
    componentSubtitle: 'A primer into the theming architecture behind Design system',
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta

export const Themes: Story = () => (
  <React.Fragment>
    <Heading level={4}>Lager (light):</Heading>
    <Source
      language="jsx"
      code={`
import { ThemeProvider } from '@starleaguecompany/design-system-theme'
import { Button } from '${reactDSImportPath}';

const App = () => (
  <ThemeProvider theme='lager'>
    <Button color="green" type="primary">PRESS ME</Button>
  </ThemeProvider>
);
      `}
    />

    <Heading level={4}>Guinness (dark):</Heading>
    <Source
      language="jsx"
      code={`
import { ThemeProvider } from '@starleaguecompany/design-system-theme'
import { Button } from '${reactDSImportPath}';

const App = () => (
  <ThemeProvider theme='guinness'>
    <Button color="green" type="primary">PRESS ME</Button>
  </ThemeProvider>
);
      `}
    />
  </React.Fragment>
)
