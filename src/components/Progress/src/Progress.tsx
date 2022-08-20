import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { ProgressProps } from '../types/Progress.types'
import styles from '../styles/Progress.module.less'

function validProgress(progress: number | undefined) {
  if (!progress || progress < 0) {
    return 0
  }
  if (progress > 100) {
    return 100
  }
  return progress
}

/**
 * @description The Radio component allows user to select a single item from a list
 *
 * @component
 * @example
 * ```jsx
 * <Progress percent={30} />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>((props, ref) => {
  const { percent, className, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container')
  const percentStyle = {
    width: `${validProgress(percent)}%`,
  } as React.CSSProperties

  return (
    <div ref={ref} data-qa="Progress" className={classNames} {...restProps}>
      <div className={cx('inner')}>
        <div className={cx('progress')} style={percentStyle} />
      </div>
    </div>
  )
})

Progress.defaultProps = {
  percent: 0,
}

export default Progress
