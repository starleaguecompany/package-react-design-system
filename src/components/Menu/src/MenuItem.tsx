import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Radio } from '../../Radio'
import { Checkbox } from '../../Checkbox'
import { Switch } from '../../Switch'
import { Space } from '../../Space'

import { MenuItemProps } from '../types/MenuItem.types'
import styles from '../styles/Menu.module.less'

const ChildrenWrapper = (args: Record<string, any>) => {
  const { children, ...props } = args
  return React.cloneElement(children, props)
}

/**
 * @description Menu Item component.
 *
 * @component
 * @example
 * ```jsx
 * <Menu.Item hint="hint">Content</Menu.Item>
 * ```
 */
const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const { value, icon, control, hint, description, active, disabled, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'itemBase', 'item', {
    active: active,
    disabled: disabled,
  })
  const iconClassNames = cx(className, 'icon', {
    disabled: disabled,
  })
  const controlClassNames = cx(className, 'control', {
    controlIndent: description || icon,
    disabled: disabled,
  })
  const descriptionClassNames = cx(className, 'description', {
    disabled: disabled,
  })

  const controlElement = React.useMemo(() => {
    // @ts-ignore
    if (control && (control.type === Radio || control.type === Checkbox || control.type === Switch)) {
      const inputProps = {
        value,
        disabled,
        checked: active,
        readOnly: true,
      }

      return <ChildrenWrapper {...inputProps}>{control}</ChildrenWrapper>
    }

    return control
  }, [active, disabled, control])

  return (
    <Space ref={ref} align="center" size={12} className={classNames} {...restProps}>
      {icon && <div className={iconClassNames}>{icon}</div>}

      <Space direction="vertical" align="start" size={0}>
        {hint && <div className={descriptionClassNames}>{hint}</div>}
        <div className={cx('text')}>{children}</div>
        {description && <div className={descriptionClassNames}>{description}</div>}
      </Space>

      {control && <div className={controlClassNames}>{controlElement}</div>}
    </Space>
  )
})

MenuItem.defaultProps = {}

export default MenuItem
