import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu, Tooltip as IconTooltip } from '@starleaguecompany/react-icons';

import { SliderInput } from '..';
import { Text } from '../../Typography';
import { Tooltip } from '../../Tooltip';
import { Icon } from '../../Icon';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { SliderInput } from '${reactDSImportPath}'
// Import types
import { SliderInputProps } from '${reactDSImportPath}/lib/SliderInput'
\`\`\``;

export default {
  title: 'Components/SliderInput',
  component: SliderInput,
  parameters: {
    componentSubtitle: 'Enter a number within certain range with the mouse or keyboard',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

function pluralize(count: number, words: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];

  return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]];
}

export const Basic: Story = () => {
  return (
    <SliderInput
      label="Название поля"
      min={1000}
      max={100000}
      step={1000}
      defaultValue={50000}
      thousandSeparator=" "
      postfix="₽"
    />
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => <SliderInput label="Название поля" max={100000} defaultValue={50000} disabled />;

export const Invalid: Story = () => <SliderInput label="Название поля" max={100000} defaultValue={50000} invalid />;

export const Loading: Story = () => <SliderInput label="Название поля" max={100000} defaultValue={50000} loading />;

export const WithIcon: Story = () => (
  <SliderInput label="Название поля" max={100000} defaultValue={50000} icon={<Menu />} />
);

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

  return <SliderInput label="Название поля" max={100000} defaultValue={50000} icon={tooltip} />;
};

export const WithPostfix: Story = () => (
  <SliderInput label="Название поля" max={100000} defaultValue={50000} postfix="₽" />
);

export const ReadOnly: Story = () => {
  const [postfix, setPostfix] = React.useState('год');

  const onChange = React.useCallback((value: number) => {
    setPostfix(pluralize(value, ['год', 'года', 'лет']));
  }, []);

  return <SliderInput label="Срок" min={1} max={15} defaultValue={1} postfix={postfix} onChange={onChange} readOnly />;
};

export const WithPlaceholder: Story = () => (
  <SliderInput placeholder="Название поля" min={1000} max={100000} step={1000} />
);

export const logarithmicScale: Story = () => (
  <SliderInput
    label="Название поля"
    min={30000}
    max={1000000}
    defaultValue={100000}
    postfix="₽/мес"
    thousandSeparator=" "
    logarithmic
  />
);
