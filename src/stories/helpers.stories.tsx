import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Source } from '@storybook/addon-docs'
import { linkTo } from '@storybook/addon-links'

import { SPACE_SIZES } from '../constants/spaces'
import { Typography } from '..'

const { Text } = Typography

export default {
  title: 'Foundations/Helpers',
  parameters: {
    componentSubtitle: 'CSS helpers',
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
} as Meta

const colors = {
  L: [100],
  D: [100, 80, 60, 30, 20, 10, '06'],
  G: [300, 200, 100, 30, '06'],
  B: [300, 200, 100, 30, '06'],
  O: [300, 200, 100, 30, '06'],
  V: [300, 200, 100, 30, '06'],
  R: [300, 200, 100, 30, '06'],
}

const spaces = Object.values(SPACE_SIZES).slice(1)

export const Margins: Story = () => {
  const topMargins = spaces.map((size: number | string) => `<p className="h-mt-${size}">Text</p>`).join('\n')
  const bottomMargins = spaces.map((size: number | string) => `<p className="h-mb-${size}">Text</p>`).join('\n')
  const rightMargins = spaces.map((size: number | string) => `<p className="h-mr-${size}">Text</p>`).join('\n')
  const leftMargins = spaces.map((size: number | string) => `<p className="h-ml-${size}">Text</p>`).join('\n')

  return (
    <React.Fragment>
      <Text>Top margins:</Text>
      <Source
        language="jsx"
        code={`
${topMargins}
        `}
      />

      <Text>Bottom margins:</Text>
      <Source
        language="jsx"
        code={`
${bottomMargins}
        `}
      />

      <Text>Right margins:</Text>
      <Source
        language="jsx"
        code={`
${rightMargins}
        `}
      />

      <Text>Left margins:</Text>
      <Source
        language="jsx"
        code={`
${leftMargins}
        `}
      />
    </React.Fragment>
  )
}

export const Paddings: Story = () => {
  const topPaddings = spaces.map((size: number | string) => `<p className="h-pt-${size}">Text</p>`).join('\n')
  const bottomPaddings = spaces.map((size: number | string) => `<p className="h-pb-${size}">Text</p>`).join('\n')
  const rightPaddings = spaces.map((size: number | string) => `<p className="h-pr-${size}">Text</p>`).join('\n')
  const leftPaddings = spaces.map((size: number | string) => `<p className="h-pl-${size}">Text</p>`).join('\n')

  return (
    <React.Fragment>
      <Text>Top paddings:</Text>
      <Source
        language="jsx"
        code={`
${topPaddings}
        `}
      />

      <Text>Bottom paddings:</Text>
      <Source
        language="jsx"
        code={`
${bottomPaddings}
        `}
      />

      <Text>Right paddings:</Text>
      <Source
        language="jsx"
        code={`
${rightPaddings}
        `}
      />

      <Text>Left paddings:</Text>
      <Source
        language="jsx"
        code={`
${leftPaddings}
        `}
      />
    </React.Fragment>
  )
}

export const TextAlignment: Story = () => (
  <React.Fragment>
    <Text>Text left:</Text>
    <Source
      language="jsx"
      code={`
<p className="h-text-left">Text</p>
      `}
    />
    <Text>Text center:</Text>
    <Source
      language="jsx"
      code={`
<p className="h-text-center">Text</p>
      `}
    />
    <Text>Text right:</Text>
    <Source
      language="jsx"
      code={`
<p className="h-text-right">Text</p>
      `}
    />
  </React.Fragment>
)

export const Shadow: Story = () => (
  <React.Fragment>
    <Source
      language="jsx"
      code={`
<div className="h-shadow">Text</div>
<div className="h-shadow-backward">Text</div>
      `}
    />
  </React.Fragment>
)

export const Colors: Story = () => {
  const items = Object.keys(colors)
    .map((name: string) => {
      const theme = colors[name]

      return theme.map((color: number | string) => `<div className="h-color-${name}${color}">Text</div>`).join('\n')
    })
    .join('\n')

  return (
    <React.Fragment>
      <Text className="h-mb-20">
        Helpers for all colors from{' '}
        <span className="h-color-B100" onClick={linkTo('Foundations/Colors')}>
          color palette
        </span>
        :
      </Text>
      <Source
        language="jsx"
        code={`
${items}
        `}
      />
    </React.Fragment>
  )
}
