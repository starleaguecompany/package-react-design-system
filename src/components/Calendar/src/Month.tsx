import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import addDays from 'date-fns/addDays';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import parse from 'date-fns/parse';
import { safeInvoke } from '@starleaguecompany/package-react-utils';

import Week from './Week';

import { MonthProps } from '../types/Calendar.types';
import { DateRange } from '../../../types/Date.types';

const DAYS_OF_WEEK = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'];

const Month: React.FC<MonthProps> = props => {
  const {
    month,
    minDate,
    maxDate,
    rangeLimit,
    disabledIntervals,
    selectionStart,
    selectionEnd,
    selectionInProgress,
    mode,
    className,
    onChange,
    ...restProps
  } = props;
  const [highlightedEnd, setHighlightedEnd] = useState<Date | undefined>(undefined);

  const getDisabledRange = (interval: DateRange) => {
    const { from, to } = interval;

    if (!disabledIntervals) return true;

    for (let i = 0; i < disabledIntervals.length; i++) {
      const { from: intervalStart, to: intervalEnd } = disabledIntervals[i];

      if (
        areIntervalsOverlapping(
          {
            start: from as Date,
            end: to as Date,
          },
          {
            start: intervalStart as Date,
            end: intervalEnd as Date,
          }
        )
      ) {
        return;
      }
    }

    return true;
  };

  const pushUpdate = (selectionStart: Date | undefined, selectionEnd: Date | undefined) => {
    let from, to;

    if (selectionStart && selectionEnd) {
      if (isBefore(selectionStart, selectionEnd)) {
        from = selectionStart;
        to = selectionEnd;
      } else {
        from = selectionEnd;
        to = selectionStart;
      }

      if (rangeLimit && rangeLimit < differenceInCalendarDays(from, to)) {
        to = addDays(from, rangeLimit);
      }
    }

    safeInvoke(onChange, { from, to });
  };

  const handleChangeSelected = (date: Date) => {
    let from = selectionStart;
    let to = selectionEnd;

    if (mode === 'range') {
      if (selectionInProgress) {
        const isDisabledWithin = getDisabledRange({
          from: !isBefore(selectionStart as Date, date) ? (selectionStart as Date) : date,
          to: isBefore(selectionStart as Date, date) ? (selectionStart as Date) : date,
        });

        if (!isDisabledWithin) {
          from = undefined;
          to = undefined;

          pushUpdate(from, to);

          return;
        }

        to = date;
      } else {
        from = date;
        to = date;
      }

      pushUpdate(from, to);
    } else {
      from = date;
      to = date;

      pushUpdate(from, to);
    }
  };

  const handleOnDayMouseEnter = (event: React.SyntheticEvent<HTMLSpanElement>) => {
    if (!selectionInProgress) return;

    const {
      currentTarget: {
        dataset: { date: day },
      },
    } = event;

    const date = parse(day as string, 'yyyy-MM-dd', new Date());
    // const dateLimit = subDays(selectionStart, rangeLimit as number)
    const isDisabledWithin = getDisabledRange({
      from: !isBefore(selectionStart as Date, date) ? (selectionStart as Date) : date,
      to: isBefore(selectionStart as Date, date) ? (selectionStart as Date) : date,
    });

    if (!isDisabledWithin) return;

    // if (!isEqual(date, selectionEnd)) {
    //   // if (!rangeLimit || (rangeLimit && !isBefore(date, dateLimit))) {
    //   if (!isBefore(date, dateLimit)) {
    //     pushUpdate(date, selectionStart)
    //   }
    // }

    setHighlightedEnd(date);
  };

  const getMinDate = useCallback(() => {
    return selectionStart || minDate;
  }, [minDate, selectionStart]);

  const getMaxDate = useCallback(() => {
    return selectionStart && rangeLimit ? addDays(selectionStart, rangeLimit) : maxDate;
  }, [maxDate, selectionStart, rangeLimit]);

  const renderHeader = useMemo(() => {
    return (
      <div className="flex justify-space-between md:justify-center gap-1">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="flex items-center justify-center relative w-5 h-5">
            {day}
          </div>
        ))}
      </div>
    );
  }, []);

  const renderWeeks = useMemo(() => {
    let innerMinDate = minDate;
    let innerMaxDate = maxDate;
    let start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    const weeks = [];

    if (selectionInProgress && rangeLimit) {
      innerMinDate = getMinDate();
      innerMaxDate = getMaxDate();
    }

    while (isBefore(start, end) || isSameDay(start, end)) {
      weeks.push(start);
      start = addDays(start, 7);
    }

    return weeks.map(week => (
      <Week
        key={week.getTime()}
        date={week}
        month={month}
        minDate={innerMinDate}
        maxDate={innerMaxDate}
        disabledIntervals={disabledIntervals}
        mode={mode}
        selectionStart={selectionStart}
        selectionEnd={selectionEnd}
        highlightedStart={selectionInProgress ? selectionEnd : undefined}
        highlightedEnd={selectionInProgress ? highlightedEnd : undefined}
        onChange={handleChangeSelected}
        onMouseEnter={handleOnDayMouseEnter}
      />
    ));
  }, [month, selectionStart, selectionEnd, selectionInProgress, highlightedEnd, rangeLimit, minDate, maxDate]);

  useEffect(() => {
    setHighlightedEnd(selectionEnd);
  }, [selectionEnd]);

  return (
    <div className={className} {...restProps}>
      {renderHeader}
      {renderWeeks}
    </div>
  );
};

export default Month;
