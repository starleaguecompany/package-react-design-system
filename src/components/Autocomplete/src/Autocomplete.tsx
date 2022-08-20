import * as React from 'react'
import {
  useStyles,
  useStateCallback,
  useBoolean,
  useKeyPress,
  usePositioner,
  useFormControlContext,
  safeInvoke,
  noop,
  getNextIndex,
  getPrevIndex,
  isDefined,
  useMergedRef,
} from '@starleaguecompany/package-react-utils'
import { ArrowDown, Cross } from '@starleaguecompany/react-icons'

import { Z_INDEXES } from '../../../constants/zIndexes'

import { Portal } from '../../Portal'
import { Text } from '../../Typography'
import { Textarea } from '../../Textarea'
import { Menu } from '../../Menu'
import { Fade } from '../../Transition'

import { SelectOption } from '../../../types/Select.types'
import { AutocompleteProps, AutocompleteValue } from '../types/Autocomplete.types'
import styles from '../styles/Autocomplete.module.less'

export const defaultNotFoundText = 'К сожалению, по вашим параметрам ничего не найдено, попробуйте изменить их'
const MIN_ROWS = 1

/**
 * @description The Autocomplete component allow user to type and select from a list of options
 *
 * @component
 * @example
 * ```jsx
 * <Autocomplete placeholder="Услуги" defaultValue={value} options={options} />
 * ```
 */
