import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu, Cross } from '@starleaguecompany/react-icons';

import { COLORS } from '../../../constants/colors';

import * as Grid from '../../Grid';
import { Icon } from '../../Icon';
import { Avatar } from '../../Avatar';

import { Badge } from '..';
import { BadgeVariant, BadgeColor } from '../types/Badge.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Badge } from '${reactDSImportPath}'
// Import types
import { BadgeProps } from '${reactDSImportPath}/lib/Badge'
\`\`\``;

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    componentSubtitle: 'The Badge component is label with a background color',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const variants: Array<BadgeVariant> = ['primary', 'secondary'];
const colors = ['white', ...Object.values(COLORS)] as Array<BadgeColor>;

export const Basic: Story = () => (
  <Grid.Row gutter={4}>
    <Grid.Col>
      <Badge text="Семья и деньги" />
    </Grid.Col>
    <Grid.Col>
      <Badge text="+2" shape="circle" />
    </Grid.Col>
  </Grid.Row>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Variants: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {variants.map((variant, i) => (
        <Grid.Col key={i}>
          <Badge variant={variant} text={variant} />
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Variants.parameters = {
  docs: {
    storyDescription: 'The Badge component has a `variant` property',
  },
};

export const Colors: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {colors.map((color, i) => (
        <Grid.Col key={i}>
          <Badge color={color} text={color} />
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Colors.parameters = {
  docs: {
    storyDescription: 'The Badge can also have a `color` property',
  },
};

export const MixingVariantAndColor: Story = () => (
  <React.Fragment>
    {variants.map((variant, i) => (
      <Grid.Row key={i} gutter={[20, 20]}>
        {colors.map((color, i) => (
          <Grid.Col key={i}>
            <Badge variant={variant} color={color} text={`${color} ${variant}`} />
          </Grid.Col>
        ))}
      </Grid.Row>
    ))}
  </React.Fragment>
);
MixingVariantAndColor.parameters = {
  docs: {
    storyDescription: 'The `color` property works with any `variant`',
  },
};

export const WithIcon: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={[20, 20]}>
      <Grid.Col>
        <Badge
          text={
            <React.Fragment>
              <Icon icon={<Menu />} size={16} />
              жкх
            </React.Fragment>
          }
        />
      </Grid.Col>
      <Grid.Col>
        <Badge
          color="orange"
          text={
            <React.Fragment>
              <Icon icon={<Menu />} size={16} />
              жкх
            </React.Fragment>
          }
        />
      </Grid.Col>
    </Grid.Row>
    <Grid.Row gutter={[20, 20]}>
      <Grid.Col>
        <Badge
          variant="primary"
          text={
            <React.Fragment>
              <Icon icon={<Menu />} size={16} />
              жкх
            </React.Fragment>
          }
        />
      </Grid.Col>
      <Grid.Col>
        <Badge
          variant="primary"
          color="orange"
          text={
            <React.Fragment>
              <Icon icon={<Menu />} size={16} />
              жкх
            </React.Fragment>
          }
        />
      </Grid.Col>
    </Grid.Row>
  </React.Fragment>
);
WithIcon.parameters = {
  docs: {
    storyDescription: 'Badge components can contain an Icon',
  },
};

export const Shape: Story = () => (
  <React.Fragment>
    {variants.map((variant, i) => (
      <Grid.Row key={i} gutter={[20, 20]}>
        {colors.map((color, i) => (
          <Grid.Col key={i}>
            <Badge variant={variant} color={color} shape="circle" text={99} />
          </Grid.Col>
        ))}
      </Grid.Row>
    ))}
  </React.Fragment>
);
Shape.parameters = {
  docs: {
    storyDescription: 'The Badge can also have a `shape` property',
  },
};

export const AsDot: Story = () => (
  <React.Fragment>
    {variants.map((variant, i) => (
      <Grid.Row key={i} gutter={[10, 10]}>
        {colors.map((color, i) => (
          <Grid.Col key={i}>
            <Badge variant={variant} color={color} />
          </Grid.Col>
        ))}
      </Grid.Row>
    ))}
  </React.Fragment>
);
AsDot.parameters = {
  docs: {
    storyDescription: 'The Badge can render without text',
  },
};

export const WithElement: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={[10, 10]}>
      {colors.map((color, i) => (
        <Grid.Col key={i}>
          <Badge variant="primary" color={color}>
            <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
          </Badge>
        </Grid.Col>
      ))}
    </Grid.Row>
    <Grid.Row gutter={[10, 10]}>
      {colors.map((color, i) => (
        <Grid.Col key={i}>
          <Badge variant="primary" color={color} text={10} shape="circle">
            <Avatar size={52} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
          </Badge>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
WithElement.parameters = {
  docs: {
    storyDescription: 'The Badge can render with children element',
  },
};

export const WithElementAndIcon: Story = () => {
  return (
    <Badge variant="primary" color="gray" text={<Icon size={16} icon={<Cross />} />} shape="circle">
      <Avatar size={52} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    </Badge>
  );
};

export const WithElementAndCustomPlacement: Story = () => {
  return (
    <Badge variant="primary" color="gray" text="10" shape="circle" placement="bottom-end">
      <Avatar size={52} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />
    </Badge>
  );
};
