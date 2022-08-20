import * as React from 'react'
import { useStyles, useId, noop, safeInvoke } from '@starleaguecompany/package-react-utils'

import Star from './Star'

import { RateProps } from '../types/Rate.types'
import styles from '../styles/Rate.module.less'

const roundToFraction = (index: number) => {
  return Math.ceil(index * 2) / 2
}

const fractionalIndex = (event: React.MouseEvent<HTMLDivElement>) => {
  const x = event.clientX - event.currentTarget.getBoundingClientRect().left

  return roundToFraction(x / event.currentTarget.offsetWidth)
}

/**
 * @description A quick rating operation on something
 *
 * @component
 * @example
 * ```jsx
 * <Rate allowHalf defaultValue={4} count={5}>
 * ```
 */
const Rate = React.forwardRef<HTMLDivElement, RateProps>((props, ref) => {
  const { allowHalf, count, defaultValue, value, disabled, onChange, className, ...restProps } = props

  const cx = useStyles(styles)
  const id = useId('rate')
  const classNames = cx(className, 'container', {
    ['disabled']: disabled,
  })

  const [innerValue, setInnerValue] = React.useState<number>(defaultValue || value || 0)
  const [hoverIndex, setHoverIndex] = React.useState(null)

  const handleHover = React.useCallback(
    (event, index) => {
      const value = allowHalf ? index + fractionalIndex(event) : index + 1

      setHoverIndex(value)
    },
    [hoverIndex]
  )

  const handleMouseLeave = React.useCallback(() => {
    setHoverIndex(null)
  }, [hoverIndex])

  const handleClickRate = React.useCallback(
    (event, index) => {
      const value = allowHalf ? index + fractionalIndex(event) : index + 1

      setInnerValue(value)
      safeInvoke(onChange, value)
    },
    [innerValue]
  )

  React.useEffect(() => {
    value && setInnerValue(value)
  }, [value])

  const stars = React.useMemo(() => {
    return Array.from(new Array(count)).map((_, index) => (
      <Star
        key={`${id}-${index}`}
        index={index}
        value={hoverIndex === null ? innerValue : hoverIndex}
        allowHalf={allowHalf}
        disabled={disabled}
        onHover={handleHover}
        onClick={handleClickRate}
      />
    ))
  }, [hoverIndex, innerValue, count, disabled, allowHalf])

  return (
    <div
      ref={ref}
      data-qa="Rate"
      className={classNames}
      {...restProps}
      onMouseLeave={disabled ? noop : handleMouseLeave}
    >
      {stars}
    </div>
  )
})

Rate.defaultProps = {
  allowHalf: false,
  count: 5,
}

export default Rate
