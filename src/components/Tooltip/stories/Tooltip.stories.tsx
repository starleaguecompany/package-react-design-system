import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Tooltip as IconTooltip } from '@starleaguecompany/react-icons';

import { Placement } from '../../../types/Placements.types';

import { Icon } from '../../Icon';
import { Space } from '../../Space';
import { Col, Row } from '../../Grid';

import { Tooltip } from '..';
import { reactDSImportPath } from '../../../constants/imports';
import { Switch } from '../../Switch';

const Import = `\`\`\`javascript
// Import component
import { Tooltip } from '${reactDSImportPath}'
// Import types
import { TooltipProps } from '${reactDSImportPath}/lib/Tooltip'
\`\`\``;

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    componentSubtitle: 'The Tooltip component is used to show more content of a target',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const content = `Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.`;

export const Basic: Story = () => (
  <Space size={12}>
    <Tooltip title="Tooltip title" content={content}>
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
    <Tooltip title="Tooltip title">
      <Icon icon={<IconTooltip />} />
    </Tooltip>
  </Space>
);

Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

const topPlacements = ['top-start', 'top', 'top-end'] as Placement[];
const bottomPlacements = ['bottom-start', 'bottom', 'bottom-end'] as Placement[];

const getTooltip = (placement: Placement) => {
  const path = React.useMemo(() => {
    switch (placement) {
      case 'top-start':
        return (
          <path d="m480.971 480.971a24 24 0 0 1 -33.942 0l-359.029-359.03v-33.941h33.941l359.03 359.029a24 24 0 0 1 0 33.942zm-408.971-192.971v-216h216a24 24 0 0 0 0-48h-240a24 24 0 0 0 -24 24v240a24 24 0 0 0 48 0z" />
        );
      case 'top':
        return (
          <path d="m280 128.569v335.431a24 24 0 0 1 -48 0v-335.431l24-24zm136.971 80.4a24 24 0 0 0 0-33.942l-144-144a24 24 0 0 0 -33.942 0l-144 144a24 24 0 0 0 33.942 33.942l127.029-127.028 127.029 127.03a24 24 0 0 0 33.942 0z" />
        );
      case 'top-end':
        return (
          <path d="m424 121.941-359.029 359.03a24 24 0 0 1 -33.942-33.942l359.03-359.029h33.941zm64 166.059v-240a24 24 0 0 0 -24-24h-240a24 24 0 0 0 0 48h216v216a24 24 0 0 0 48 0z" />
        );
      case 'bottom-start':
        return (
          <path d="m480.971 64.971-359.03 359.029h-33.941v-33.941l359.029-359.03a24 24 0 0 1 33.942 33.942zm-168.971 399.029a24 24 0 0 0 -24-24h-216v-216a24 24 0 0 0 -48 0v240a24 24 0 0 0 24 24h240a24 24 0 0 0 24-24z" />
        );
      case 'bottom':
        return (
          <path d="m232 383.431v-335.431a24 24 0 0 1 48 0v335.431l-24 24zm40.971 97.54 144-144a24 24 0 0 0 -33.942-33.942l-127.029 127.03-127.029-127.03a24 24 0 0 0 -33.942 33.942l144 144a24 24 0 0 0 33.942 0z" />
        );
      case 'bottom-end':
        return (
          <path d="m390.059 424-359.03-359.029a24 24 0 0 1 33.942-33.942l359.029 359.03v33.941zm97.941 40v-240a24 24 0 0 0 -48 0v216h-216a24 24 0 0 0 0 48h240a24 24 0 0 0 24-24z" />
        );
      case 'right':
        return (
          <path d="m383.432 280h-335.432a24 24 0 0 1 0-48h335.432l24 24zm-46.461 136.971 144-144a24 24 0 0 0 0-33.942l-144-144a24 24 0 0 0 -33.942 33.942l127.03 127.029-127.03 127.029a24 24 0 0 0 33.942 33.942z" />
        );

      case 'left':
        return (
          <path d="m488 256a24 24 0 0 1 -24 24h-335.432l-24-24 24-24h335.432a24 24 0 0 1 24 24zm-279.029 160.971a24 24 0 0 0 0-33.942l-127.03-127.029 127.03-127.029a24 24 0 0 0 -33.942-33.942l-144 144a24 24 0 0 0 0 33.942l144 144a24 24 0 0 0 33.942 0z" />
        );
      default:
        return null;
    }
  }, [placement]);

  return (
    <Tooltip title="Tooltip title" content={content} placement={placement}>
      <Icon size={20} color="green">
        <svg fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          {path}
        </svg>
      </Icon>
    </Tooltip>
  );
};

export const WithPlacement: Story = () => (
  <React.Fragment>
    <Row gutter={[20, 20]} justify="center">
      {topPlacements.map(placement => (
        <Col key={placement} span={1} className="h-text-center">
          {getTooltip(placement)}
        </Col>
      ))}
    </Row>

    <Row gutter={[20, 20]} justify="center">
      <Col span={1} className="h-text-center">
        {getTooltip('left')}
      </Col>
      <Col span={1} className="h-text-center"></Col>
      <Col span={1} className="h-text-center">
        {getTooltip('right')}
      </Col>
    </Row>

    <Row gutter={[20, 20]} justify="center">
      {bottomPlacements.map(placement => (
        <Col key={placement} span={1} className="h-text-center">
          {getTooltip(placement)}
        </Col>
      ))}
    </Row>
  </React.Fragment>
);
WithPlacement.storyName = 'With Placement';
WithPlacement.parameters = {
  docs: {
    storyDescription: `The Tooltip component has a \`placement\` property with 8 available values: ${[
      ...topPlacements,
      'left',
      'right',
      ...bottomPlacements,
    ]
      .map(p => `\`${p}\``)
      .join(', ')}`,
  },
};

export const WithClose: Story = () => (
  <Tooltip title="Tooltip title" content={content} closable>
    <Icon icon={<IconTooltip />} />
  </Tooltip>
);

export const WithCustomization: Story = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
  };

  const footer = (
    <Switch checked={checked} onChange={handleChange}>
      Switch language
    </Switch>
  );

  return (
    <Tooltip title="Tooltip title" content={content} footer={footer} width={500}>
      <Icon icon={<IconTooltip />} />
    </Tooltip>
  );
};
