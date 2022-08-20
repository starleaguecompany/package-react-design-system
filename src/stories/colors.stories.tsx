import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Typography, Grid } from '..'

const { Text, Heading } = Typography

export default {
  title: 'Foundations/Colors',
  parameters: {
    componentSubtitle:
      'The color system for a product has many requirements and constraints. There is a need to be intentional and functional with color use',
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta

const Box = (props: { name: string; color: number | string }) => {
  const { name, color } = props
  const colorStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '4px',
    background: `var(--color-${name}${color})`,
    boxShadow: '0 0px 10px 0 rgba(0, 0, 0, 0.05)',
  }
  const descStyle = {
    alignItems: 'flex-start',
    marginLeft: '16px',
  }

  return (
    <Grid.Row>
      <Grid.Col style={colorStyle} />
      <Grid.Col style={descStyle}>
        <Text strong style={{ marginBottom: '8px' }}>{`${name}${color}`}</Text>
        <Text>
          <code className="code">{`var(--color-${name}${color})`}</code>
        </Text>
      </Grid.Col>
    </Grid.Row>
  )
}

const colors = {
  L: [100],
  D: [100, 80, 60, 30, 20, 10, '06'],
  G: [300, 200, 100, 30, '06'],
  B: [300, 200, 100, 30, '06'],
  O: [300, 200, 100, 30, '06'],
  V: [300, 200, 100, 30, '06'],
  R: [300, 200, 100, 30, '06'],
}

export const Colors: Story = () => (
  <React.Fragment>
    <Heading level={4}>Full Color Palette</Heading>
    <Text className="h-mb-20">You can view our entire color system within the default theme below:</Text>

    {Object.keys(colors).map((name: string) => {
      const theme = colors[name]

      return (
        <div key={name} className="h-mb-20">
          <Grid.Row gutter={[20, 20]}>
            {theme.map((color: number | string) => (
              <Grid.Col key={`${name}${color}`} span={4}>
                <Box name={name} color={color} />
              </Grid.Col>
            ))}
          </Grid.Row>
        </div>
      )
    })}
  </React.Fragment>
)
// Colors.storyName = 'with counter';
