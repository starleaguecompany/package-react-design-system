import * as React from 'react'
import addMonth from 'date-fns/addMonths'
import startOfDay from 'date-fns/startOfDay'
import { useStyles, safeInvoke } from '@starleaguecompany/package-react-utils'

import { Button } from '../../Button'
import { Space } from '../../Space'

import { isValid } from '../utils/date'

import Header from './Header'
import Month from './Month'

import { DateRange } from '../../../types/Date.types'
import { CalendarProps } from '../types/Calendar.types'
import styles from '../styles/Calendar.module.less'

/**
 * @description Calendar component.
 *
 * @component
 * @example
 * ```jsx
 * <Calendar />
 * ```
 */
const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    minDate,
    maxDate,
    rangeLimit,
    disabledIntervals,
    mode,
    selection,
    defaultDate = minDate !== undefined ? minDate : new Date(),
    className,
    onChange,
    ...restProps
  } = props

  const [activeMonth, setActiveMonth] = React.useState<Date>(() => {
    if (selection && selection.from && isValid(selection.from)) {
      return selection.from
    }

    return defaultDate
  })
  const [selectionStart, setSelectionStart] = React.useState<Date | undefined>(selection && selection.from)
  const [selectionEnd, setSelectionEnd] = React.useState<Date | undefined>(selection && selection.to)
  const [selectionInProgress, setSelectionInProgress] = React.useState<boolean>(false)
  const cx = useStyles(styles)

  const classNames = cx(className, 'container')
  const normalizedMinDate = minDate ? startOfDay(minDate) : minDate

  const handleChangeMonth = React.useCallback(
    direction => {
      switch (direction) {
        case 'prev':
          return setActiveMonth(addMonth(activeMonth, -1))
        case 'next':
          return setActiveMonth(addMonth(activeMonth, 1))
      }
    },
    [activeMonth]
  )

  const handleChangeSelected = React.useCallback(
    (range: DateRange) => {
      if (mode === 'range') {
        if (selectionInProgress) {
          setSelectionEnd(range.to)
          setSelectionInProgress(false)

          // safeInvoke(onChange, range)
        } else {
          setSelectionInProgress(true)
          setSelectionStart(range.from)
          setSelectionEnd(range.to)
        }
      } else {
        setSelectionInProgress(false)
        setSelectionStart(range.from)
        setSelectionEnd(range.to)

        safeInvoke(onChange, range)
      }
    },
    [selectionStart, selectionEnd, selectionInProgress]
  )

  const handleClickReset = React.useCallback(() => {
    const range = { from: undefined, to: undefined }

    setSelectionInProgress(false)
    setSelectionStart(range.from)
    setSelectionEnd(range.to)

    safeInvoke(onChange, range)
  }, [])

  const handleClickSelect = React.useCallback(() => {
    const range = { from: selectionStart, to: selectionEnd }

    safeInvoke(onChange, range)
  }, [selectionStart, selectionEnd, selectionInProgress])

  const footer = React.useMemo(() => {
    if (mode === 'range') {
      return (
        <Space size={0} justify="end" className={cx('footer')}>
          <Button
            className={cx('footerButton')}
            variant="text"
            disabled={!selectionStart || !selectionEnd}
            onClick={handleClickReset}
          >
            Отмена
          </Button>
          <Button
            className={cx('footerButton')}
            variant="primary"
            color="gray"
            disabled={!selectionStart || !selectionEnd}
            onClick={handleClickSelect}
          >
            Выбрать
          </Button>
        </Space>
      )
    }

    return null
  }, [mode, selectionStart, selectionEnd, handleClickSelect])

  return (
    <div ref={ref} data-qa="Calendar" className={classNames} {...restProps}>
      <Header month={activeMonth} onChange={handleChangeMonth} />
      <Month
        month={activeMonth}
        minDate={normalizedMinDate}
        maxDate={maxDate}
        rangeLimit={rangeLimit}
        disabledIntervals={disabledIntervals}
        mode={mode}
        selectionStart={selectionStart}
        selectionEnd={selectionEnd}
        selectionInProgress={selectionInProgress}
        onChange={handleChangeSelected}
      />
      {footer}
    </div>
  )
})

Calendar.defaultProps = {}

export default Calendar
