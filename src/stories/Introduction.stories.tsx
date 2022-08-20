import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Source } from '@storybook/addon-docs'

import { Typography } from '..'
import { reactDSImportPath } from '../constants/imports'

const { Text, Heading } = Typography

export default {
  title: 'Introduction/Getting started',
  parameters: {
    componentSubtitle: 'About Design System, and getting set up with the package locally',
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta

export const Start: Story = () => (
  <React.Fragment>
    <Heading className="h-mt-24" level={4}>
      Installation
    </Heading>
    <Text>
      Design System can be installed by either NPM or Yarn, using the following command. You should also have{' '}
      <code>react@16.8.0</code>, <code>react-dom@16.8.0</code>, <code>classnames@2.3.1</code>,{' '}
      <code>@starleaguecompany/package-react-utils@0.1.0</code>, <code>@starleaguecompany/react-icons@0.0.16</code> and{' '}
      <code>@starleaguecompany/design-system-theme@0.1.0</code> or higher versions.
    </Text>
    <Source
      language="bash"
      code={`
yarn add --dev ${reactDSImportPath} @starleaguecompany/design-system-theme @starleaguecompany/package-react-utils @starleaguecompany/react-icons
      `}
    />

    <Heading level={4}>Using Design System</Heading>
    <Text>Once Design system is installed as a dependency in your project, you can import it as such:</Text>
    <Source
      language="jsx"
      code={`
import { ThemeProvider } from '@starleaguecompany/design-system-theme'
import { Button } from '${reactDSImportPath}';

const App = () => (
  <ThemeProvider>
    <Button color="green" type="primary">PRESS ME</Button>
  </ThemeProvider>
);
      `}
    />
  </React.Fragment>
)
Start.storyName = 'Getting started'
