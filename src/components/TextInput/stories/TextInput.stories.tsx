import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Menu, Tooltip as IconTooltip } from '@starleaguecompany/react-icons'

import { Text } from '../../Typography'
import { Icon } from '../../Icon'
import { Tooltip } from '../../Tooltip'

import { TextInput } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { TextInput } from '${reactDSImportPath}'
// Import types
import { TextInputProps } from '${reactDSImportPath}/lib/TextInput'
\`\`\``

const content = (
  <Text>
    Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
    duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
  </Text>
)

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    componentSubtitle: 'The component allows user to type in text',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <TextInput label="Название поля" value={value} onChange={handleChange} />
}
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Disabled: Story = () => <TextInput label="Название поля" value="Значение" disabled />

export const Invalid: Story = () => <TextInput label="Название поля" value="Значение" invalid />

export const Loading: Story = () => <TextInput label="Название поля" value="Значение" loading />

export const WithIcon: Story = () => <TextInput label="Название поля" value="Значение" icon={<Menu />} />

export const WithTooltip: Story = () => {
  const tooltip = (
    <Tooltip title={content} placement="top-end">
      <Icon icon={<IconTooltip />} />
    </Tooltip>
  )

  return <TextInput label="Название поля" value="Значение" icon={tooltip} />
}

export const WithPostfix: Story = () => (
  <TextInput label="Название поля" value="150 000" postfix="₽" icon={<Menu />} inputMode="numeric" />
)

export const ReadOnly: Story = () => <TextInput label="Название поля" value="150 000" inputMode="numeric" readOnly />

export const WithPlaceholder: Story = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <TextInput placeholder="Название поля" inputMode="numeric" value={value} onChange={handleChange} />
}
