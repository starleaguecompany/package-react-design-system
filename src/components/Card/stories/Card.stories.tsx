import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import cx from 'classnames';

import { Menu } from '@starleaguecompany/react-icons';

import { COLORS } from '../../../constants/colors';

import { Heading, Text } from '../../Typography';
import { Space } from '../../Space';
import { Icon } from '../../Icon';
import * as Grid from '../../Grid';

import { Card } from '../index';
import { CardSize, CardVariant, CardColor } from '../types/Card.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Card } from '${reactDSImportPath}'
// Import types
import { CardProps } from '${reactDSImportPath}/lib/Card'
\`\`\``;

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    componentSubtitle: 'Simple rectangular container',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const sizes = [16, 24, 32, 40] as Array<CardSize>;
const variants = ['outlined', 'primary'] as Array<CardVariant>;
const colors = ['light', 'dark', COLORS.GREEN, COLORS.BLUE, COLORS.RED, COLORS.ORANGE] as Array<CardColor>;

const content = (
  <Space size={20} align="center">
    <div>
      <Heading level={5} as="div">
        Поможем сэкономить
      </Heading>
      <Text className={cx('h-color-D60', 'h-mt-16')}>
        Сравните все присутствующие на рынке тарифы РКО с помощью калькулятора. Для{' '}
        <Text as="span" strong className="h-color-B100">
          определения минимальной суммы
        </Text>{' '}
        потенциальных комиссий за банковское обслуживание
      </Text>
    </div>
    <Icon size={24} color="blue">
      <Menu />
    </Icon>
  </Space>
);

export const Basic: Story = () => (
  <React.Fragment>
    <Card variant="outlined" color="blue">
      {content}
    </Card>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Shadow: Story = () => (
  <React.Fragment>
    <Card shadow>{content}</Card>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'The Card component has a `shadow` property',
  },
};

export const Variants: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {variants.map(variant => (
        <Grid.Col key={variant} span={6}>
          <Card variant={variant} className="h-mb-12">
            {content}
          </Card>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Variants.parameters = {
  docs: {
    storyDescription: 'The Card component has a `variant` property',
  },
};

export const Colors: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {colors.map(color => (
        <Grid.Col key={color} span={6}>
          <Card color={color} className="h-mb-12">
            {content}
          </Card>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Colors.parameters = {
  docs: {
    storyDescription: 'The Card component has a `color` property',
  },
};

export const MixingVariantAndColor: Story = () => (
  <React.Fragment>
    {variants.map(variant => (
      <React.Fragment key={variant}>
        <Text capitalize>{variant}</Text>
        <Grid.Row gutter={[20, 20]}>
          {colors.map(color => (
            <Grid.Col key={color} span={6}>
              <Card variant={variant} color={color} className="h-mb-12">
                {content}
              </Card>
            </Grid.Col>
          ))}
        </Grid.Row>
      </React.Fragment>
    ))}
  </React.Fragment>
);
MixingVariantAndColor.parameters = {
  docs: {
    storyDescription: 'The `color` property works with any `variant`',
  },
};

export const Sizes: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {sizes.map(size => (
        <Grid.Col key={size} span={6}>
          <Card size={size} variant="outlined" className="h-mb-12">
            {content}
          </Card>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Basic.parameters = {
  docs: {
    storyDescription: 'The Card component has a size property',
  },
};
