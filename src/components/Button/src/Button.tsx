import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { COLORS } from '../../../constants/colors'
import { CONTAINER_SIZES } from '../../../constants/sizes'

import { Spinner } from '../../Spinner'

import { ButtonProps } from '../types/Button.types'
import styles from '../styles/Button.module.less'

/**
 * @description A Button triggers an action or an event
 *
 * @component
 * @example
 * ```jsx
 * <Button variant="primary" color="green" disabled block>
 *   Primary <Icon size="s" icon={<MenuIcon />} />
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant, color, size, block, loading, disabled, active, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container', {
    block: block,
    loading: loading,
    active: active,
    [`size-${size}`]: size,
    [`disabled-${variant}`]: disabled || loading,
    [`color-${color}-${variant}`]: true,
  })
  const textClassNames = cx('text')

  return (
    <button data-qa="Button" ref={ref} className={classNames} disabled={disabled || loading} {...restProps}>
      <span className={textClassNames}>{children}</span>
      {loading && <Spinner className={cx('spinner')} />}
    </button>
  )
})

Button.defaultProps = {
  variant: 'outlined',
  color: COLORS.GRAY,
  size: CONTAINER_SIZES.S44,
}

export default Button
