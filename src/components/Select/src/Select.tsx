import * as React from 'react'
import {
  useStyles,
  useStateCallback,
  useBoolean,
  useKeyPress,
  usePositioner,
  useFormControlContext,
  noop,
  safeInvoke,
  getNextIndex,
  getPrevIndex,
  useMergedRef,
  isNull,
} from '@starleaguecompany/package-react-utils'
import { ArrowDown, Cross } from '@starleaguecompany/react-icons'

import { Z_INDEXES } from '../../../constants/zIndexes'

import { Portal } from '../../Portal'
import { TextInput } from '../../TextInput'
import { Menu } from '../../Menu'
import { Fade } from '../../Transition'

import { SelectOption, SelectValue } from '../../../types/Select.types'
import { SelectProps } from '../types/Select.types'
import styles from '../styles/Select.module.less'

/**
 * @description Select component to select value from options
 *
 * @component
 * @example
 * ```jsx
 * <Select placeholder="Услуги" defaultValue={value} options={options} />
 * ```
 */
const Select = React.forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const {
    autoFocus,
    defaultValue,
    value,
    mode,
    options,
    invalid,
    disabled,
    readOnly,
    icon,
    placement,
    flip,
    fixedWidth,
    className,
    withCrossIcon,
    onChange,
    onFocus,
    onClick,
    onBlur,
    ...restProps
  } = props

  const cx = useStyles(styles)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const reference = React.useRef<Element | null>(null)
  const popper = React.useRef<HTMLElement | null>(null)
  const focusedItemRef = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useBoolean(false)
  const formControlContext = useFormControlContext()
  const [innerValue, setInnerValue] = useStateCallback<SelectValue | undefined>(value || defaultValue)
  const [focused, setFocused] = useBoolean(autoFocus || false)
  const [innerOptions, setInnerOptions] = React.useState<SelectOption[]>(options)
  const { referenceRef, popperRef, getReferenceProps, getPopperProps } = usePositioner({
    placement: placement ? placement : 'bottom-start',
    matchWidth: fixedWidth,
    offset: [0, 8],
    flip,
  })
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const classNames = cx(className, 'container')
  const isMultiple = mode === 'multiple'

  const optionsMap = React.useMemo<Record<SelectOption['value'], SelectOption>>(() => {
    if (!innerOptions) {
      return {}
    }

    return innerOptions.reduce<Record<SelectOption['value'], SelectOption>>((acc, o) => {
      acc[o.value] = o

      return acc
    }, {})
  }, [innerOptions])

  const activeOptions = React.useMemo<SelectOption[]>(() => {
    if (!innerOptions) {
      return []
    }

    return innerOptions.filter(option => !option.disabled)
  }, [innerOptions])

  const getCurrentIndex = (value: SelectValue | undefined) => {
    if (!Array.isArray(innerOptions) || !value) return -1
    if (isMultiple && Array.isArray(value)) {
      return activeOptions.findIndex(option => option.value === value[value.length - 1])
    }

    return activeOptions.findIndex(option => option.value === value)
  }

  const displayValue = React.useMemo(() => {
    if (innerValue === undefined || innerValue === null) {
      return undefined
    }

    if (isMultiple && Array.isArray(innerValue)) {
      if (innerValue.length === 0) {
        return undefined
      }

      if (innerOptions) {
        return innerValue
          .map(v => optionsMap[v]?.label)
          .filter(Boolean)
          .join(', ')
      }
    }

    return optionsMap[innerValue as string]?.label
  }, [innerValue, optionsMap])

  const isActive = React.useCallback(
    (val: string | number) => {
      if (innerValue === undefined) {
        return false
      }

      if (isMultiple && Array.isArray(innerValue)) {
        return innerValue.includes(val)
      }

      return innerValue === val
    },
    [innerValue]
  )

  const getFocusedValue = React.useCallback(() => {
    const item = activeOptions[focusedIndex]

    if (item) {
      return item.value
    }

    return null
  }, [activeOptions, focusedIndex])

  const sortOptions = React.useCallback(() => {
    if (isNull(innerValue) || !options) return

    let sortedOptions
    if (Array.isArray(innerValue)) {
      const selectedOptions = innerValue
        .map(value => options.find(option => option.value === value))
        .filter(option => option !== undefined)
      sortedOptions = Array.from(new Set([...selectedOptions, ...options]))
    } else {
      sortedOptions = [...options].sort(item => {
        if (item.value !== innerValue) return 1

        return -1
      })
    }

    setInnerOptions(sortedOptions as SelectOption[])
  }, [innerValue, options])

  const setValue = (value: string | number | undefined): void => {
    if (isMultiple && value !== undefined) {
      const pos = ((innerValue as Array<string | number>) || []).indexOf(value)
      const data = [...((innerValue as Array<string | number>) || [])]

      if (pos >= 0) {
        data.splice(pos, 1)
      } else {
        data.push(value)
      }

      setInnerValue(data, val => {
        //TODO проверить типизацию в useStateCallback
        safeInvoke(onChange, val as SelectValue)
      })

      return
    }

    setInnerValue(value, val => {
      //TODO проверить типизацию в useStateCallback
      safeInvoke(onChange, val as SelectValue)
    })
  }

  const hideMenu = () => {
    setVisible.off()
    inputRef.current?.focus()
  }

  const handleInputBlur = React.useCallback(
    event => {
      !focused && setVisible.off()
      !focused && safeInvoke(onBlur, event)
    },
    [focused, onBlur]
  )

  const handleInputClick = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      !readOnly && setVisible.toggle()
      safeInvoke(onClick, event)
    },
    [readOnly, onClick]
  )

  const handleInputFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      !focused && setFocused.on()
      !focused && safeInvoke(onFocus, event)
    },
    [focused, onFocus]
  )

  const handleSelect = (value: string | number) => (_event: React.MouseEvent) => {
    setValue(value)

    isMultiple ? inputRef.current?.focus() : hideMenu()
  }

  const handleMouseMove = () => {
    setFocusedIndex(getCurrentIndex(innerValue))
  }

  const menu = React.useMemo(() => {
    if (!innerOptions) {
      return null
    }

    return (
      <Menu>
        {innerOptions.map(({ label, value, disabled, ...args }) => (
          <Menu.Item
            key={value}
            ref={getFocusedValue() === value ? focusedItemRef : null}
            {...args}
            value={value}
            active={isActive(value) || getFocusedValue() === value}
            disabled={disabled}
            onClick={disabled ? noop : handleSelect(value)}
            onMouseOver={handleMouseMove}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu>
    )
  }, [innerOptions, innerValue, focusedIndex, getFocusedValue, isActive])

  const view = React.useMemo(() => {
    return (
      <Portal>
        <Fade
          ref={popperRef}
          className={cx('menu')}
          unmountOnExit
          visible={visible}
          {...getPopperProps({ style: { zIndex: Z_INDEXES.DROPDOWN } }, popper)}
        >
          {menu}
        </Fade>
      </Portal>
    )
  }, [visible, menu])

  const handleCrossIconClick = () => {
    setFocusedIndex(-1)
    setValue(undefined)
  }

  const handleArrowClick = (event: React.MouseEvent) => {
    if (visible) {
      event.stopPropagation()
      hideMenu()
    }
  }

  const iconElement = React.useMemo(() => {
    if (icon) {
      return icon
    }

    if (withCrossIcon && visible && innerValue !== undefined) {
      return <Cross className={cx('icon')} onClick={handleCrossIconClick} />
    }

    return <ArrowDown className={cx('icon', { [`isArrowTurned`]: visible })} onClick={handleArrowClick} />
  }, [visible, innerValue])

  useKeyPress(
    {
      enabled: visible || focused,
      keyMap: {
        ArrowDown: event => {
          event.preventDefault()
          if (!visible) {
            setVisible.on()
            return
          }
          const nextIndex = getNextIndex(focusedIndex, activeOptions.length)
          setFocusedIndex(nextIndex)
        },

        ArrowUp: event => {
          event.preventDefault()
          if (!visible) {
            setVisible.on()
            return
          }
          const prevIndex = getPrevIndex(focusedIndex, activeOptions.length)
          setFocusedIndex(prevIndex)
        },

        Enter: event => {
          event.preventDefault()
          if (!visible) {
            setVisible.on()
            return
          }
          const value = getFocusedValue()

          if (value !== undefined && value !== null) {
            setValue(value)

            if (!isMultiple) {
              hideMenu()
            }
          }
        },

        Escape: event => {
          event.preventDefault()
          hideMenu()
        },

        Tab: () => {
          setVisible.off()
          setFocused.off()
        },
      },
    },
    [innerValue, focusedIndex, activeOptions, visible, focused]
  )

  React.useEffect(() => {
    if (visible) {
      setFocusedIndex(getCurrentIndex(innerValue))
      setFocused.on()
    }
  }, [visible, innerValue])

  React.useEffect(() => {
    const listener = (event: Event) => {
      // @ts-ignore
      if (reference.current && reference.current.contains(event.target)) {
        return
      }

      // @ts-ignore
      if (popper.current && popper.current.contains(event.target)) {
        return
      }

      visible && hideMenu()
      setFocused.off()
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [visible, reference, popper])

  React.useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value)
    }
  }, [value])

  React.useEffect(() => {
    !visible && sortOptions()
  }, [visible, options, sortOptions])

  return (
    <div data-qa="Select" className={classNames}>
      <div ref={referenceRef} {...getReferenceProps({}, reference)} onClick={handleInputClick}>
        <TextInput
          {...restProps}
          autoFocus={autoFocus}
          ref={useMergedRef(ref, inputRef)}
          invalid={formControlContext.invalid || invalid}
          disabled={formControlContext.disabled || disabled}
          value={displayValue}
          icon={iconElement}
          readOnly={true}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>
      {view}
    </div>
  )
})

Select.defaultProps = {
  withCrossIcon: true,
  fixedWidth: false,
  placement: 'bottom-start',
  flip: true,
}

export default Select
