import * as React from 'react';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon } from '@starleaguecompany/react-icons';
import addMonth from 'date-fns/addMonths';

import { useBoolean, useStyles } from '@starleaguecompany/package-react-utils';

import type { DatePickerProps } from '../types/DatePicker.types';
import { Icon } from '../../Icon';
import { Text } from '../../Typography';
import { Calendar } from '../../Calendar';
import { getDateFormatted, getDatesList, getMonthName } from '../utils';
import isSameDay from 'date-fns/isSameDay';

/**
 * @description DatePicker component.
 *
 * @component
 * @example
 * ```jsx
 * <DatePicker />
 * ```
 */

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const { ...restProps } = props;
  const difFromNow = 7;
  const cx = useStyles({});
  const [datesList] = useState(getDatesList(new Date(), difFromNow));
  const [activeDateIndex, setActiveDateIndex] = useState(difFromNow);
  const [isCalendarOpen, setCalendarOpen] = useBoolean(false);
  const [activeMonth, setActiveMonth] = useState<Date>(datesList[activeDateIndex].from || new Date());

  const handlePrevDate = () => {
    if (isCalendarOpen) {
      setActiveMonth(addMonth(activeMonth, -1));
    } else {
      if (datesList[activeDateIndex - 1]) {
        setActiveDateIndex(value => value - 1);
      }
    }
  };

  const handleNextDate = () => {
    if (isCalendarOpen) {
      setActiveMonth(addMonth(activeMonth, 1));
    } else {
      if (datesList[activeDateIndex + 1]) {
        setActiveDateIndex(value => value + 1);
      }
    }
  };

  const handleChangeActiveDay = (data: { from?: Date; to?: Date }) => {
    const index = datesList
      .map(({ from }) => from)
      .findIndex(from => (from && data.from ? isSameDay(from, data.from) : false));

    if (index !== -1) {
      setActiveDateIndex(index);
    }
  };

  useEffect(() => {
    if (!isCalendarOpen) {
      setActiveMonth(datesList[activeDateIndex].from || new Date());
    }
  }, [isCalendarOpen]);

  useEffect(() => {
    const listener = (e: any) => {
      if (!e?.target?.closest('div[data-qa=DatePicker]')) {
        setCalendarOpen.off();
      }
    };

    window.addEventListener('click', listener);

    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <div className="inline-flex relative h-7 cursor-pointer select-none" ref={ref} data-qa="DatePicker" {...restProps}>
      <button
        className="flex justify-center items-center px-2 bg-white border-l border-y border-slate-100 rounded-l-lg hover:bg-slate-100"
        onClick={handlePrevDate}
      >
        <Icon size={12} icon={<ArrowLeft />} />
      </button>

      <div
        className={cx(
          'flex relative gap-2 shrink-0 items-center justify-center w-28 px-3 bg-white border-y border-slate-100 hover:bg-slate-100',
          {
            'bg-slate-100': isCalendarOpen,
          }
        )}
        onClick={setCalendarOpen.toggle}
      >
        <Icon size={16} icon={<CalendarIcon />} />

        <Text size={12} className="tracking-wide" uppercase strong>
          {isCalendarOpen
            ? getMonthName(activeMonth || new Date())
            : getDateFormatted(datesList[activeDateIndex].from || new Date())}
        </Text>
      </div>

      <button
        className="flex justify-center items-center px-2 bg-white border-r border-y border-slate-100 rounded-r-lg hover:bg-slate-100"
        onClick={handleNextDate}
      >
        <Icon size={12} icon={<ArrowRight />} />
      </button>

      {isCalendarOpen && (
        <Calendar
          className="absolute top-full left-0"
          selection={datesList[activeDateIndex]}
          minDate={datesList[0].from}
          maxDate={datesList[datesList.length - 1].from}
          activeMonth={activeMonth}
          onChange={handleChangeActiveDay}
        />
      )}
    </div>
  );
});

export default DatePicker;
