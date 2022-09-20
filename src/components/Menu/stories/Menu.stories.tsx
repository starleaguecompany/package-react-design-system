import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Menu as IconMenu } from '@starleaguecompany/react-icons';

import { Checkbox } from '../../Checkbox';
import { Avatar } from '../../Avatar';
import { Icon } from '../../Icon';
import { Link } from '../../Typography';

import { Menu } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Menu } from '${reactDSImportPath}'
// Import types
import { MenuProps } from '${reactDSImportPath}/lib/Menu'
\`\`\``;

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    Item: Menu.Item,
    ItemGroup: Menu.ItemGroup,
  },
  parameters: {
    componentSubtitle: 'The Menu component shows a list of actions that user can take',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <Menu>
    <Menu.Item>1 год</Menu.Item>
    <Menu.Item active>2 года</Menu.Item>
    <Menu.Item>3 года</Menu.Item>
    <Menu.Item>4 года</Menu.Item>
    <Menu.Item>5 лет</Menu.Item>
  </Menu>
);
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};

export const Disabled: Story = () => (
  <Menu>
    <Menu.Item hint="г Москва">ул. Анапская</Menu.Item>
    <Menu.Item hint="г Анадырь" disabled>
      ул. Анапская
    </Menu.Item>
    <Menu.Item hint="г Санкт Петербург">ул. Анапская</Menu.Item>
  </Menu>
);

export const WithHint: Story = () => (
  <Menu>
    <Menu.Item hint="г Москва">ул. Анапская</Menu.Item>
    <Menu.Item hint="г Анадырь" active>
      ул. Анапская
    </Menu.Item>
    <Menu.Item hint="г Санкт Петербург">ул. Анапская</Menu.Item>
  </Menu>
);

export const WithDescription: Story = () => {
  const descriptionAsNode = (
    <div>
      Description <Link href="#">link</Link>
    </div>
  );

  return (
    <Menu>
      <Menu.Item description="Subtitle">Ренесанс Кредит Банк</Menu.Item>
      <Menu.Item description="Subtitle" active>
        РСХБ Банк
      </Menu.Item>
      <Menu.Item description="Subtitle">Росбанк</Menu.Item>
      <Menu.Item description={descriptionAsNode}>Связьбанк</Menu.Item>
    </Menu>
  );
};

export const WithIcon: Story = () => (
  <Menu>
    <Menu.Item
      hint="Subtitle"
      icon={
        <Icon size={16}>
          <IconMenu />
        </Icon>
      }
    >
      Ренесанс Кредит Банк
    </Menu.Item>
    <Menu.Item
      hint="Subtitle"
      icon={
        <Icon size={16}>
          <IconMenu />
        </Icon>
      }
      active
    >
      РСХБ Банк
    </Menu.Item>
    <Menu.Item
      hint="Subtitle"
      icon={
        <Icon size={16}>
          <IconMenu />
        </Icon>
      }
      disabled
    >
      Росбанк
    </Menu.Item>
  </Menu>
);

export const WithAvatar: Story = () => (
  <Menu>
    <Menu.Item
      description="Subtitle"
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
    >
      1 год
    </Menu.Item>
    <Menu.Item
      description="Subtitle"
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
      active
    >
      2 года
    </Menu.Item>
    <Menu.Item
      description="Subtitle"
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
      disabled
    >
      3 года
    </Menu.Item>
  </Menu>
);

export const WithControl: Story = () => (
  <Menu>
    <Menu.Item
      description="Очень длинный текст, может быть в две или даже три строки"
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
      control={<Checkbox />}
    >
      Title
    </Menu.Item>
    <Menu.Item
      description="Очень длинный текст, может быть в две или даже три строки"
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
      control={<Checkbox />}
      active
    >
      Title
    </Menu.Item>
    <Menu.Item
      description="Очень длинный текст, может быть в две или даже три строки"
      icon={<Avatar size={36} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />}
      control={<Checkbox />}
      disabled
    >
      Title
    </Menu.Item>
  </Menu>
);

export const WithGroup: Story = () => (
  <Menu>
    <Menu.ItemGroup label="Text">
      <Menu.Item>Не первый</Menu.Item>
      <Menu.Item>Не последний</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup
      label={
        <>
          <Icon icon={<IconMenu />} strong /> With Icon
        </>
      }
    >
      <Menu.Item>6 лет</Menu.Item>
      <Menu.Item>7 лет</Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);
