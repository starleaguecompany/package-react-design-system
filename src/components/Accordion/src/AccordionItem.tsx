import * as React from 'react'
import { noop, useStyles } from '@starleaguecompany/package-react-utils'
import { ArrowDown } from '@starleaguecompany/react-icons'

import { Icon } from '../../Icon'
import { Collapse } from '../../Transition'
import { Space } from '../../Space'

import { AccordionItemProps } from '../types/Accordion.types'
import styles from '../styles/Accordion.module.less'

/**
 * @description Accordion Item component.
 *
 * @component
 * @example
 * ```jsx
 * <Accordion.Item key="credit" title="О кредите">content</Accordion.Item>
 * ```
 */
const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
  const { id, title, subtitle, icon, active, scrollIntoView, tabIndex, className, children, onCollapse, ...restProps } =
    props
  const activeItemRef = React.useRef<HTMLDivElement | null>(null)

  const cx = useStyles(styles)

  const collapse = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      if (scrollIntoView) {
        activeItemRef.current = event.currentTarget.closest('[data-qa=CollapseItem]')

        setTimeout(() => {
          activeItemRef.current && activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 300)
      }

      onCollapse && onCollapse(event)
    },
    [onCollapse, scrollIntoView]
  )

  const handleCollapse = (event: React.MouseEvent<HTMLDivElement>) => {
    collapse(event)
  }

  const handleKeypress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      collapse(event)
    }
  }

  return (
    <div ref={ref} data-qa="CollapseItem" className={cx(className, 'panel', { active })} {...restProps}>
      <div
        className={cx('header', { active })}
        data-index={id}
        tabIndex={tabIndex}
        onClick={children ? handleCollapse : noop}
        onKeyPress={handleKeypress}
      >
        <Space size={12} align="center">
          {icon && <div className={cx('icon')}>{icon}</div>}
          {title || subtitle ? (
            <Space direction="vertical" size={2} className={cx('titleWrapper')}>
              {title && <div className={cx('title')}>{title}</div>}
              {subtitle && <div className={cx('subtitle')}>{subtitle}</div>}
            </Space>
          ) : null}
        </Space>
        {children && <Icon className={cx('collapseIcon')} icon={<ArrowDown />} />}
      </div>
      <Collapse visible={active} className={cx('content')} unmountOnExit>
        <div className={cx('content-wrapper')}>{children}</div>
      </Collapse>
    </div>
  )
})

Item.defaultProps = {
  tabIndex: 0,
}

export default Item
