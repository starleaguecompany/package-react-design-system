import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories } from '@storybook/addon-docs'
import { Menu, Tooltip as IconTooltip } from '@starleaguecompany/react-icons'

import { NumberInput } from '..'
import { Tooltip } from '../../Tooltip'
import { Icon } from '../../Icon'
import { Text } from '../../Typography'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { NumberInput } from '${reactDSImportPath}'
// Import types
import { NumberInputProps } from '${reactDSImportPath}/lib/NumberInput'
\`\`\``

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    componentSubtitle: 'Allows to enter a number within a specified range and step and in the desired display format',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description>
            {`${Import}
          NOTE, by pressing the Enter, the value is formatted (as well as on blur).`}
          </Description>
          <Primary />
          <ArgsTable />
          <Stories />
        </>
      ),
    },
  },
} as Meta

export const Basic: Story = () => {
  return (
    <NumberInput
      label="Название поля"
      min={0}
      max={9000000}
      defaultValue={50000}
      thousandSeparator=" "
      decimalScale={2}
      fixedDecimalScale
    />
  )
}
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Disabled: Story = () => (
  <NumberInput label="Название поля" min={100} max={100000} defaultValue={50000} disabled />
)

export const Invalid: Story = () => (
  <NumberInput label="Название поля" min={0} max={100} defaultValue={50} decimalScale={1} fixedDecimalScale invalid />
)

export const Loading: Story = () => {
  return <NumberInput placeholder="Название поля" postfix="₽" value={10} loading />
}

export const WithIcon: Story = () => {
  return <NumberInput placeholder="Название поля" postfix="₽" value={10} icon={<Menu />} />
}

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

  return <NumberInput placeholder="Название поля" value={10} icon={tooltip} />
}

export const WithPostfix: Story = () => {
  return <NumberInput placeholder="Название поля" value={10} postfix="₽" />
}

export const ReadOnly: Story = () => {
  return <NumberInput placeholder="Название поля" value={10} readOnly />
}

export const WithPlaceholder: Story = () => {
  return <NumberInput placeholder="Название поля" />
}

export const WithFormat: Story = () => {
  return <NumberInput label="Действительна до" format="##/##" value={1222} />
}
