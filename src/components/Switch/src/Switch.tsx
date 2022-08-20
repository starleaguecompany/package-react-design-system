import * as React from 'react'
import { useStyles, noop } from '@starleaguecompany/package-react-utils'

import { SwitchProps } from '../types/Switch.types'
import styles from '../styles/Switch.module.less'

/**
 * @description The Switch component is used to switch between two options and the result of the change is immediate
 *
 * @component
 * @example
 * ```jsx
 * <Switch>content</Switch>
 * ```
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { name, value, checked, disabled, readOnly, className, children, onChange, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container', {
    checked: checked,
    disabled: disabled,
    readOnly: readOnly,
  })
  const controlClassNames = cx('control', {
    checked: checked,
    disabled: disabled,
  })
  const handlerClassNames = cx('handler', {
    checked: checked,
    disabled: disabled,
  })

  // const handleClick = (event)

  return (
    <label data-qa="Switch" className={classNames}>
      <input
        ref={ref}
        className={cx('input')}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      <div className={controlClassNames}>
        <div className={handlerClassNames} />
      </div>
      {children ? <span className={cx('label')}>{children}</span> : null}
    </label>
  )
})

Switch.defaultProps = {
  checked: false,
  onChange: noop,
}

export default Switch
