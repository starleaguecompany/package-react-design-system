import * as React from 'react';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import startOfDay from 'date-fns/startOfDay';
import eachDay from 'date-fns/eachDayOfInterval';
import isWithinInterval from 'date-fns/isWithinInterval';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isEqual from 'date-fns/isEqual';
import isWeekend from 'date-fns/isWeekend';
import isSunday from 'date-fns/isSunday';
import isMonday from 'date-fns/isMonday';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { addDays, isSameMonth, set } from 'date-fns';
import { useStyles, noop } from '@starleaguecompany/package-react-utils';

import { Space } from '../../Space';

import Day from './Day';

import { WeekProps } from '../types/Calendar.types';

const Week: React.FC<WeekProps> = props => {
  const {
    date,
    month,
    disabledIntervals,
    minDate,
    maxDate,
    mode,
    className,
    selectionStart,
    selectionEnd,
    highlightedStart,
    highlightedEnd,
    onChange,
    onMouseEnter,
    ...restProps
  } = props;
  const cx = useStyles({});

  const classNames = cx(className, 'week');
  const today = startOfDay(new Date());
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });

  const isBetween = (date: Date, min: Date, max: Date) => {
    return (
      date &&
      min &&
      max &&
      (isAfter(startOfDay(date), startOfDay(min)) || isEqual(startOfDay(date), startOfDay(min))) &&
      (isBefore(startOfDay(date), startOfDay(max)) || isEqual(startOfDay(date), startOfDay(max)))
    );
  };

  const isSelectableDate = (date: Date) => {
    if (isDisabledDate(date)) {
      return false;
    }

    if (minDate && maxDate) {
      return isWithinInterval(date, { start: minDate, end: maxDate });
    } else if (minDate && !maxDate) {
      return isAfter(date, minDate) || isEqual(date, minDate);
    } else if (maxDate && !minDate) {
      return isBefore(date, maxDate) || isEqual(date, maxDate);
    }

    return true;
  };

  const isDisabledDate = (date: Date) => {
    let dateDisabled;

    if (!disabledIntervals) return false;

    for (let i = 0; i < disabledIntervals.length; i++) {
      const { from, to } = disabledIntervals[i];

      dateDisabled = isWithinInterval(startOfDay(date), {
        start: startOfDay(from as Date),
        end: startOfDay(to as Date),
      });

      if (dateDisabled) {
        return dateDisabled;
      }
    }

    return false;
  };

  const isSelectedDate = (date: Date) => {
    if (!selectionStart) return false;

    if (mode === 'range') {
      if (selectionStart && selectionEnd) {
        return isWithinInterval(startOfDay(date), { start: startOfDay(selectionStart), end: startOfDay(selectionEnd) });
      }

      return false;
    }

    return isEqual(date, set(selectionStart, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }));
  };

  const isHighlightedDate = (date: Date) => {
    return (
      highlightedStart &&
      highlightedEnd &&
      (isAfter(startOfDay(date), startOfDay(highlightedStart)) ||
        isEqual(startOfDay(date), startOfDay(highlightedStart))) &&
      (isBefore(startOfDay(date), startOfDay(highlightedEnd)) || isEqual(startOfDay(date), startOfDay(highlightedEnd)))
    );
  };

  const renderDays = React.useMemo(() => {
    return eachDay({ start, end }).map(day => {
      const prevWeekDate = addDays(day, -7);
      const nextWeekDate = addDays(day, 7);
      const selectionPrevDaysCount =
        selectionStart && selectionEnd
          ? isBetween(prevWeekDate, selectionStart, selectionEnd) &&
            differenceInCalendarDays(selectionEnd, selectionStart)
          : 0;
      const selectionNextDaysCount =
        selectionStart && selectionEnd
          ? isBetween(nextWeekDate, selectionStart, selectionEnd) &&
            differenceInCalendarDays(selectionEnd, selectionStart)
          : 0;
      const highlightedPrevDaysCount =
        highlightedStart && highlightedEnd
          ? isBetween(prevWeekDate, highlightedStart, highlightedEnd) &&
            differenceInCalendarDays(highlightedEnd, highlightedStart)
          : 0;
      const highlightedNextDaysCount =
        highlightedStart && highlightedEnd
          ? isBetween(nextWeekDate, highlightedStart, highlightedEnd) &&
            differenceInCalendarDays(highlightedEnd, highlightedStart)
          : 0;
      const active = isSelectedDate(day);
      const selectable = isSelectableDate(day);
      const disabled = isDisabledDate(day) || !selectable;
      const isFirstDay =
        (selectionStart && isEqual(day, selectionStart)) || (highlightedStart && isEqual(day, highlightedStart));
      const isLastDay = highlightedEnd
        ? highlightedEnd && isEqual(day, highlightedEnd)
        : selectionEnd && isEqual(day, selectionEnd);
      const isBetweenDay =
        (selectionStart && selectionEnd && isBetween(day, selectionStart, selectionEnd)) ||
        (highlightedStart && highlightedEnd && isBetween(day, highlightedStart, highlightedEnd));
      const monday = isMonday(day);
      const sunday = isSunday(day);

      const dayClassNames = cx({
        'without-top-left-border-radius':
          isBetweenDay && ((!isFirstDay && !monday) || selectionPrevDaysCount >= 7 || highlightedPrevDaysCount >= 7),
        'without-bottom-left-border-radius':
          isBetweenDay && ((!isFirstDay && !monday) || selectionNextDaysCount >= 7 || highlightedNextDaysCount >= 7),
        'without-top-right-border-radius':
          isBetweenDay && ((!isLastDay && !sunday) || selectionPrevDaysCount >= 7 || highlightedPrevDaysCount >= 7),
        'without-bottom-right-border-radius':
          isBetweenDay && ((!isLastDay && !sunday) || selectionNextDaysCount >= 7 || highlightedNextDaysCount >= 7),
      });

      return (
        <Day
          className={dayClassNames}
          key={day.getTime()}
          date={day}
          weekend={isWeekend(day)}
          active={active}
          disabled={disabled}
          highlighted={isHighlightedDate(day)}
          today={isEqual(day, today)}
          sameMonth={isSameMonth(day, month)}
          onChange={onChange}
          onMouseEnter={!disabled ? onMouseEnter : noop}
        />
      );
    });
  }, [date, minDate, maxDate, selectionStart, highlightedStart]);

  return (
    <div>
      <Space size={0} align="center" justify="center" className={classNames} {...restProps}>
        {renderDays}
      </Space>
    </div>
  );
};

export default Week;
