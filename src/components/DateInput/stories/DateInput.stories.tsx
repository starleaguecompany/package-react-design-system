import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import startOfDay from 'date-fns/startOfDay';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import startOfWeek from 'date-fns/startOfWeek';
import { Menu, Tooltip as IconTooltip } from '@starleaguecompany/react-icons';

import { DateInput } from '..';
import { Text } from '../../Typography';
import { Tooltip } from '../../Tooltip';
import { Icon } from '../../Icon';
import { Space } from '../../Space';
import { ControlGroup } from '../../ControlGroup';
import { Select, SelectOption, SelectValue } from '../../Select';
import { DateFormat } from '../types/DateInput.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { DateInput } from '${reactDSImportPath}'
// Import types
import { DateInputProps } from '${reactDSImportPath}/lib/DateInput'
\`\`\``;

export default {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: {
    componentSubtitle: 'The component allows user to select a date from calendar',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const now = startOfDay(new Date());
const startWeek = startOfWeek(now, { weekStartsOn: 1 });
const tomorrow = startOfDay(addDays(new Date(now), 1));
const twoMonthAfter = startOfDay(addMonths(new Date(), 2));

export const Basic: Story = () => <DateInput label="Дата прибытия" defaultValue={tomorrow} />;
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => <DateInput label="Даты поездки" defaultValue={tomorrow} disabled />;

export const Invalid: Story = () => <DateInput label="Даты поездки" defaultValue={tomorrow} invalid />;

export const Loading: Story = () => <DateInput label="Даты поездки" defaultValue={tomorrow} loading />;

export const ReadOnly: Story = () => <DateInput label="Даты поездки" defaultValue={tomorrow} readOnly />;

export const WithIcon: Story = () => <DateInput label="Даты поездки" defaultValue={tomorrow} icon={<Menu />} />;

export const WithTooltip: Story = () => {
  const content = (
    <Text>
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
  );

  const tooltip = (
    <Tooltip title={content} placement="top-end">
      <Icon icon={<IconTooltip />} />
    </Tooltip>
  );

  return <DateInput label="Даты поездки" defaultValue={tomorrow} icon={tooltip} />;
};

export const WithPostfix: Story = () => <DateInput label="Даты поездки" defaultValue={tomorrow} postfix="г." />;

export const WithPlaceholder: Story = () => <DateInput placeholder="Дата прибытия" />;

export const Range: Story = () => (
  <DateInput
    label="Даты поездки"
    defaultValue={{ from: now, to: tomorrow }}
    minDate={startWeek}
    maxDate={twoMonthAfter}
    mode="range"
  />
);
export const WithRangeLimit: Story = () => (
  <DateInput label="Даты поездки" rangeLimit={7} mode="range" defaultValue={{ from: now, to: tomorrow }} />
);

export const WithMinMaxDate: Story = () => (
  <DateInput label="Даты поездки" minDate={startWeek} maxDate={twoMonthAfter} defaultValue={tomorrow} />
);

const disabledIntervals = [{ from: addDays(new Date(now), 5), to: addDays(new Date(now), 10) }];
export const WithDisabledIntervals: Story = () => (
  <DateInput
    label="Даты поездки"
    minDate={startWeek}
    maxDate={twoMonthAfter}
    defaultValue={tomorrow}
    disabledIntervals={disabledIntervals}
  />
);

export const WithDateFormat: Story = () => {
  interface DateFormatsOptions extends Omit<SelectOption, 'label'> {
    label: DateFormat;
  }

  const dateFormats: DateFormatsOptions[] = [
    { value: 0, label: 'dd' },
    { value: 1, label: 'dd MMMM' },
    { value: 2, label: 'dd.MM.yyyy' },
    { value: 3, label: 'dd MMMM yyyy' },
  ];

  const [dateFormat1, setDateFormat1] = React.useState<DateFormat>(dateFormats[0].label);
  const [dateFormat2, setDateFormat2] = React.useState<DateFormat>(dateFormats[1].label);

  const findValue = (value: SelectValue) => {
    return dateFormats.find(o => o.value === value) as DateFormatsOptions;
  };

  const onChange1 = (value: SelectValue) => setDateFormat1(findValue(value).label);
  const onChange2 = (value: SelectValue) => setDateFormat2(findValue(value).label);

  return (
    <Space direction="vertical" size={8}>
      <ControlGroup>
        <Select label="Формат первой даты" defaultValue={0} options={dateFormats} onChange={onChange1} />
        <Select label="Формат второй даты" defaultValue={1} options={dateFormats} onChange={onChange2} />
      </ControlGroup>

      <DateInput
        label="Даты поездки"
        defaultValue={{ from: now, to: tomorrow }}
        dateFormat={[dateFormat1, dateFormat2]}
        mode="range"
      />
    </Space>
  );
};

export const WithDefaultDate: Story = () => <DateInput label="Даты поездки" defaultDate={twoMonthAfter} />;

export const WithPlacement: Story = () => (
  <div style={{ width: '50%' }}>
    <DateInput className="h-mr-40" label="Даты поездки" placement="right" />
  </div>
);
