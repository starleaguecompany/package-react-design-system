import formatDate from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { add, isValid, sub } from 'date-fns';

import { DateRange } from '../../../types/Date.types';

export const getDateFormatted = (date: Date) => {
  const currentDate = isValid(date) ? date : new Date();

  return formatDate(currentDate, 'dd/MM eeeeee', { locale: ruLocale });
};

export const getMonthName = (date: Date) => {
  const currentDate = isValid(date) ? date : new Date();

  return formatDate(currentDate, 'MMMM', { locale: ruLocale });
};

export const getDatesList = (currentDate: Date, maxDateDiff = 7) => {
  const datesList: DateRange[] = [{ from: currentDate }];

  for (let i = 1; i <= maxDateDiff; i++) {
    const prevDate = sub(new Date(currentDate), {
      days: i,
    });

    const nextDate = add(new Date(currentDate), {
      days: i,
    });

    datesList.unshift({
      from: prevDate,
    });

    datesList.push({
      from: nextDate,
    });
  }

  return datesList;
};
