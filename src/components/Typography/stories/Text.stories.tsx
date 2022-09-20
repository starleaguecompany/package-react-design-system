import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Divider } from '../../Divider';
import { Text } from '..';
import { reactDSImportPath } from '../../../constants/imports';

const Import = `\`\`\`javascript
// Import component
import { Typography } from '${reactDSImportPath}'
// Import types
import { TextProps } from '${reactDSImportPath}/lib/Typography'

const { Text } = Typography
\`\`\``;

export default {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    componentSubtitle:
      'The Text component is used for single line or multiline text. The component renders a div element by default',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta;

export const Basic: Story = () => (
  <React.Fragment>
    <Text className="h-mb-8 h-color-D60">20px/24px</Text>
    <Text size={20} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text className="h-mb-8 h-color-D60">16px/20px</Text>
    <Text size={16} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text className="h-mb-8 h-color-D60">14px/20px</Text>
    <Text size={14} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text className="h-mb-8 h-color-D60">12px/16px</Text>
    <Text size={12} className="h-mb-20">
      The quick brown fox jumps over the lazy dog
    </Text>
    <Text className="h-mb-8 h-color-D60">10px/16px</Text>
    <Text size={10}>The quick brown fox jumps over the lazy dog</Text>
    <Divider size={20} />
    <Text strong className="h-mb-20">
      strong: The quick brown fox jumps over the lazy dog
    </Text>
    <Text uppercase className="h-mb-20">
      upper: The quick brown fox jumps over the lazy dog
    </Text>
    <Text lowercase className="h-mb-20">
      lower: The quick brown fox jumps over the lazy dog
    </Text>
    <Text capitalize className="h-mb-20">
      capitalize: The quick brown fox jumps over the lazy dog
    </Text>
    <Text truncate className="h-mb-20">
      truncate: The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick
      brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
    </Text>
    <Text nowrap className="h-mb-20">
      nowrap: The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown
      fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
    </Text>
    <Text lineThrough className="h-mb-20">
      lineThrough: The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick
      brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.
    </Text>
  </React.Fragment>
);
Basic.storyName = 'Text';
