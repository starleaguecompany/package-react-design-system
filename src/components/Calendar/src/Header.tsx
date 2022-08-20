import * as React from 'react'
import { useStyles, safeInvoke } from '@starleaguecompany/package-react-utils'
import { ArrowLeft, ArrowRight } from '@starleaguecompany/react-icons'

import { Icon } from '../../Icon'
import { Button } from '../../Button'
import { Text } from '../../Typography'
import { Space } from '../../Space'

import { getMonthFormatted } from '../utils/date'

import { HeaderProps } from '../types/Calendar.types'
import styles from '../styles/Calendar.module.less'

const Header: React.FC<HeaderProps> = props => {
  const { month, className, onChange, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'header')

  const handleChangeMonth = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      safeInvoke(onChange, event.currentTarget.dataset.direction)
    },
    [month]
  )

  return (
    <Space size={0} align="center" justify="space-between" className={classNames} {...restProps}>
      <Button color="blue" variant="text" data-direction="prev" onClick={handleChangeMonth}>
        <Icon strong icon={<ArrowLeft />} />
      </Button>
      <Text className={cx('current-month')} capitalize>
        {getMonthFormatted(month)}
      </Text>
      <Button color="blue" variant="text" data-direction="next" onClick={handleChangeMonth}>
        <Icon strong icon={<ArrowRight />} />
      </Button>
    </Space>
  )
}

export default Header
