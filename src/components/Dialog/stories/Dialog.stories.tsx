import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { useBoolean } from '@starleaguecompany/package-react-utils'
import { Warning } from '@starleaguecompany/react-icons'

import { Heading, Text } from '../../Typography'
import { Button } from '../../Button'
import { Space } from '../../Space'
import { Icon } from '../../Icon'
import { Avatar } from '../../Avatar'
import { Accordion } from '../../Accordion'

import { Dialog } from '..'
import { reactDSImportPath } from '../../../constants/imports'

const Import = `\`\`\`javascript
// Import component
import { Dialog } from '${reactDSImportPath}'
// Import types
import { DialogProps } from '${reactDSImportPath}/lib/Dialog'
\`\`\``

export default {
  title: 'Components/Dialog',
  component: Dialog,
  subcomponents: {
    Header: Dialog.Header,
    Content: Dialog.Content,
    Footer: Dialog.Footer,
  },
  parameters: {
    componentSubtitle:
      'The Dialog component is used to show content on top of an overlay that requires user interaction',
    docs: {
      description: {
        component: Import,
      },
    },
  },
} as Meta

const content = (
  <div style={{ maxWidth: 600 }}>
    <Text className="h-mb-20">
      Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt
      duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis.
    </Text>
    <Text className="h-mb-20">
      Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
    </Text>
    <Text>
      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur
      esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
    </Text>
  </div>
)

export const Basic: Story = () => {
  const [visible, setVisible] = useBoolean(false)

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Dialog</Button>
      <Dialog visible={visible} onClose={setVisible.off}>
        <Dialog.Header title="Заголовок" />
        <Dialog.Content>{content}</Dialog.Content>
      </Dialog>
    </React.Fragment>
  )
}
Basic.parameters = {
  docs: {
    storyDescription: 'Basic usage',
  },
}

export const WithDescription: Story = () => {
  const [visible, setVisible] = useBoolean(false)

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Dialog</Button>
      <Dialog visible={visible} onClose={setVisible.off}>
        <Dialog.Header title="Заголовок" subtitle="Здесь можно указать подробное описание" />
        <Dialog.Content>{content}</Dialog.Content>
      </Dialog>
    </React.Fragment>
  )
}

export const WithIcon: Story = () => {
  const [visible, setVisible] = useBoolean(false)
  const icon = (
    <Icon color="red" size={24}>
      <Warning />
    </Icon>
  )

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Dialog</Button>
      <Dialog visible={visible} onClose={setVisible.off}>
        <Dialog.Header icon={icon} title="Заголовок" subtitle="Здесь можно указать подробное описание" />
        <Dialog.Content>{content}</Dialog.Content>
      </Dialog>
    </React.Fragment>
  )
}

export const WithAvatar: Story = () => {
  const [visible, setVisible] = useBoolean(false)
  const icon = <Avatar size={52} src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" />

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Dialog</Button>
      <Dialog visible={visible} onClose={setVisible.off}>
        <Dialog.Header icon={icon} title="Заголовок" subtitle="Здесь можно указать подробное описание" />
        <Dialog.Content>{content}</Dialog.Content>
      </Dialog>
    </React.Fragment>
  )
}

export const WithFooter: Story = () => {
  const [visible1, setVisible1] = useBoolean(false)
  const [visible2, setVisible2] = useBoolean(false)

  const footer1 = React.useMemo(() => {
    return (
      <Button variant="primary" color="blue" onClick={setVisible1.off}>
        Ясно
      </Button>
    )
  }, [visible1])

  const footer2 = React.useMemo(() => {
    return (
      <React.Fragment>
        <Button variant="primary" color="blue">
          Ясно
        </Button>
        <Button variant="secondary" color="blue" onClick={setVisible2.off}>
          Понятно
        </Button>
      </React.Fragment>
    )
  }, [visible2])

  return (
    <React.Fragment>
      <Space size={20}>
        <div>
          <Button onClick={setVisible1.on}>Show Dialog</Button>
          <Dialog visible={visible1} onClose={setVisible1.off}>
            <Dialog.Header title="Заголовок" subtitle="Здесь можно указать подробное описание" />
            <Dialog.Content>{content}</Dialog.Content>
            <Dialog.Footer>{footer1}</Dialog.Footer>
          </Dialog>
        </div>
        <div>
          <Button onClick={setVisible2.on}>Show Dialog</Button>
          <Dialog visible={visible2} onClose={setVisible2.off}>
            <Dialog.Header title="Заголовок" subtitle="Здесь можно указать подробное описание" />
            <Dialog.Content>
              {content}
              {content}
              {content}
            </Dialog.Content>
            <Dialog.Footer>{footer2}</Dialog.Footer>
          </Dialog>
        </div>
      </Space>
    </React.Fragment>
  )
}

WithFooter.parameters = {
  docs: {
    storyDescription: 'The `footer` property works with any `React Nodes`',
  },
}

export const Fullscreen: Story = () => {
  const [visible, setVisible] = useBoolean(false)
  const icon = (
    <Icon color="green" size={24}>
      <Warning />
    </Icon>
  )
  const footer = React.useMemo(() => {
    return (
      <React.Fragment>
        <Button variant="primary" color="blue">
          Ясно
        </Button>
        <Button variant="secondary" color="blue" onClick={setVisible.off}>
          Понятно
        </Button>
      </React.Fragment>
    )
  }, [visible])

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Dialog</Button>
      <Dialog fullscreen visible={visible} onClose={setVisible.off}>
        <Dialog.Header icon={icon} title="Заголовок" subtitle="Здесь можно указать подробное описание" />
        <Dialog.Content>{content}</Dialog.Content>
        <Dialog.Footer>{footer}</Dialog.Footer>
      </Dialog>
    </React.Fragment>
  )
}

export const WithCustomization: Story = () => {
  const [visible, setVisible] = useBoolean(false)

  const title = (
    <Space size={2} direction="vertical">
      <Heading level={6} className="h-color-D30" as="div">
        Donec amet quam massa felis hac id massa
      </Heading>
      <Heading level={4} className="h-color-D100" as="div">
        Vestibulum tristique nulla aliquam consectetur justo, aliquam. Porttitor in turpis volutpat diama
      </Heading>
    </Space>
  )

  return (
    <React.Fragment>
      <Button onClick={setVisible.on}>Show Dialog</Button>
      <Dialog visible={visible} onClose={setVisible.off}>
        <Dialog.Header title={title} />
        <Dialog.Content className="h-color-R100">{content}</Dialog.Content>
      </Dialog>
    </React.Fragment>
  )
}

export const WithLongTitleAndContent: Story = () => {
  const [visible, setVisible] = useBoolean(false)

  return (
    <React.Fragment>
      <Space size={20}>
        <div>
          <Button onClick={setVisible.on}>Show Dialog</Button>
          <Dialog visible={visible} onClose={setVisible.off}>
            <Dialog.Header
              title="Длинный заголовок, который не помещается на одну строку, переностится на следующую. Высота Диалога зависит от контента"
              subtitle="Здесь можно указать подробное описание"
            />
            <Dialog.Content>
              <Accordion>
                <Accordion.Item title="О кредите">{content}</Accordion.Item>
                <Accordion.Item title="Куда прислать решение банка?">{content}</Accordion.Item>
                <Accordion.Item title="Паспорт РФ">{content}</Accordion.Item>
              </Accordion>
            </Dialog.Content>
          </Dialog>
        </div>
      </Space>
    </React.Fragment>
  )
}
