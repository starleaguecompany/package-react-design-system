import * as React from 'react';
import { motion } from 'framer-motion';
import { Story, Meta } from '@storybook/react';
import * as Icons from '@starleaguecompany/react-icons';

import { Typography, Grid, Icon } from '..';

const { Text } = Typography;

const Import = `
Before use icons, you need to install \`@starleaguecompany/react-icons\` package:

\`\`\`shell
// Install \`@starleaguecompany/react-icons\` package
yarn add --dev @starleaguecompany/react-icons
\`\`\`
Then, you can use icons

\`\`\`javascript
// Import component
import { Menu } from '@starleaguecompany/react-icons'
\`\`\``;

export default {
  title: 'Foundations/Icons',
  parameters: {
    componentSubtitle: 'Design System provides a set of commonly used interface icons you can use in your project.',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

const iconStyles = {
  paddingTop: '24px',
  paddingBottom: '24px',
  borderRadius: '20px',
};

export const Basic: Story = () => (
  <Grid.Row>
    {Object.keys(Icons).map(iconName => {
      // @ts-ignore
      const IconComponent = Icons[iconName];

      return (
        <Grid.Col key={iconName} className="h-text-center" span={2}>
          <motion.div
            style={iconStyles}
            whileHover={{
              scale: 1.3,
              transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.25 },
            }}
          >
            <Icon size={28} icon={<IconComponent />} />
            <Text size={10} className="h-mt-12" style={{ color: 'var(--color-D60)' }}>
              {iconName}
            </Text>
          </motion.div>
        </Grid.Col>
      );
    })}
  </Grid.Row>
);
