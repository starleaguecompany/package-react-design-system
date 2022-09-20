import * as React from 'react';
import {
  useStyles,
  useBoolean,
  useMergedRef,
  useFormControlContext,
  safeInvoke,
  isUndefined,
} from '@starleaguecompany/package-react-utils';

import { Icon } from '../../Icon';
import { Spinner } from '../../Spinner';

import { TextInputProps } from '../types/TextInput.types';
import styles from '../styles/TextInput.module.less';

export function fixControlledValue<T>(value: T): T | '' {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}

/**
 * @description The Text Input component allows user to type in text
 *
 * @component
 * @example
 * ```jsx
 * <TextInput name="field" value="value" />
 * ```
 */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    autoFocus,
    defaultValue,
    value,
    label,
    placeholder,
    postfix,
    icon,
    disabled,
    invalid,
    readOnly,
    loading,
    positionInGroup,
    directionGroup,
    onFocus,
    onBlur,
    onChange,
    className,
    type,
    ...restProps
  } = props;

  const cx = useStyles(styles);
  const formControlContext = useFormControlContext();
  const inputRef = React.useRef<HTMLInputElement>();
  const [focused, setFocused] = useBoolean(autoFocus || false);
  const [filled, setFilled] = useBoolean(value !== undefined && value !== '');

  const isActive = focused && !readOnly;
  const isDisabled = formControlContext.disabled || disabled;
  const isInvalid = formControlContext.invalid || invalid;
  const hasIcon = icon || loading;

  const classNames = cx(className, 'container', {
    focused,
    active: isActive,
    disabled: isDisabled,
    invalid: isInvalid,
    'with-icon': hasIcon,
    [`group-${directionGroup}`]: directionGroup,
    [`group-${positionInGroup}`]: positionInGroup,
  });

  const classNamesLabel = cx('placeholder', {
    active: isActive,
    filled: filled,
    disabled: isDisabled,
    invalid: isInvalid,
    'with-icon': hasIcon,
  });

  const classNamesInput = cx('input', {
    active: isActive,
    filled: filled,
    disabled: isDisabled,
    invalid: isInvalid,
  });

  const classNamesInputSegment = cx('inputSegment', {
    centered: isUndefined(label) && (filled || focused),
  });

  const iconElement = React.useMemo(() => {
    if (loading) {
      return <Spinner className={cx('icon')} />;
    }

    if (icon) {
      return <Icon className={cx('icon')} icon={icon} />;
    }

    return null;
  }, [icon, loading]);

  const postfixElement = React.useMemo(() => {
    if (postfix && filled) {
      return <div className={cx('inputPostfix')}>&nbsp;{postfix}</div>;
    }

    return null;
  }, [postfix, filled]);

  const labelElement = React.useMemo(() => {
    if (label) {
      return <label className={classNamesLabel}>{label}</label>;
    }

    return null;
  }, [label, filled, focused]);

  const placeholderElement = React.useMemo(() => {
    if (label || filled || focused) {
      return null;
    }

    if (placeholder) {
      return <label className={classNamesLabel}>{placeholder}</label>;
    }

    return null;
  }, [label, placeholder, filled, focused, isDisabled]);

  const handleClick = React.useCallback(
    (_event: React.MouseEvent<HTMLDivElement>) => {
      inputRef.current?.focus();
      setFocused.on();
    },
    [inputRef]
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused.on();
      safeInvoke(onFocus, event);
    },
    [onFocus]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused.off();
      safeInvoke(onBlur, event);
    },
    [onBlur]
  );

  const handleChange = React.useCallback(
    event => {
      safeInvoke(onChange, event);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (value !== undefined && value !== '') {
      setFilled.on();
    } else {
      setFilled.off();
    }
  }, [value]);

  return (
    <div data-qa="TextInput" className={classNames} onClick={handleClick}>
      <div className={classNamesInputSegment}>
        <div className={cx('inputWrapper')}>
          <div className={cx('inputValue')}>{fixControlledValue(value)}</div>
          <input
            autoFocus={autoFocus}
            spellCheck="false"
            autoComplete="off"
            ref={useMergedRef(inputRef, ref)}
            type={type}
            value={fixControlledValue(value)}
            disabled={isDisabled}
            readOnly={readOnly}
            className={classNamesInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...restProps}
          />
          {postfixElement}
        </div>
      </div>
      {labelElement}
      {placeholderElement}
      {iconElement}
    </div>
  );
});

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
