import * as React from 'react'
import { useStyles, useCountDown } from '@starleaguecompany/package-react-utils'

import { CountDownProps } from '../types/CountDown.types'
import styles from '../styles/CountDown.module.less'

/**
 * @description CountDown component.
 *
 * @component
 * @example
 * ```jsx
 * <CountDown from={0} to={987654} />
 * ```
 */
const CountDown = React.forwardRef<HTMLSpanElement, CountDownProps>((props, ref) => {
  const { from, to, speed, interval, formatter, className, ...restProps } = props
  const cx = useStyles(styles)
  const value = useCountDown({ from, to, speed, interval, formatter })

  const classNames = cx(className, 'container')

  return (
    <span ref={ref} data-qa="CountDown" className={classNames} {...restProps}>
      {value}
    </span>
  )
})

CountDown.defaultProps = {
  from: 0,
  speed: 500,
  interval: 100,
}

export default CountDown
