import * as React from 'react'
import { useStyles, noop } from '@starleaguecompany/package-react-utils'
import { Check } from '@starleaguecompany/react-icons'

import { RadioProps } from '../types/Radio.types'
import styles from '../styles/Radio.module.less'

/**
 * @description Radio component.
 *
 * @component
 * @example
 * ```jsx
 * <Radio name="radio" value="default" label="Radio default" checked disabled />
 * ```
 */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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

  return (
    <label data-qa="Radio" className={classNames}>
      <input
        ref={ref}
        className={cx('input')}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      <div className={controlClassNames}>{checked ? <Check className={cx('icon')} /> : null}</div>
      {children ? <span className={cx('label')}>{children}</span> : null}
    </label>
  )
})

Radio.defaultProps = {
  checked: false,
  onChange: noop,
}

export default Radio