const Autocomplete = React.forwardRef<HTMLTextAreaElement, AutocompleteProps>((props, ref) => {
  const {
    defaultValue,
    value,
    options,
    autoFocus,
    invalid,
    disabled,
    className,
    icon,
    readOnly,
    placement,
    fixedWidth,
    resizable,
    notFoundContent,
    onChange,
    onSearch,
    onFocus,
    onBlur,
    scrollIntoView,
    ...restProps
  } = props

  const cx = useStyles(styles)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const reference = React.useRef<Element | null>(null)
  const popper = React.useRef<HTMLElement | null>(null)
  const focusedItemRef = React.useRef<HTMLDivElement | null>(null)
  const [haveUserInput, setHaveUserInput] = useBoolean(false)
  const formControlContext = useFormControlContext()
  const [visible, setVisible] = useBoolean(false)
  const [fixWidth, setFixWidth] = useBoolean(fixedWidth)
  const [innerValue, setInnerValue] = useStateCallback<AutocompleteValue>(isDefined(value) ? value : defaultValue)
  const [inputValue, setInputValue] = React.useState<string | undefined>('')
  const [innerOptions, setInnerOptions] = React.useState<SelectOption[]>(options || [])
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const { referenceRef, popperRef, getReferenceProps, getPopperProps } = usePositioner({
    placement: placement ? placement : 'bottom-start',
    matchWidth: fixWidth,
    offset: [0, 8],
  })

  const classNames = cx(className, 'container')

  const optionsMap = React.useMemo<Record<SelectOption['value'], SelectOption>>(() => {
    if (!options) {
      return {}
    }

    return options.reduce<Record<SelectOption['value'], SelectOption>>((acc, o) => {
      acc[o.value] = o

      return acc
    }, {})
  }, [options])

  const activeOptions = React.useMemo<SelectOption[]>(() => {
    if (!innerOptions) {
      return []
    }

    return innerOptions.filter(option => !option.disabled)
  }, [innerOptions])

  const getCurrentIndex = (value: any) => {
    if (!Array.isArray(options) || !value) return -1

    return activeOptions.findIndex(option => option.value === value)
  }

  const getOptionByValue = React.useCallback(
    (value: string) => {
      return optionsMap[value] || {}
    },
    [optionsMap]
  )

  const displayValue = React.useMemo(() => {
    if (visible) {
      return inputValue
    }

    const { label } = getOptionByValue(innerValue as string)

    return label
  }, [visible, inputValue, innerValue, optionsMap])

  const isActive = React.useCallback(
    (val: string | number) => {
      if (innerValue === undefined) {
        return false
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
  }, [focusedIndex])

  const setValue = (value: string | number | undefined): void => {
    setInnerValue(value, val => {
      let option
      if (val !== undefined) {
        option = getOptionByValue(val as string)
      }

      setInputValue(option ? option.label : (val as string))
      safeInvoke(onChange, val as AutocompleteValue)
    })
  }

  const blurInput = React.useCallback(
    (event: any) => {
      setVisible.off()
      inputRef.current?.blur()
      setHaveUserInput.off()
      safeInvoke(onBlur, event)
    },
    [onBlur]
  )

  const handleSelect = (value: string | number) => (event: React.MouseEvent) => {
    setValue(value)
    blurInput(event)
  }

  const handleChangeInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value

    setFocusedIndex(getCurrentIndex(innerValue))
    setInputValue(value)
    setVisible.on()

    if (onSearch === undefined) {
      setInnerOptions(
        options.filter(o => {
          return o.label.toLowerCase().startsWith(value.toLowerCase())
        })
      )
    }

    setHaveUserInput.on()
    safeInvoke(onSearch, value)
  }

  const handleMouseMove = () => {
    setFocusedIndex(getCurrentIndex(innerValue))
  }

  const menu = React.useMemo(() => {
    if (!haveUserInput && !innerOptions.length) return null
    if (!fixedWidth) setFixWidth.off()

    if (!innerOptions || innerOptions.length === 0) {
      setFixWidth.on()

      return (
        <Menu>
          {notFoundContent ? (
            notFoundContent
          ) : (
            <Menu.Item disabled>
              <Text className="h-text-center h-color-D60">{defaultNotFoundText}</Text>
            </Menu.Item>
          )}
        </Menu>
      )
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
  }, [innerOptions, innerValue, focusedIndex, visible])

  const handleFocusInput = React.useCallback(
    (event: React.MouseEvent<HTMLTextAreaElement> & React.FocusEvent<HTMLTextAreaElement>) => {
      if (!readOnly && !visible) {
        setVisible.on()
        safeInvoke(onFocus, event)
      }
    },
    [readOnly, visible]
  )

  const handleBlurInput = React.useCallback(
    (event: Event) => {
      setInnerValue(innerValue => {
        const { label } = getOptionByValue(innerValue as string)

        setInputValue(label)

        return innerValue
      })

      setInnerOptions(options)
      blurInput(event)
    },
    [getOptionByValue, onBlur]
  )

  const handleClickClear = React.useCallback(() => {
    setFocusedIndex(-1)
    setValue(undefined)
    setInnerOptions(options)
  }, [options])

  const handleArrowClick = (event: React.MouseEvent) => {
    if (visible) {
      event.stopPropagation()
      blurInput(event)
      setInnerOptions(options)
      setInputValue(undefined)
    }
  }

  const iconElement = React.useMemo(() => {
    if (visible && innerValue !== undefined) {
      return <Cross className={cx('icon')} onClick={handleClickClear} />
    }

    if (icon || icon === null) {
      return icon
    }

    return (
      <ArrowDown
        className={cx('icon', {
          [`isArrowTurned`]: visible,
        })}
        onClick={handleArrowClick}
      />
    )
  }, [visible, innerValue, icon])

  const classNamesTextarea = cx('textarea', {
    'with-icon': iconElement && !resizable,
  })

  useKeyPress(
    {
      enabled: visible,
      keyMap: {
        ArrowDown: event => {
          event.preventDefault()
          const nextIndex = getNextIndex(focusedIndex, activeOptions.length)
          setFocusedIndex(nextIndex)
        },
        ArrowUp: event => {
          event.preventDefault()
          const prevIndex = getPrevIndex(focusedIndex, activeOptions.length)
          setFocusedIndex(prevIndex)
        },
        Enter: event => {
          event.preventDefault()
          const value = getFocusedValue()

          if (value !== undefined && value !== null) {
            setValue(value)
            blurInput(event)
          }
        },
        Escape: event => {
          event.preventDefault()
          setInnerOptions(options)
          blurInput(event)
        },
        Tab: event => {
          setInnerOptions(options)
          blurInput(event)
        },
      },
    },
    [focusedIndex, activeOptions]
  )

  React.useEffect(() => {
    if (defaultValue || value) {
      const { label } = getOptionByValue((defaultValue as string) || (value as string))

      setInputValue(label)
    }

    if (value !== undefined) {
      setInnerValue(value)
    }
  }, [value])

  React.useEffect(() => {
    setInnerOptions(options || [])
  }, [options])

  React.useEffect(() => {
    visible && setFocusedIndex(getCurrentIndex(innerValue))
  }, [visible])

  React.useEffect(() => {
    autoFocus && inputRef.current && inputRef.current.focus()
  }, [autoFocus, inputRef])

  React.useEffect(() => {
    scrollIntoView &&
      focusedItemRef.current &&
      focusedItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [focusedIndex, visible, scrollIntoView])

  React.useEffect(() => {
    // @ts-ignore
    let timer = null
    const listener = (event: Event) => {
      if (!visible) {
        return
      }

      // @ts-ignore
      if (reference.current && reference.current.contains(event.target)) {
        return
      }

      // @ts-ignore
      if (containerRef.current && containerRef.current.contains(event.target)) {
        return
      }

      // @ts-ignore
      if (popper.current && popper.current.contains(event.target)) {
        timer = setTimeout(() => {
          handleBlurInput(event)
        }, 200)
        return
      }

      handleBlurInput(event)
    }

    document.addEventListener('mousedown', listener)
    // document.addEventListener('touchstart', listener)

    return () => {
      // @ts-ignore
      timer && clearTimeout(timer)
      document.removeEventListener('mousedown', listener)
      // document.removeEventListener('touchstart', listener)
    }
  }, [reference, popper, visible, handleBlurInput])

  const view = React.useMemo(() => {
    return (
      <Portal>
        {menu ? (
          <Fade
            ref={popperRef}
            className={cx('menu')}
            visible={visible}
            unmountOnExit
            {...getPopperProps({ style: { zIndex: Z_INDEXES.TOOLTIP } }, popper)}
          >
            {menu}
          </Fade>
        ) : null}
      </Portal>
    )
  }, [visible, menu])

  return (
    <div ref={containerRef} data-qa="Autocomplete" className={classNames}>
      <div ref={referenceRef} {...getReferenceProps({}, reference)}>
        <Textarea
          {...restProps}
          ref={useMergedRef(ref, inputRef)}
          className={classNamesTextarea}
          readOnly={readOnly}
          invalid={formControlContext.invalid || invalid}
          disabled={formControlContext.disabled || disabled}
          value={displayValue}
          icon={iconElement}
          resizable={resizable}
          rows={MIN_ROWS}
          wrap={resizable ? 'soft' : 'off'}
          onClick={handleFocusInput}
          onFocus={handleFocusInput}
          onChange={handleChangeInput}
        />
      </div>
      {view}
    </div>
  )
})

Autocomplete.defaultProps = {
  fixedWidth: false,
  placement: 'bottom-start',
  scrollIntoView: true,
  resizable: false,
}

export default Autocomplete
