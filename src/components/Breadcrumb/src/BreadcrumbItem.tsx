import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Link } from '../../Typography'

import { BreadcrumbItemProps } from '../types/Breadcrumb.types'
import styles from '../styles/Breadcrumb.module.less'

/**
 * @description Breadcrumb Item component.
 *
 * @component
 * @example
 * ```jsx
 * <Breadcrumb.Item>Home</Breadcrumb.Item>
 * ```
 */
const Item = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>((props, ref) => {
  const { className, children, ...restProps } = props
  const cx = useStyles(styles)

  return (
    <Link ref={ref} className={cx(className, 'item')} {...restProps} color="black">
      {children}
    </Link>
  )
})

Item.defaultProps = {}

export default Item
