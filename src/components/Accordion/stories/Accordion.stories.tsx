import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { useBoolean } from '@starleaguecompany/package-react-utils'

import { Text } from '../../Typography'

import { Accordion } from '..'
import { reactDSImportPath } from '../../../constants/imports'
import { Button } from '../../Button'
import { Icon } from '../../Icon'
import { Warning } from '@starleaguecompany/react-icons'

const Import = `\`\`\`javascript
// Import component
import { Accordion } from '${reactDSImportPath}'
// Import types
import { AccordionProps } from '${reactDSImportPath}/lib/Accordion'
\`\`\``

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    componentSubtitle: 'A content area which can be collapsed and expanded',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

const content = (
  <React.Fragment>
    <Text className="h-mb-20">
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
    <Text className="h-mb-20">
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
    <Text>
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
  </React.Fragment>
)

export const Basic: Story = () => (
  <React.Fragment>
    <Text className="h-mb-20">Basic usage.</Text>
    <Accordion defaultIndex={[1]}>
      <Accordion.Item title="О кредите">{content}</Accordion.Item>
      <Accordion.Item title="Куда прислать решение банка?">{content}</Accordion.Item>
      <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>
    </Accordion>
  </React.Fragment>
)

Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const WithDescription: Story = () => (
  <React.Fragment>
    <Accordion>
      <Accordion.Item title="О кредите" subtitle="Здесь можно указать подробное описание">
        {content}
      </Accordion.Item>
      <Accordion.Item title="Куда прислать решение банка?" subtitle="Здесь можно указать подробное описание">
        {content}
      </Accordion.Item>
      <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>
    </Accordion>
  </React.Fragment>
)

export const WithIcon: Story = () => {
  const icon = (
    <Icon color="red" size={24}>
      <Warning />
    </Icon>
  )

  return (
    <React.Fragment>
      <Accordion>
        <Accordion.Item title="О кредите" subtitle="Здесь можно указать подробное описание" icon={icon}>
          {content}
        </Accordion.Item>
        <Accordion.Item subtitle="Здесь можно указать подробное описание" icon={icon}>
          {content}
        </Accordion.Item>
        <Accordion.Item title="Паспорт РФ" icon={icon}>
          {content}
        </Accordion.Item>
        <Accordion.Item icon={icon}>{content}</Accordion.Item>
      </Accordion>
    </React.Fragment>
  )
}

export const WithDivider: Story = () => (
  <React.Fragment>
    <Accordion separator="divider">
      <Accordion.Item title="О кредите" subtitle="Здесь можно указать подробное описание">
        {content}
      </Accordion.Item>
      <Accordion.Item title="Куда прислать решение банка?" subtitle="Здесь можно указать подробное описание">
        {content}
      </Accordion.Item>
      <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>
    </Accordion>
  </React.Fragment>
)

export const WithBackground: Story = () => (
  <React.Fragment>
    <Accordion background="white">
      <Accordion.Item title="О кредите" subtitle="Здесь можно указать подробное описание">
        {content}
      </Accordion.Item>
      <Accordion.Item title="Куда прислать решение банка?" subtitle="Здесь можно указать подробное описание">
        {content}
      </Accordion.Item>
      <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>
    </Accordion>
  </React.Fragment>
)

export const WithOptionalItem: Story = () => {
  const [visible, setVisible] = useBoolean(false)

  const handleVisibilityChange = () => {
    setVisible.toggle()
  }

  return (
    <React.Fragment>
      <Button onClick={handleVisibilityChange}>{`${visible ? 'Hide' : 'Show'} last item`}</Button>
      <Accordion>
        <Accordion.Item title="О кредите">{content}</Accordion.Item>
        <Accordion.Item title="Куда прислать решение банка?">{content}</Accordion.Item>
        {visible && <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>}
      </Accordion>
    </React.Fragment>
  )
}

export const WithoutScrollIntoView: Story = () => (
  <React.Fragment>
    <Accordion scrollIntoView={false}>
      <Accordion.Item title="О кредите">{content}</Accordion.Item>
      <Accordion.Item title="Куда прислать решение банка?">{content}</Accordion.Item>
      <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>
    </Accordion>
  </React.Fragment>
)

export const WithEmptyChildren: Story = () => (
  <React.Fragment>
    <Accordion scrollIntoView={false}>
      <Accordion.Item title="О кредите">{content}</Accordion.Item>
      <Accordion.Item title="Куда прислать решение банка?"></Accordion.Item>
      <Accordion.Item title="Паспорт РФ">{null}</Accordion.Item>
    </Accordion>
  </React.Fragment>
)
