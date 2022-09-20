import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu, Tooltip as IconTooltip } from '@starleaguecompany/react-icons';

import { MaskInput } from '..';
import { Text } from '../../Typography';
import { Tooltip } from '../../Tooltip';
import { Icon } from '../../Icon';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { MaskInput } from '${reactDSImportPath}'
// Import types
import { MaskInputProps } from '${reactDSImportPath}/lib/MaskInput'
\`\`\``;

export default {
  title: 'Components/MaskInput',
  component: MaskInput,
  parameters: {
    componentSubtitle: 'The Mask Input component allows user to type in text with mask',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const [value, setValue] = React.useState<string>('12 06 2021');

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return <MaskInput placeholder="Дата" mask="99 99 9999" value={value} onChange={handleChange} />;
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => <MaskInput placeholder="Дата" mask="99 99 9999" value="12 06 2021" disabled />;

export const Invalid: Story = () => <MaskInput placeholder="Дата" mask="99 99 9999" value="12 06 2021" invalid />;

export const Loading: Story = () => <MaskInput placeholder="Дата" mask="99 99 9999" value="12 06 2021" loading />;

export const WithIcon: Story = () => (
  <MaskInput placeholder="Дата" mask="99 99 9999" value="12 06 2021" icon={<Menu />} />
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

  return <MaskInput placeholder="Дата" mask="99 99 9999" value="12 06 2021" icon={tooltip} />;
};

export const WithPostfix: Story = () => <MaskInput placeholder="Дата" mask="999 999" value="120 600" postfix="₽" />;

export const ReadOnly: Story = () => <MaskInput placeholder="Дата" mask="99 99 9999" value="12 06 2021" readOnly />;

export const WithPlaceholder: Story = () => <MaskInput placeholder="Дата" mask="99 99 9999" />;
