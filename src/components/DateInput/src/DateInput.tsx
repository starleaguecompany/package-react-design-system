import * as React from 'react';
import {
  useStyles,
  useBoolean,
  usePositioner,
  useFormControlContext,
  safeInvoke,
} from '@starleaguecompany/package-react-utils';

import { Z_INDEXES } from '../../../constants/zIndexes';

import { Portal } from '../../Portal';
import { TextInput } from '../../TextInput';
import { Fade } from '../../Transition';
import { Calendar } from '../../Calendar';

import { DateRange } from '../../../types/Date.types';
import { getDateFormatted } from '../../Calendar/utils/date';

import { DateInputProps } from '../types/DateInput.types';
import styles from '../styles/DateInput.module.less';

/**
 * @description To select or input a date
 *
 * @component
 * @example
 * ```jsx
 * <DateInput />
 * ```
 */
const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
  const {
    defaultValue,
    value,
    mode,
    defaultDate,
    maxDate,
    minDate,
    disabledIntervals,
    rangeLimit,
    dateFormat,
    invalid,
    disabled,
    readOnly,
    placement,
    className,
    onChange,
    onFocus,
    ...restProps
  } = props;

  const reference = React.useRef<Element | null>(null);
  const popper = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useBoolean(false);
  const { referenceRef, popperRef, getReferenceProps, getPopperProps } = usePositioner({
    placement,
    offset: [0, 8],
  });
  const getValue = React.useCallback(() => {
    if (mode === 'range') {
      // @ts-ignore
      if ((value && value.from) || (defaultValue && defaultValue.from)) {
        return value || defaultValue;
      }
    }

    if (value || defaultValue) {
      return { from: value || defaultValue, to: value || defaultValue };
    }

    return { from: undefined, to: undefined };
  }, [value]);

  // @ts-ignore
  const [innerValue, setInnerValue] = React.useState<DateRange>(getValue());
  const cx = useStyles(styles);
  const formControlContext = useFormControlContext();
  const classNames = cx(className, 'container');
  const isRange = mode === 'range';
  const displayValue = React.useMemo<string | undefined>(() => {
    if (innerValue === undefined || innerValue === null) {
      return undefined;
    }

    const { from, to } = innerValue as DateRange;

    const dateFormats = Array.isArray(dateFormat) ? dateFormat : [dateFormat, dateFormat];

    if (isRange) {
      if (from && to) {
        return `${getDateFormatted(from, dateFormats[0])} — ${getDateFormatted(to, dateFormats[1])}`;
      }

      if (from) {
        return getDateFormatted(from);
      }

      return undefined;
    }

    return from && getDateFormatted(from, dateFormats[0]);
  }, [innerValue, dateFormat]);

  const handleChangeSelected = React.useCallback(
    (range: DateRange) => {
      setInnerValue(range);
      safeInvoke(onChange, range);
      setVisible.off();
    },
    [innerValue, onChange]
  );

  const handleFocusInput = (event: React.FocusEvent<HTMLInputElement>) => {
    !readOnly && setVisible.on();
    safeInvoke(onFocus, event);
  };

  const calendar = React.useMemo(
    () => (
      <Calendar
        mode={mode}
        maxDate={maxDate}
        minDate={minDate}
        rangeLimit={rangeLimit}
        disabledIntervals={disabledIntervals}
        selection={innerValue}
        defaultDate={defaultDate}
        onChange={handleChangeSelected}
      />
    ),
    [defaultDate, mode, minDate, maxDate, rangeLimit, disabledIntervals, innerValue, handleChangeSelected]
  );

  const view = React.useMemo(() => {
    return (
      <Portal>
        <Fade visible={visible} unmountOnExit>
          <div
            ref={popperRef}
            className={cx('calendarWrapper')}
            {...getPopperProps({ style: { zIndex: Z_INDEXES.DROPDOWN } }, popper)}
          >
            {calendar}
          </div>
        </Fade>
      </Portal>
    );
  }, [visible, calendar]);

  React.useEffect(() => {
    // @ts-ignore
    setInnerValue(getValue());
  }, [value]);

  React.useEffect(() => {
    const listener = (event: Event) => {
      // @ts-ignore
      if (reference.current && reference.current.contains(event.target)) {
        return;
      }

      // @ts-ignore
      if (popper.current && popper.current.contains(event.target)) {
        return;
      }

      setVisible.off();
    };

    document.addEventListener('mousedown', listener);
    // document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener);
      // document.removeEventListener('touchstart', listener)
    };
  }, [reference, popper]);

  return (
    <div data-qa="DateInput" className={classNames}>
      <div ref={referenceRef} {...getReferenceProps({}, reference)}>
        <TextInput
          {...restProps}
          ref={ref}
          value={displayValue}
          invalid={formControlContext.invalid || invalid}
          disabled={formControlContext.disabled || disabled}
          readOnly={true}
          onFocus={handleFocusInput}
        />
      </div>
      {view}
    </div>
  );
});

DateInput.defaultProps = {
  mode: 'single',
  placement: 'auto-start',
};

export default DateInput;
