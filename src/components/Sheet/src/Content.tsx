import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { FooterProps } from '../types/Sheet.types'
import styles from '../styles/Sheet.module.less'

/**
 * @description Sheet Content component.
 *
 * @component
 * @example
 * ```jsx
 * <Sheet.Content>content</Sheet>
 * ```
 */
const Content = React.forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const { className, children, ...restProps } = props

  const cx = useStyles(styles)

  return (
    <div ref={ref} className={cx(className, 'content')} {...restProps}>
      {children}
    </div>
  )
})

Content.defaultProps = {}

export default Content
