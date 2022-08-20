import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Title, Subtitle, Description, Primary, ArgsTable, Stories } from '@storybook/addon-docs'

import { ControlGroup } from '..'
import { NumberInput } from '../../NumberInput'
import { SliderInput } from '../../SliderInput'
import { Select } from '../../Select'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { ControlGroup } from '${reactDSImportPath}'
// Import types
import { ControlGroupProps } from '${reactDSImportPath}/lib/ControlGroup'
\`\`\``

export default {
  title: 'Components/ControlGroup',
  component: ControlGroup,
  parameters: {
    componentSubtitle:
      'Combine form inputs into a single group. Available inputs are Autocomplete, DateInput, MaskInput, NumberInput, Select, SliderInput, TextInput.',
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description>
            {`${Import}
          NOTE, you need to define the width of the included inputs by yourself.`}
          </Description>
          <Primary />
          <ArgsTable />
          <Stories />
        </>
      ),
    },
  },
} as Meta

const options = [
  { label: 'Все', value: 0 },
  { label: 'Не все', value: 1 },
]

export const Basic: Story = () => (
  <React.Fragment>
    <ControlGroup>
      <NumberInput placeholder="Ставка" min={1} max={100} step={0.1} defaultValue={3.6} postfix="%" />
      <SliderInput
        placeholder="Сумма"
        min={1000}
        max={100000}
        step={1000}
        defaultValue={50000}
        postfix="₽"
        thousandSeparator=" "
      />
      <Select placeholder="Форма организации" defaultValue={0} options={options} />
    </ControlGroup>
  </React.Fragment>
)

Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Vertical: Story = () => (
  <React.Fragment>
    <ControlGroup direction="vertical">
      <NumberInput placeholder="Ставка" min={1} max={100} step={0.1} defaultValue={3.6} postfix="%" />
      <SliderInput
        placeholder="Сумма"
        min={1000}
        max={100000}
        step={1000}
        defaultValue={50000}
        postfix="₽"
        thousandSeparator=" "
      />
      <Select placeholder="Форма организации" defaultValue={0} options={options} />
    </ControlGroup>
  </React.Fragment>
)

Vertical.parameters = {
  docs: {
    storyDescription: 'Vertical direction of group (ex. for mobile)',
  },
}
