import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import { FooterProps } from '../types/Sheet.types'
import styles from '../styles/Sheet.module.less'

/**
 * @description Sheet Footer component.
 *
 * @component
 * @example
 * ```jsx
 * <Sheet.Footer>content</Sheet>
 * ```
 */
const Footer = React.forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const { className, children, ...restProps } = props

  const cx = useStyles(styles)

  return (
    <Space ref={ref} size={12} justify="stretch" className={cx(className, 'footer')} {...restProps}>
      {children}
    </Space>
  )
})

Footer.defaultProps = {}

export default Footer
