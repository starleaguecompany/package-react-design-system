import * as React from 'react'
import { useStyles, useFormControlContext, useDebounceValue } from '@starleaguecompany/package-react-utils'

import { Slider } from '../../Slider'
import { NumberInput } from '../../NumberInput'

import { SliderInputProps } from '../types/SliderInput.types'
import styles from '../styles/SliderInput.module.less'

/**
 * @description Enter a number within certain range with the mouse or keyboard
 *
 * @component
 * @example
 * ```jsx
 * <SliderInput
 *    placeholder="Название поля"
 *    min={30000}
 *    max={1000000}
 *    postfix="₽/мес"
 *    thousandSeparator=" "
 *    logarithmic
 *  />
 * ```
 */
const SliderInput = React.forwardRef<HTMLInputElement, SliderInputProps>((props, ref) => {
  const {
    value,
    min = 0,
    max = 100,
    step = 1,
    invalid,
    disabled,
    logarithmic,
    defaultValue,
    readOnly,
    className,
    onChange,
    ...restProps
  } = props

  const cx = useStyles(styles)
  const formControlContext = useFormControlContext()

  const classNames = cx(className, 'container')

  const [innerValue, setInnerValue] = React.useState<number | undefined | ''>(value || defaultValue)
  const isExternalChangingValue = React.useRef(false)
  const debouncedInnerValue = useDebounceValue<number>(innerValue || min, 300)

  const handleChangeInput = (value: number | undefined) => {
    isExternalChangingValue.current = false
    setInnerValue(value)
  }

  const handleChangeSlider = (value: number) => {
    isExternalChangingValue.current = false
    !readOnly && setInnerValue(value)
  }

  React.useEffect(() => {
    setInnerValue(value || defaultValue)
    isExternalChangingValue.current = true
  }, [value])

  React.useEffect(() => {
    !isExternalChangingValue.current && onChange?.(innerValue === '' ? undefined : innerValue)
  }, [debouncedInnerValue])

  return (
    <div data-qa="SliderInput" className={classNames}>
      <NumberInput
        {...restProps}
        ref={ref}
        value={innerValue}
        min={min}
        max={max}
        step={step}
        invalid={formControlContext.invalid || invalid}
        disabled={formControlContext.disabled || disabled}
        readOnly={readOnly}
        format={undefined}
        onChange={handleChangeInput}
      />
      <Slider
        className={cx('slider')}
        value={innerValue || undefined}
        min={min}
        max={max}
        step={step}
        disabled={formControlContext.disabled || disabled}
        logarithmic={logarithmic}
        onChange={handleChangeSlider}
      />
    </div>
  )
})

SliderInput.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
}

export default SliderInput
