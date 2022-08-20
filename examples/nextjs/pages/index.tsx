import * as React from 'react'
import Head from 'next/head'

import { Menu } from '@starleaguecompany/react-icons'
import { useBoolean, useStyles } from '@starleaguecompany/package-react-utils'
import {
  Space,
  Typography,
  Icon,
  Card,
  Checkbox,
  Button,
  Layout,
  NumberInput,
  MaskInput,
  Dialog,
  Grid,
} from '@starleaguecompany/react-design-system'

import styles from '../styles/home.module.css'

const { Heading, Text } = Typography

export default function Home() {
  const cx = useStyles(styles)
  const [visible, setVisible] = useBoolean(false)

  const Col = () => (
    <Grid.Col span={4} breakpoints={{ mobile: { span: 12 } }}>
      <Card size={24} variant="outlined">
        <Space size={20} align="center">
          <div>
            <Heading level={5} as="div">Поможем сэкономить</Heading>
            <Text className={cx('h-color-M60', 'h-mt-12')}>
              Сравните все присутствующие на рынке тарифы РКО с помощью калькулятора.
              Для <Text as="span" strong className="h-color-B100">определения минимальной суммы</Text> потенциальных комиссий за банковское обслуживание
            </Text>
          </div>
          <Icon size={28} shape="circle" color="blue">
            <Menu />
          </Icon>
        </Space>
      </Card>
    </Grid.Col>
  )

  return (
    <React.Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div style={{ flex: '1 0 auto' }}>
        <main className={styles.main}>
          <div className={styles.container}>
            <Layout className={styles.inner}>
              <Space size={20} align="center">
                <div className={styles.column}>
                  <Heading className="h-mb-12" level={1}>Персональный подбор тарифа РКО</Heading>
                  <Text size={16}>Поможем открыть счет с оптимальными условиями по комиссии.<br />Рассчитаем издержки для вашего бизнеса</Text>

                  <div className="h-mt-12">
                    <Space size={12}>
                      <MaskInput placeholder="Введите телефон" mask="+7 (999) 999-9999" />
                      <NumberInput placeholder="Код из смс" />
                    </Space>
                    <Checkbox className="h-mt-24">Согласен с правилами предоставления информации</Checkbox>
                    <Space className={cx("h-mt-32", 'button')} size={20}>
                      <Button
                        size={60}
                        color="green"
                        variant="primary"
                        block
                        onClick={setVisible.on}
                      >Показать тарифы</Button>
                    </Space>
                  </div>
                </div>
                <div className={styles.column}>image</div>
              </Space>
            </Layout>
          </div>

          <div className={styles.container}>
            <Layout className={styles.inner}>
              <Heading level={2}>Преимущества нашего сервиса</Heading>
              <Text size={16} className="h-mt-12">Выбирая открыть счет через нас, вы действительно выигрываете</Text>
              <Grid.Row gutter={20} className="h-mt-32">
                <Col/>
                <Col/>
                <Col/>
              </Grid.Row>
            </Layout>
          </div>
        </main>
      </div>

      <Dialog visible={visible} onClose={setVisible.off}>
        <Dialog.Header title="Преимущества нашего сервиса" />
        <Dialog.Content>
          <Col/>
        </Dialog.Content>
      </Dialog>
    </React.Fragment>
  )
}
