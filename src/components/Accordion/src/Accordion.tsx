import * as React from 'react'
import { useStyles, useMultiValue, safeInvoke, isNull } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import { AccordionProps } from '../types/Accordion.types'
import styles from '../styles/Accordion.module.less'

export * from '../types/Accordion.types'

/**
 * @description A content area which can be collapsed and expanded
 *
 * @component
 * @example
 * ```jsx
 * <Accordion activeKeys={['credit']}>
 *   <Accordion.Item key="credit" title="О кредите">content</Accordion.Item>
 * </Accordion>
 * ```
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const { defaultIndex, separator, background, scrollIntoView, children, className, onChange, ...restProps } = props
  const [innerValue, setInnerValue] = useMultiValue<number>(defaultIndex || [])

  const cx = useStyles(styles)

  const classNames = cx(className, {
    [`separator-${separator}`]: separator,
    [`background-${background}`]: background,
  })

  const handleCollapse = React.useCallback(
    event => {
      const value = Number(event.currentTarget.dataset.index)

      setInnerValue(value, val => {
        safeInvoke(onChange, val)
      })
    },
    [innerValue]
  )

  const separatorSpace = separator === 'space' ? 16 : 0

  const panels = React.useMemo(() => {
    return React.Children.map(children as React.ReactElement, (child, index) => {
      if (isNull(child)) return

      const childProps = {
        ...child.props,
        id: index,
        active: innerValue.indexOf(index) >= 0,
        scrollIntoView,
        onCollapse: handleCollapse,
      }

      return React.cloneElement(child, childProps)
    })
  }, [innerValue, children])

  return (
    <Space
      ref={ref}
      data-qa="Accordion"
      size={separatorSpace}
      direction="vertical"
      className={classNames}
      {...restProps}
    >
      {panels}
    </Space>
  )
})

Accordion.defaultProps = {
  defaultIndex: [],
  separator: 'space',
  scrollIntoView: true,
}

export default Accordion
