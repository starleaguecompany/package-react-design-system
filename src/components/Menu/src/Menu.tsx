import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import { MenuProps } from '../types/Menu.types'
import styles from '../styles/Menu.module.less'

/**
 * @description The Menu component shows a list of actions that user can take
 *
 * @component
 * @example
 * ```jsx
 * <Menu>
 *   <Menu.Item>1 год</Menu.Item>
 *   <Menu.Item>2 года</Menu.Item>
 * </Menu>
 * ```
 */

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const { className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container')

  return (
    <Space ref={ref} data-qa="Menu" direction="vertical" size={0} className={classNames} {...restProps}>
      {children}
    </Space>
  )
})

Menu.defaultProps = {}

export default Menu
