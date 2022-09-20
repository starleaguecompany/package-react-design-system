import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import startOfDay from 'date-fns/startOfDay';
import startOfWeek from 'date-fns/startOfWeek';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';

import { Calendar } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Calendar } from '${reactDSImportPath}'
// Import types
import { CalendarProps } from '${reactDSImportPath}/lib/Calendar'
\`\`\``;

export default {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    componentSubtitle: 'Container for displaying data in calendar form.',
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

export const Basic: Story = () => <Calendar />;
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Range: Story = () => (
  <Calendar selection={{ from: now, to: tomorrow }} minDate={startWeek} maxDate={twoMonthAfter} mode="range" />
);
export const WithRangeLimit: Story = () => <Calendar rangeLimit={7} mode="range" />;

export const WithMinMaxDate: Story = () => <Calendar minDate={startWeek} maxDate={twoMonthAfter} />;

const disabledIntervals = [{ from: addDays(new Date(now), 5), to: addDays(new Date(now), 10) }];
export const WithDisabledIntervals: Story = () => (
  <Calendar minDate={startWeek} maxDate={twoMonthAfter} disabledIntervals={disabledIntervals} />
);

export const WithDefaultDate: Story = () => <Calendar defaultDate={twoMonthAfter} />;
