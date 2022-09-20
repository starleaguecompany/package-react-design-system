import React, { useEffect } from 'react';
import { forwardRef, useCallback, useState } from 'react';
import startOfDay from 'date-fns/startOfDay';
import { useStyles, safeInvoke } from '@starleaguecompany/package-react-utils';

import Month from './Month';

import { DateRange } from '../../../types/Date.types';
import { CalendarProps } from '../types/Calendar.types';

/**
 * @description Calendar component.
 *
 * @component
 * @example
 * ```jsx
 * <Calendar />
 * ```
 */
const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    minDate,
    maxDate,
    rangeLimit,
    disabledIntervals,
    mode,
    selection,
    activeMonth,
    className,
    onChange,
    ...restProps
  } = props;
  const [selectionStart, setSelectionStart] = useState<Date | undefined>(selection?.from);
  const [selectionEnd, setSelectionEnd] = useState<Date | undefined>(selection?.to);
  const [selectionInProgress, setSelectionInProgress] = useState<boolean>(false);
  const cx = useStyles({});

  const normalizedMinDate = minDate ? startOfDay(minDate) : minDate;

  const handleChangeSelected = useCallback(
    (range: DateRange) => {
      setSelectionInProgress(false);
      setSelectionStart(range.from);
      setSelectionEnd(range.to);

      safeInvoke(onChange, range);
    },
    [selectionStart, selectionEnd, selectionInProgress]
  );

  useEffect(() => {
    setSelectionStart(selection?.from);
  }, [selection]);

  return (
    <div
      ref={ref}
      data-qa="Calendar"
      className={cx('flex flex-col bg-white rounded-lg p-2 shadow', className)}
      {...restProps}
    >
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
    </div>
  );
});

export default Calendar;
