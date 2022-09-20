import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu } from '@starleaguecompany/react-icons';

import { COLORS } from '../../../constants/colors';
import { CONTENT_SIZES } from '../../../constants/sizes';

import * as Grid from '../../Grid';

import { Icon } from '..';
import { IconProps } from '../types/Icon.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Icon } from '${reactDSImportPath}'
// Import types
import { IconProps } from '${reactDSImportPath}/lib/Icon'
\`\`\``;

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    componentSubtitle: 'Icon wrapper',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => <Icon size={20} icon={<Menu />} />;
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

const variants: Array<IconProps> = [
  { size: CONTENT_SIZES.S16, icon: <Menu /> },
  { size: CONTENT_SIZES.S20, icon: <Menu /> },
  { size: CONTENT_SIZES.S24, icon: <Menu /> },
  { size: CONTENT_SIZES.S28, icon: <Menu /> },
];
const colors = Object.values(COLORS);

export const Sizes: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {variants.map((args, i) => (
        <Grid.Col key={i}>
          <Icon {...(args as IconProps)} />
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Sizes.parameters = {
  docs: {
    storyDescription: 'The Icon component has a `size` property',
  },
};

export const Colors: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20} className="h-mb-20">
      {colors.map(color => (
        <Grid.Col key={color}>
          <Icon color={color} size={28} icon={<Menu />} />
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Colors.parameters = {
  docs: {
    storyDescription: 'The Icon can also have a `color` property',
  },
};

export const Shape: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {colors.map(color => (
        <Grid.Col key={color}>
          <Icon color={color} size={28} shape="circle">
            <Menu />
          </Icon>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Shape.parameters = {
  docs: {
    storyDescription: 'The Icon can also have a `shape` property',
  },
};

export const WithContainer: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {colors.map(color => (
        <Grid.Col key={color}>
          <Icon color={color} size={28}>
            <Menu />
          </Icon>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
WithContainer.parameters = {
  docs: {
    storyDescription: 'The Icon can render with container',
  },
};
