import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { ArrowDown, Menu } from '@starleaguecompany/react-icons';

import { Space } from '../../Space';
import { Icon } from '../../Icon';
import { Tag } from '../../Tag';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { Avatar } from '../../Avatar';
import { SelectOption, SelectValue } from '../../../types/Select.types';

import { Dropdown } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Dropdown } from '${reactDSImportPath}'
// Import types
import { DropdownProps } from '${reactDSImportPath}/lib/Dropdown'
\`\`\``;

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    componentSubtitle: 'A dropdown list',
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
  ];

  const options2: SelectOption[] = [
    { label: 'Дайте два', value: 0 },
    { label: 'Дайте три', value: 1 },
    { label: 'Дайте пять', value: 2 },
  ];

  return (
    <React.Fragment>
      <Dropdown options={options} defaultValue={options[1].value} placement="bottom-start">
        <Tag>
          Выберите из списка <Icon icon={<ArrowDown />} />
        </Tag>
      </Dropdown>

      <br />
      <br />

      <Space size={4}>
        <Button variant="primary" color="green">
          Получить промокод
        </Button>
        <Dropdown options={options2} defaultValue={options2[2].value} placement="bottom-end">
          <Button variant="secondary">
            <Icon icon={<ArrowDown />} />
          </Button>
        </Dropdown>
      </Space>
    </React.Fragment>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Multiple: Story = () => {
  const [value, setValue] = React.useState<SelectValue>();

  const onChange = (option: SelectValue) => {
    setValue(option);
  };

  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0 },
    { label: 'РСХБ Банк', value: 1 },
    { label: 'Росбанк', value: 2 },
  ];

  return (
    <React.Fragment>
      <Dropdown
        options={options}
        defaultValue={[options[1].value]}
        value={value}
        onChange={onChange}
        mode="multiple"
        placement="bottom-start"
      >
        <Tag>
          Выберите из списка <Icon icon={<ArrowDown />} />
        </Tag>
      </Dropdown>
    </React.Fragment>
  );
};

Multiple.parameters = {
  docs: {
    storyDescription: 'The dropdown has `mode` property',
  },
};

export const WithControl: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0, control: <Checkbox /> },
    { label: 'РСХБ Банк', value: 1, control: <Checkbox />, disabled: true },
    { label: 'Росбанк', value: 2, control: <Checkbox /> },
  ];

  return (
    <Dropdown defaultValue={[options[2].value]} options={options} mode="multiple">
      <Tag>
        Выберите из списка <Icon icon={<ArrowDown />} />
      </Tag>
    </Dropdown>
  );
};

export const WithIcon: Story = () => {
  const icon = (
    <Icon>
      <Menu />
    </Icon>
  );

  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0, description: 'Subtitle', icon },
    { label: 'РСХБ Банк', value: 1, description: 'Subtitle', icon, disabled: true },
    { label: 'Росбанк', value: 2, description: 'Subtitle', icon },
  ];

  return (
    <Dropdown defaultValue={[options[2].value]} options={options}>
      <Tag>
        Выберите из списка <Icon icon={<ArrowDown />} />
      </Tag>
    </Dropdown>
  );
};

const avatar = <Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />;

export const WithAvatar: Story = () => {
  const options: SelectOption[] = [
    { label: 'Ренесанс Кредит Банк', value: 0, description: 'Subtitle', icon: avatar },
    { label: 'РСХБ Банк', value: 1, description: 'Subtitle', icon: avatar, disabled: true },
    { label: 'Росбанк', value: 2, description: 'Subtitle', icon: avatar },
  ];

  return (
    <Dropdown defaultValue={[options[2].value]} options={options}>
      <Tag>
        Выберите из списка <Icon icon={<ArrowDown />} />
      </Tag>
    </Dropdown>
  );
};
