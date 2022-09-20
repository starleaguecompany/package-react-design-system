import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Space } from '../../Space';
import { Button } from '../../Button';

import { Notifications, NotificationManager } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Notifications, NotificationManager } from '${reactDSImportPath}'
// Import types
import { NotificationsProps } from '${reactDSImportPath}/lib/Notifications'
\`\`\``;

export default {
  title: 'Components/Notifications',
  component: Notifications,
  parameters: {
    componentSubtitle: 'Display a notification message globally',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => {
  const handleClickShow = () => {
    NotificationManager.show(
      'Информационное сообщение',
      'Здесь можно указать подробное описание',
      'Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.'
    );
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Space size={12}>
          <Button variant="secondary" onClick={handleClickShow}>
            Show notification
          </Button>
        </Space>
        <Notifications />
      </React.Fragment>
    </React.Fragment>
  );
};
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
};
