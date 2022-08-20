import * as React from 'react'
import { useStyles, useId, noop, safeInvoke } from '@starleaguecompany/package-react-utils'

import { CONTAINER_SIZES } from '../../../constants/sizes'

import { RadioButtonProps } from '../types/RadioButton.types'
import styles from '../styles/RadioButton.module.less'

/**
 * @description The RadioButton is a simple way to create button groups in most use cases
 *
 * @component
 * @example
 * ```jsx
 * <RadioButton options={options} defaultValue={value} block>
 * ```
 */
const RadioButton = React.forwardRef<HTMLDivElement, RadioButtonProps>((props, ref) => {
  const { options, value, defaultValue, size, onChange, className, ...restProps } = props
  const cx = useStyles(styles)
  const id = useId('radio-button')

  const [innerValue, setInnerValue] = React.useState<string | number | undefined>(defaultValue || value)

  React.useEffect(() => {
    value && setInnerValue(value)
  }, [value])

  const classNames = cx(className, 'container')

  const handleSelect = (value: string | number) => () => {
    setInnerValue(value)
    safeInvoke(onChange, value)
  }

  const buttons = React.useMemo(() => {
    if (options && Array.isArray(options)) {
      return options.map(({ label, value, disabled }) => {
        const classNames = cx('button', {
          [`size-${size}`]: size,
          active: innerValue === value,
          disabled,
        })

        return (
          <button
            key={`${id}-${value}`}
            type="button"
            className={classNames}
            onClick={disabled ? noop : handleSelect(value)}
          >
            {label}
          </button>
        )
      })
    }

    return null
  }, [id, options, innerValue])

  return (
    <div ref={ref} data-qa="RadioButton" className={classNames} {...restProps}>
      {buttons}
    </div>
  )
})

RadioButton.defaultProps = {
  size: CONTAINER_SIZES.S36,
}

export default RadioButton
