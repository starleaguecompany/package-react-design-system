import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Warning } from '@starleaguecompany/react-icons'

import { COLORS } from '../../../constants/colors'

import { Text } from '../../Typography'
import { Icon } from '../../Icon'
import { Button } from '../../Button'
import { Avatar } from '../../Avatar'
import * as Grid from '../../Grid'

import { Alert } from '../index'
import { AlertColor } from '../types/Alert.types'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Alert } from '${reactDSImportPath}'
// Import types
import { AlertProps } from '${reactDSImportPath}/lib/Alert'
\`\`\``

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    componentSubtitle: 'The Alert component is used to show feedback to the user about an action or state',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

const colors = ['light', 'dark', COLORS.GREEN, COLORS.ORANGE, COLORS.RED, COLORS.BLUE] as Array<AlertColor>

const icon = (
  <Icon color="red" size={16}>
    <Warning />
  </Icon>
)

const content = (
  <React.Fragment>
    <Text>
      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
      esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
    </Text>
  </React.Fragment>
)

export const Basic: Story = () => (
  <React.Fragment>
    <Alert icon={icon} title="Информационное сообщение" subtitle="Здесь можно указать подробное описание">
      {content}
    </Alert>
  </React.Fragment>
)
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Colors: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={[20, 20]}>
      {colors.map(color => (
        <Grid.Col key={color} span={6}>
          <Alert
            color={color}
            icon={icon}
            title="Информационное сообщение"
            subtitle="Здесь можно указать подробное описание"
          >
            {content}
          </Alert>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
)
Colors.parameters = {
  docs: {
    storyDescription: 'The Alert component has a `color` property',
  },
}

export const WithTitle: Story = () => (
  <React.Fragment>
    <Alert title="Информационное сообщение">{content}</Alert>
  </React.Fragment>
)
WithTitle.parameters = {
  docs: {
    storyDescription: 'The Alert component can contain title',
  },
}

export const WithSubtitle: Story = () => (
  <React.Fragment>
    <Alert title="Информационное сообщение" subtitle="Здесь можно указать подробное описание">
      {content}
    </Alert>
  </React.Fragment>
)
WithSubtitle.parameters = {
  docs: {
    storyDescription: 'The Alert component can contain subtitle',
  },
}

export const WithText: Story = () => (
  <React.Fragment>
    <Alert title="Информационное сообщение" subtitle="Здесь можно указать подробное описание">
      {content}
    </Alert>
  </React.Fragment>
)
WithText.parameters = {
  docs: {
    storyDescription: 'The Alert component can contain text',
  },
}

export const WithIcon: Story = () => (
  <React.Fragment>
    <Alert icon={icon} title="Информационное сообщение" subtitle="Здесь можно указать подробное описание" />
  </React.Fragment>
)
WithIcon.parameters = {
  docs: {
    storyDescription: 'The Alert component can contain icon',
  },
}

export const WithAvatar: Story = () => (
  <React.Fragment>
    <Alert
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
      title="Информационное сообщение"
      subtitle="Здесь можно указать подробное описание"
    />
  </React.Fragment>
)
WithAvatar.parameters = {
  docs: {
    storyDescription: 'The Alert component can contain avatar',
  },
}

export const WithFooter: Story = () => {
  const footer = React.useMemo(() => {
    return (
      <Button variant="primary" color="green">
        Ясно
      </Button>
    )
  }, [])

  return (
    <React.Fragment>
      <Alert
        icon={icon}
        title="Информационное сообщение"
        subtitle="Здесь можно указать подробное описание"
        footer={footer}
      >
        {content}
      </Alert>
    </React.Fragment>
  )
}
WithFooter.parameters = {
  docs: {
    storyDescription: 'The `footer` property works with any `React Nodes`',
  },
}

export const Closable: Story = () => (
  <React.Fragment>
    <Alert icon={icon} title="Информационное сообщение" subtitle="Здесь можно указать подробное описание" closable>
      {content}
    </Alert>
  </React.Fragment>
)

export const TextOnly: Story = () => (
  <React.Fragment>
    <Alert>{content}</Alert>
  </React.Fragment>
)

Closable.parameters = {
  docs: {
    storyDescription: 'The Alert can be closable',
  },
}
