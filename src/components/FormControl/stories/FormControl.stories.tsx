import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Text } from '../../Typography';
import { Space } from '../../Space';
import { TextInput } from '../../TextInput';
import { MaskInput } from '../../MaskInput';
import { Select } from '../../Select';
import { SliderInput } from '../../SliderInput';
import { Autocomplete } from '../../Autocomplete';

import { FormControl } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { FormControl } from '${reactDSImportPath}'
// Import types
import { FormControlProps } from '${reactDSImportPath}/lib/FormControl'
\`\`\``;

export default {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    componentSubtitle: 'The FormControl component is a utility component to help compose form fields',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const options = [
  { label: 'Item 1', value: 0 },
  { label: 'Item 2', value: 1 },
  { label: 'Item 3', value: 2 },
  { label: 'Item 4', value: 3 },
];

export const Basic: Story = () => (
  <React.Fragment>
    <Text className="h-mb-20">Basic usage.</Text>
    <FormControl>
      <TextInput placeholder="Название поля" value="Значение" />
      <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
    </FormControl>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => (
  <Space size={20} direction="vertical" align="start">
    <FormControl disabled>
      <TextInput placeholder="Название поля" value="Значение" />
      <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
    </FormControl>
    <FormControl disabled>
      <MaskInput placeholder="Дата" mask="99 / 99 / 9999" value="12/06/2021" />
      <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
    </FormControl>
    <FormControl disabled>
      <Select placeholder="Услуги" defaultValue={options[2].value} options={options} />
      <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
    </FormControl>
    <FormControl disabled>
      <Autocomplete placeholder="Услуги" defaultValue={options[2].value} options={options} />
      <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
    </FormControl>
    <FormControl disabled>
      <SliderInput placeholder="Название поля" min={100} max={100000} value={50000} />
      <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
    </FormControl>
  </Space>
);

export const WithError: Story = () => (
  <React.Fragment>
    <Space size={12} direction="vertical" align="start">
      <FormControl invalid>
        <TextInput placeholder="Название поля" value="Значение" />
        <FormControl.HelperText>
          {Array.from(new Array(10))
            .map(() => 'Длинное сообщение')
            .join(' ')}
        </FormControl.HelperText>
      </FormControl>
      <FormControl invalid>
        <MaskInput placeholder="Дата" mask="99 / 99 / 9999" value="12/06/2021" />
        <FormControl.HelperText>Поле не заполнено</FormControl.HelperText>
      </FormControl>
      <FormControl invalid>
        <Select placeholder="Услуги" defaultValue={options[2].value} options={options} />
        <FormControl.HelperText>Поле не заполнено</FormControl.HelperText>
      </FormControl>
      <FormControl invalid>
        <Autocomplete placeholder="Услуги" defaultValue={options[2].value} options={options} />
        <FormControl.HelperText>Необязательное поле</FormControl.HelperText>
      </FormControl>
      <FormControl invalid>
        <SliderInput placeholder="Название поля" min={100} max={100000} value={50000} />
        <FormControl.HelperText>
          <div>Собщение в несколько строк</div>
          <div>Собщение в несколько строк</div>
          <div>Собщение в несколько строк</div>
        </FormControl.HelperText>
      </FormControl>
    </Space>
  </React.Fragment>
);
