import * as React from 'react'
import { useStyles, safeInvoke } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import { getDayFormatted, getISODate } from '../utils/date'

import { DayProps } from '../types/Calendar.types'
import styles from '../styles/Calendar.module.less'

const Day: React.FC<DayProps> = props => {
  const { date, weekend, active, disabled, highlighted, today, className, onChange, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'day', {
    today,
    weekend,
    active,
    disabled,
    highlighted,
  })

  const handleClick = React.useCallback(() => {
    if (disabled) {
      return
    }

    safeInvoke(onChange, date)
  }, [date])

  return (
    <Space
      size={0}
      align="center"
      justify="center"
      className={classNames}
      {...restProps}
      data-date={getISODate(date)}
      onClick={handleClick}
    >
      {getDayFormatted(date)}
    </Space>
  )
}

export default Day
