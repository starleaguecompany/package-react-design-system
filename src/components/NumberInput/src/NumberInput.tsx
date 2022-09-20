import * as React from 'react';
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format';
import {
  useStyles,
  useFormControlContext,
  safeInvoke,
  isNumber,
  isUndefined,
  error,
} from '@starleaguecompany/package-react-utils';

import { TextInput } from '../../TextInput';

import { NumberInputProps } from '../types/NumberInput.types';
import styles from '../styles/NumberInput.module.less';

const rangedValue = (value: number, max: number | undefined, min: number | undefined): number => {
  let resultRangedValue;
  if (max === undefined && min === undefined) {
    resultRangedValue = Number(value);
  }
  if (max === undefined && min !== undefined) {
    resultRangedValue = Math.max(value, min);
  }
  if (max !== undefined && min === undefined) {
    resultRangedValue = Math.min(value, max);
  }
  if (max !== undefined && min !== undefined) {
    resultRangedValue = Math.min(max, Math.max(value, min));
  }

  return resultRangedValue as number;
};

const roundToNearestStep = (value: number, step: number) => {
  if (step < 1) {
    const decimalPart = value - Math.floor(value);
    const integerStep = 1 / step;
    const roundedDecimalPart = Math.round(decimalPart * integerStep) / integerStep;

    return Math.floor(value) + roundedDecimalPart;
  } else {
    return Math.round(value / step) * step;
  }
};

/**
 * @description Enter a number within certain range with the mouse or keyboard
 *
 * @component
 * @example
 * ```jsx
 * <NumberInput
 *    label="Название поля"
 *    min={30000}
 *    max={1000000}
 *    postfix="₽/мес"
 *    thousandSeparator=" "
 *    decimalScale={2}
 *  />
 * ```
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const {
    value,
    min,
    max,
    step,
    decimalScale,
    fixedDecimalScale,
    decimalSeparator,
    thousandSeparator,
    invalid,
    disabled,
    onChange,
    onBlur,
    onKeyPress,
    format,
    defaultValue,
    className,
    ...restProps
  } = props;

  const formControlContext = useFormControlContext();

  const cx = useStyles(styles);
  const classNames = cx(className, 'container');
  const condition = decimalSeparator === thousandSeparator;

  // Ensure the decimalSeparator is not equal the thousandSeparator
  if (condition) {
    error({
      condition,
      message: 'Ensure the decimalSeparator is not equal the thousandSeparator',
    })();
  }

  const empty = '';
  const prepareValue = (value: number | undefined | typeof empty): number | undefined => {
    if (value === undefined || value === empty) {
      return undefined;
    }

    return step ? roundToNearestStep(rangedValue(value, max, min), step) : rangedValue(value, max, min);
  };

  const [innerValue, setInnerValue] = React.useState<number | undefined | typeof empty>();
  const isFirstRender = React.useRef(true);

  const handleValueChange = (values: NumberFormatValues, sourceInfo: SourceInfo) => {
    if (!sourceInfo.event || values.floatValue === innerValue) {
      return;
    }

    setInnerValue(values.floatValue);
    safeInvoke(onChange, values.floatValue);
  };

  const setPreparedValue = () => {
    setInnerValue(value => {
      const preparedValue = prepareValue(value);

      if (value !== preparedValue && value !== empty) {
        safeInvoke(onChange, preparedValue);
      }

      return preparedValue;
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setPreparedValue();
    safeInvoke(onBlur, event);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPreparedValue();
    }
    safeInvoke(onKeyPress, event);
  };

  React.useEffect(() => {
    if (!isFirstRender.current) {
      isNumber(value) && setInnerValue(value);

      if (isUndefined(value) || value === '') {
        setInnerValue('');
      }
    } else {
      setInnerValue(prepareValue(value || defaultValue));
      isFirstRender.current = false;
    }
  }, [value]);

  return (
    <div data-qa="NumberInput" className={classNames}>
      <NumberFormat
        {...restProps}
        getInputRef={ref}
        value={innerValue}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        format={format}
        allowNegative={false}
        allowedDecimalSeparators={[',', '.']}
        inputMode="decimal"
        invalid={formControlContext.invalid || invalid}
        disabled={formControlContext.disabled || disabled}
        onValueChange={handleValueChange}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        customInput={TextInput}
      />
    </div>
  );
});

NumberInput.defaultProps = {
  decimalSeparator: ',',
  fixedDecimalScale: true,
};

export default NumberInput;
