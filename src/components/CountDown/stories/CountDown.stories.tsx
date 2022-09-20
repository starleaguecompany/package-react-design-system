import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { CountDown } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { CountDown } from '${reactDSImportPath}'
// Import types
import { CountDownProps } from '${reactDSImportPath}/lib/CountDown'
\`\`\``;

export default {
  title: 'Components/CountDown',
  component: CountDown,
  parameters: {
    componentSubtitle: 'CountDown component',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const formatter = (number: number) => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(+number);
};

export const Basic: Story = () => (
  <React.Fragment>
    <CountDown from={123} to={987654} formatter={formatter} speed={1000} interval={50} />
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
