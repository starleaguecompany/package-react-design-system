import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu } from '@starleaguecompany/react-icons';

import { COLORS } from '../../../constants/colors';
import { CONTAINER_SIZES } from '../../../constants/sizes';

import { Text } from '../../Typography';
import * as Grid from '../../Grid';
import { Icon } from '../../Icon';
import { Badge } from '../../Badge';

import { Button } from '..';
import { ButtonVariant } from '../types/Button.types';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Button } from '${reactDSImportPath}'
// Import types
import { ButtonProps } from '${reactDSImportPath}/lib/Button'
\`\`\``;

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'A Button triggers an action or an event',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const variants: ButtonVariant[] = ['outlined', 'primary', 'secondary', 'text'];
const colors = Object.values(COLORS);
const sizes = Object.values(CONTAINER_SIZES);

export const Basic: Story = () => (
  <Grid.Row gutter={20}>
    <Grid.Col>
      <Button variant="primary" color="green">
        Primary <Icon size={16} strong icon={<Menu />} />
      </Button>
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
      {variants.map(variant => (
        <Grid.Col key={variant}>
          <Button variant={variant}>{variant}</Button>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Variants.parameters = {
  docs: {
    storyDescription: 'The Button component has a `variant` property',
  },
};

export const Colors: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {colors.map(color => (
        <Grid.Col key={color}>
          <Button color={color}>{color}</Button>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Colors.parameters = {
  docs: {
    storyDescription: 'The Button can also have a `color` property',
  },
};

export const MixingVariantAndColor: Story = () => (
  <React.Fragment>
    {variants.map(variant => (
      <React.Fragment key={variant}>
        <Text capitalize>{variant}</Text>
        <Grid.Row gutter={[20, 20]}>
          {colors.map(color => (
            <Grid.Col key={color}>
              <Button variant={variant} color={color}>
                {color}
              </Button>
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

export const Disabled: Story = () => (
  <React.Fragment>
    {variants.map(variant => (
      <React.Fragment key={variant}>
        <Text capitalize>{variant}</Text>
        <Grid.Row gutter={[20, 20]}>
          {colors.map(color => (
            <Grid.Col key={color}>
              <Button variant={variant} color={color} disabled>
                {color}
              </Button>
            </Grid.Col>
          ))}
        </Grid.Row>
      </React.Fragment>
    ))}
  </React.Fragment>
);
Disabled.parameters = {
  docs: {
    storyDescription:
      'Buttons support disabled states to indicate that a user can not take an action on a particular CTA. It intentionally prevents `pointer-events` from happening on the element',
  },
};

export const Sizes: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      {sizes.map(size => (
        <Grid.Col key={size}>
          <Button variant="primary" color="green" size={size}>
            Size {size}
          </Button>
        </Grid.Col>
      ))}
    </Grid.Row>
  </React.Fragment>
);
Sizes.parameters = {
  docs: {
    storyDescription: 'Buttons support size property',
  },
};

export const Block: Story = () => (
  <React.Fragment>
    <Button variant="primary" color="green" block>
      Отправить заявку
    </Button>
  </React.Fragment>
);
Block.parameters = {
  docs: {
    storyDescription: '`block` property will make the button fit to its parent width',
  },
};

export const Loading: Story = () => (
  <React.Fragment>
    <Button variant="primary" color="green" loading>
      Отправить заявку
    </Button>
  </React.Fragment>
);
Loading.parameters = {
  docs: {
    storyDescription:
      'Buttons also support an `loading` property, which shows a loading indicator, while disabling the button, as well',
  },
};

export const WithIcon: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      <Grid.Col>
        <Button variant="primary" color="green">
          <Icon icon={<Menu />} strong />
          Отправить заявку
        </Button>
      </Grid.Col>
      <Grid.Col>
        <Button variant="primary" color="green">
          Отправить заявку
          <Icon icon={<Menu />} strong />
        </Button>
      </Grid.Col>
      <Grid.Col>
        <Button variant="primary" color="green">
          <Icon icon={<Menu />} strong />
        </Button>
      </Grid.Col>
      <Grid.Col>
        <Button variant="text" color="green">
          Отправить заявку
          <Icon icon={<Menu />} strong />
        </Button>
      </Grid.Col>
    </Grid.Row>
  </React.Fragment>
);
WithIcon.parameters = {
  docs: {
    storyDescription: 'Button components can contain an Icon',
  },
};

export const WithBadge: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      <Grid.Col>
        <Button>
          Отправить заявку
          <Badge shape="circle" text={30} />
        </Button>
      </Grid.Col>
      <Grid.Col>
        <Button>
          Отправить заявку
          <Badge shape="circle" text={30} />
        </Button>
      </Grid.Col>
    </Grid.Row>
  </React.Fragment>
);
WithBadge.parameters = {
  docs: {
    storyDescription: 'Button components can contain an Badge',
  },
};
