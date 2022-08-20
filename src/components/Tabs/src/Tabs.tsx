import * as React from 'react'
import { useStyles, safeInvoke } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import { TabsProps } from '../types/Tabs.types'
import styles from '../styles/Tabs.module.less'

/**
 * @description Use Tabs to organize your content in logical groupings
 *
 * @component
 * @example
 * ```jsx
 * <Tabs activeKey="tab-key">
 *   <Tabs.TabPane key="tab-key" title="Tab">tab content</Tabs.TabPane>
 * </Tabs>
 * ```
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const { defaultIndex = 0, onChange, className, children, ...restProps } = props

  const [innerValue, setInnerValue] = React.useState<number>(defaultIndex)
  const cx = useStyles(styles)

  const handleChangeActiveTab = React.useCallback(
    event => {
      const value = Number(event.currentTarget.dataset.index)
      setInnerValue(value)
      safeInvoke(onChange, value)
    },
    [defaultIndex]
  )

  const navigation = React.useMemo(() => {
    return React.Children.map(children as React.ReactElement, (child, index) => {
      const classNames = cx('tab', {
        active: index === innerValue,
      })

      return (
        <Space size={4} align="center" inline className={classNames} data-index={index} onClick={handleChangeActiveTab}>
          {child.props.title}
        </Space>
      )
    })
  }, [innerValue, children])

  const panes = React.useMemo(() => {
    return React.Children.map(children as React.ReactElement, (child, index) => {
      const classNames = cx(child.props.className, 'pane', {
        active: index === innerValue,
      })

      // return <div {...child.props} className={classNames}>{child.props.children}</div>
      return React.cloneElement(child, { ...child.props, className: classNames })
    })
  }, [innerValue, children])

  return (
    <div ref={ref} data-qa="Tabs" className={className} {...restProps}>
      <Space size={20} align="center" className={cx('tabs')}>
        {navigation}
      </Space>
      <div className={cx('panes')}>{panes}</div>
    </div>
  )
})

Tabs.defaultProps = {}

export default Tabs
