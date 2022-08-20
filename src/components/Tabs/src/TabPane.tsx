import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { TabPaneProps } from '../types/TabPane.types'
import styles from '../styles/Tabs.module.less'

/**
 * @description TabPane component.
 *
 * @component
 * @example
 * ```jsx
 * <TabPane key="tab-2" title="Tab">Content</TabPane>
 * ```
 */
const TabPane = React.forwardRef<HTMLDivElement, TabPaneProps>((props, ref) => {
  const { className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'pane')

  return (
    // @ts-ignore
    <div ref={ref} data-qa="TabPane" className={classNames} {...restProps}>
      {children}
    </div>
  )
})

TabPane.defaultProps = {}

export default TabPane
