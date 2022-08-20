import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Menu, Tooltip as IconTooltip } from '@starleaguecompany/react-icons'

import { Textarea } from '..'
import { Text } from '../../Typography'
import { Tooltip } from '../../Tooltip'
import { Icon } from '../../Icon'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Textarea } from '${reactDSImportPath}'
// Import types
import { TextareaProps } from '${reactDSImportPath}/lib/Textarea'
\`\`\``

export default {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    componentSubtitle: 'The component allows user to type in longer content',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined)

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  return <Textarea label="Название поля" value={value} onChange={handleChange} />
}
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Disabled: Story = () => <Textarea label="Название поля" value="Значение" disabled />

export const Invalid: Story = () => <Textarea label="Название поля" value="Значение" invalid />

export const Loading: Story = () => <Textarea label="Название поля" value="Значение" loading />

export const WithIcon: Story = () => <Textarea label="Название поля" value="Значение" icon={<Menu />} />

export const WithTooltip: Story = () => {
  const content = (
    <Text>
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
  )

  const tooltip = (
    <Tooltip title={content} placement="top-end">
      <Icon icon={<IconTooltip />} />
    </Tooltip>
  )

  return <Textarea label="Название поля" value="Значение" icon={tooltip} />
}

export const ReadOnly: Story = () => <Textarea label="Название поля" value="Значение" readOnly />

export const WithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined)

  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  return <Textarea placeholder="Название поля" value={value} onChange={handleChange} />
}
