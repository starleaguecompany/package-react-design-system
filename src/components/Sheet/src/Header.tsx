import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import { HeaderProps } from '../types/Sheet.types'
import styles from '../styles/Sheet.module.less'

/**
 * @description Sheet Header component.
 *
 * @component
 * @example
 * ```jsx
 * <Sheet.Header>content</Sheet>
 * ```
 */
const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { title, subtitle, className, children, ...restProps } = props

  const cx = useStyles(styles)

  return (
    <div ref={ref} className={cx(className, 'header')} {...restProps}>
      {title || subtitle ? (
        <Space direction="vertical" size={0} className={cx('titleWrapper')}>
          {title && <div className={cx('title')}>{title}</div>}
          {subtitle && <div className={cx('subtitle')}>{subtitle}</div>}
        </Space>
      ) : null}
      {children}
    </div>
  )
})

Header.defaultProps = {}

export default Header
