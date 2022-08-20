import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Check } from '@starleaguecompany/react-icons'

import { Icon } from '../../Icon'

import { OrderedList, ListItem, UnorderedList } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Typography } from '${reactDSImportPath}'
// Import types
import { OrderedListProps, UnorderedListProps, ListItemProps } from '${reactDSImportPath}/lib/Typography'

const { OrderedList, UnorderedList, ListItem } = Typography
\`\`\``

export default {
  title: 'Typography/List',
  component: OrderedList,
  subcomponents: { UnorderedList, OrderedList, ListItem },
  parameters: {
    componentSubtitle:
      'Design System provides a small amount of global styling and a few modifier classes for list elements',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

export const Unordered: Story = () => (
  <React.Fragment>
    <UnorderedList>
      <ListItem>Lorem ipsum dolar set amet</ListItem>
      <ListItem>Lorem ipsum dolar set amet</ListItem>
      <ListItem>Lorem ipsum dolar set amet</ListItem>
    </UnorderedList>
  </React.Fragment>
)

export const Ordered: Story = () => (
  <React.Fragment>
    <OrderedList>
      <ListItem>Lorem ipsum dolar set amet</ListItem>
      <ListItem>Lorem ipsum dolar set amet</ListItem>
      <ListItem>Lorem ipsum dolar set amet</ListItem>
    </OrderedList>
  </React.Fragment>
)

export const WithIcon: Story = () => (
  <React.Fragment>
    <UnorderedList>
      <ListItem icon={<Icon icon={<Check />} color="green" />}>Lorem ipsum dolar set amet</ListItem>
      <ListItem icon={<Icon icon={<Check />} color="green" />}>Lorem ipsum dolar set amet</ListItem>
      <ListItem icon={<Icon icon={<Check />} color="green" />}>Lorem ipsum dolar set amet</ListItem>
    </UnorderedList>
  </React.Fragment>
)
