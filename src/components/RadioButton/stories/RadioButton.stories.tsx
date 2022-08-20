import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Space } from '../../Space'

import { RadioButton } from '..'
import { reactDSImportPath } from '../../../constants/imports'
import { CONTAINER_SIZES } from '../../../constants/sizes'
import { RadioButtonSize } from '../types/RadioButton.types'

const Import = `\`\`\`javascript
// Import component
import { RadioButton } from '${reactDSImportPath}'
// Import types
import { RadioButtonProps } from '${reactDSImportPath}/lib/RadioButton'
\`\`\``

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    componentSubtitle: 'The RadioButton is a simple way to create button groups in most use cases',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

const options = [
  { label: 'USD', value: 1 },
  { label: 'RUB', value: 2 },
  { label: 'EUR', value: 3 },
]

const sizes: RadioButtonSize[] = [CONTAINER_SIZES.S36, CONTAINER_SIZES.S44, CONTAINER_SIZES.S52]

export const Basic: Story = () => {
  return (
    <React.Fragment>
      <RadioButton options={options} />
    </React.Fragment>
  )
}
Basic.parameters = {
  docs: {
    storyDescription: 'RadioButton arrange multiple buttons in a horizontal group',
  },
}

export const Sizes: Story = () => {
  return (
    <React.Fragment>
      <Space direction="vertical" size={20}>
        {sizes.map((size, i) => (
          <RadioButton key={i} options={options} defaultValue={i + 1} size={size} onChange={value => value} />
        ))}
      </Space>
    </React.Fragment>
  )
}
Sizes.parameters = {
  docs: {
    storyDescription: 'RadioButton support `size` property',
  },
}

export const WithAttributes: Story = () => {
  return (
    <React.Fragment>
      <RadioButton options={options} defaultValue={2} onChange={value => value} />
    </React.Fragment>
  )
}
WithAttributes.parameters = {
  docs: {
    storyDescription: 'RadioButton support `defaultValue`, `name`, `onChange` properties',
  },
}
