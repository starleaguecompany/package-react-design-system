import formatDate from 'date-fns/format';
import { ru } from 'date-fns/locale';
import isValidDate from 'date-fns/isValid';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';

import { MONTHS } from '../../DateInput/constants';
import { DateFormat } from '../../DateInput/types/DateInput.types';

export const getISODate = (date: Date) => formatDate(date, 'yyyy-MM-dd');
export const getDateFormatted = (date: Date, dateFormat: DateFormat = 'dd.MM.yyyy', locale = ru) =>
  formatDate(date, dateFormat, { locale: locale });
export const getDayFormatted = (date: Date) => formatDate(date, 'd');
export const getMonthFormatted = (date: Date) => `${MONTHS[getMonth(date)]} ${getYear(date)}`;
export const isValid = function (date: Date) {
  try {
    return isValidDate(date);
  } catch (e) {
    return false;
  }
};
