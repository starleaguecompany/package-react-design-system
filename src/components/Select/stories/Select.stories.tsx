import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu } from '@starleaguecompany/react-icons';

import { Avatar } from '../../Avatar';
import { Checkbox } from '../../Checkbox';
import { Icon } from '../../Icon';

import { Select, SelectOption } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Select } from '${reactDSImportPath}'
// Import types
import { SelectProps } from '${reactDSImportPath}/lib/Select'
\`\`\``;

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    componentSubtitle: 'Select component to select value from options',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0 },
    { label: 'РСХБ Банк', value: 1 },
    { label: 'Росбанк', value: 2 },
    { label: 'Связьбанк', value: 3 },
    { label: 'Русфинанс', value: 4 },
    { label: 'Райффайзенбанк', value: 5 },
    { label: 'Сургутнефтегазбанк', value: 6 },
    { label: 'Уникредитбанк', value: 7 },
    { label: 'РН Банк', value: 8 },
    { label: 'РосгосстахБанк', value: 9 },
  ];

  return <Select label="Банк" options={options} />;
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => {
  const options: SelectOption[] = [
    { label: 'Item 1', value: 0 },
    { label: 'Item 2', value: 1 },
    { label: 'Item 3', value: 2 },
    { label: 'Item 4', value: 3 },
  ];

  return <Select label="Услуги" defaultValue={options[2].value} options={options} disabled />;
};

export const Invalid: Story = () => {
  const options: SelectOption[] = [
    { label: 'Item 1', value: 0 },
    { label: 'Item 2', value: 1 },
    { label: 'Item 3', value: 2 },
    { label: 'Item 4', value: 3 },
  ];

  return <Select label="Услуги" defaultValue={options[1].value} options={options} invalid />;
};

export const MultipleMode: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0 },
    { label: 'РСХБ Банк', value: 1 },
    { label: 'Росбанк', value: 2 },
    { label: 'Связьбанк', value: 3 },
    { label: 'Русфинанс', value: 4 },
    { label: 'Райффайзенбанк', value: 5 },
    { label: 'Сургутнефтегазбанк', value: 6 },
    { label: 'Уникредитбанк', value: 7 },
    { label: 'РН Банк', value: 8 },
    { label: 'РосгосстахБанк', value: 9 },
  ];

  return <Select label="Услуги" defaultValue={[options[2].value]} options={options} mode="multiple" />;
};

export const WithControl: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0, control: <Checkbox /> },
    { label: 'РСХБ Банк', value: 1, control: <Checkbox />, disabled: true },
    { label: 'Росбанк', value: 2, control: <Checkbox /> },
  ];

  return <Select label="Услуги" defaultValue={[options[2].value]} options={options} mode="multiple" />;
};

const icon = (
  <Icon>
    <Menu />
  </Icon>
);
export const WithIcon: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0, description: 'Subtitle', icon },
    { label: 'РСХБ Банк', value: 1, description: 'Subtitle', icon, disabled: true },
    { label: 'Росбанк', value: 2, description: 'Subtitle', icon },
  ];

  return <Select label="Услуги" defaultValue={options[2].value} options={options} />;
};

const avatar = <Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />;

export const WithAvatar: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0, description: 'Subtitle', icon: avatar },
    { label: 'РСХБ Банк', value: 1, description: 'Subtitle', icon: avatar, disabled: true },
    { label: 'Росбанк', value: 2, description: 'Subtitle', icon: avatar },
  ];

  return <Select label="Услуги" defaultValue={options[2].value} options={options} />;
};

export const WithPlaceholder: Story = () => {
  const options: SelectOption[] = [
    { label: 'Item 1', value: 0 },
    { label: 'Item 2', value: 1 },
    { label: 'Item 3', value: 2 },
    { label: 'Item 4', value: 3 },
  ];

  return <Select placeholder="Услуги" options={options} />;
};

export const WithoutCrossIcon: Story = () => {
  const options: SelectOption[] = [
    { label: 'Item 1', value: 0 },
    { label: 'Item 2', value: 1 },
    { label: 'Item 3', value: 2 },
    { label: 'Item 4', value: 3 },
  ];

  return <Select value={0} options={options} withCrossIcon={false} />;
};
