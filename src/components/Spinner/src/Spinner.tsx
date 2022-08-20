import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { CONTENT_SIZES } from '../../../constants/sizes'

import { SpinnerProps } from '../types/Spinner.types'
import styles from '../styles/Spinner.module.less'

/**
 * @description A spinner for displaying loading state of a page or a section
 *
 * @component
 * @example
 * ```jsx
 * <Spinner />
 * ```
 */
const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>((props, ref) => {
  const { size, className, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container', {
    [`size-${size}`]: size,
  })

  return (
    <span ref={ref} data-qa="Spinner" className={classNames} {...restProps}>
      <svg className={cx('svg')} viewBox="0 0 150 150">
        <circle className={cx('circle', 'circle-1')} cx="75" cy="75" r="60" />
        <circle className={cx('circle', 'circle-2')} cx="75" cy="75" r="60" />
      </svg>
    </span>
  )
})

Spinner.defaultProps = {
  size: CONTENT_SIZES.S20,
}

export default Spinner
