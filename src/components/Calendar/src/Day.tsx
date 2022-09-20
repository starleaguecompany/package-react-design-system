import * as React from 'react';
import { useStyles, safeInvoke } from '@starleaguecompany/package-react-utils';

import { Space } from '../../Space';

import { getDayFormatted, getISODate } from '../utils/date';

import { DayProps } from '../types/Calendar.types';

const Day: React.FC<DayProps> = props => {
  const { date, weekend, active, disabled, highlighted, today, sameMonth, className, onChange, ...restProps } = props;
  const cx = useStyles({});

  const handleClick = React.useCallback(() => {
    if (disabled) {
      return;
    }

    safeInvoke(onChange, date);
  }, [date]);

  return (
    <Space
      align="center"
      justify="center"
      className={cx('rounded-full', {
        'text-white font-bold bg-red-500 rounded-100 hover:bg-red-500': active,
        'hover:bg-red-400 hover:font-bold hover:text-white': !disabled,
        'opacity-25': disabled,
      })}
      {...restProps}
      data-date={getISODate(date)}
      onClick={handleClick}
    >
      {!sameMonth ? ' ' : getDayFormatted(date)}
    </Space>
  );
};

export default Day;
