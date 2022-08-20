import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { ListItemProps } from '../types/ListItem.types'
import styles from '../styles/List.module.less'

/**
 * @description List item element.
 *
 * @component
 * @example
 * ```jsx
 * <ListItem>...</ListItem>
 * ```
 */
const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { icon, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'item', {
    'with-icon': icon,
  })

  return (
    <li ref={ref} className={classNames} {...restProps}>
      {icon ? <span className={cx('icon')}>{icon}</span> : null}
      {children}
    </li>
  )
})

export { ListItem }
