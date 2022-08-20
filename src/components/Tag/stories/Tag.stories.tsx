import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Menu } from '@starleaguecompany/react-icons'

import * as Grid from '../../Grid'
import { Icon } from '../../Icon'

import { Tag } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Tag } from '${reactDSImportPath}'
// Import types
import { TagProps } from '${reactDSImportPath}/lib/Tag'
\`\`\``

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    componentSubtitle: 'Tag for categorizing or markup',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Basic: Story = () => {
  const [active, setActive] = React.useState<boolean>(false)

  const handleClick = React.useCallback(() => {
    setActive(active => !active)
  }, [active])

  return (
    <Tag active={active} onClick={handleClick}>
      35 000 $
    </Tag>
  )
}
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const Sizes: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      <Grid.Col>
        <Tag size={36}>35 000 $</Tag>
      </Grid.Col>
      <Grid.Col>
        <Tag size={44}>35 000 $</Tag>
      </Grid.Col>
    </Grid.Row>
  </React.Fragment>
)
Sizes.parameters = {
  docs: {
    storyDescription: 'Tag support a default tag size as well as a `36` and `44`',
  },
}

export const WithIcon: Story = () => (
  <React.Fragment>
    <Grid.Row gutter={20}>
      <Grid.Col>
        <Tag size={36}>
          <Icon icon={<Menu />} />
          35 000 $
        </Tag>
      </Grid.Col>
      <Grid.Col>
        <Tag size={44}>
          <Icon icon={<Menu />} />
          35 000 $
        </Tag>
      </Grid.Col>
    </Grid.Row>
  </React.Fragment>
)
WithIcon.parameters = {
  docs: {
    storyDescription: 'Tag components can contain an Icon',
  },
}

export const Closable: Story = () => (
  <React.Fragment>
    <Tag active closable>
      <Icon icon={<Menu />} />
      35 000 $
    </Tag>
  </React.Fragment>
)
Closable.parameters = {
  docs: {
    storyDescription:
      'Usage of basic Tag, and it could be closable by set closable property. Closable Tag supports `onClose` events',
  },
}
