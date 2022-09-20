import * as React from 'react';
import {
  useStyles,
  useBoolean,
  useMergedRef,
  useFormControlContext,
  safeInvoke,
  isDefined,
} from '@starleaguecompany/package-react-utils';

import { fixControlledValue } from '../../TextInput/src/TextInput';
import { Spinner } from '../../Spinner';
import { Icon } from '../../Icon';

import { TextareaProps } from '../types/Textarea.types';
import styles from '../styles/Textarea.module.less';

const MIN_ROWS = 1;
const MAX_ROWS = 10;

/**
 * @description The Text Area component allow user to type in longer content
 *
 * @component
 * @example
 * ```jsx
 * <Textarea value="content" />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    value,
    label,
    placeholder,
    resizable,
    icon,
    disabled,
    invalid,
    readOnly,
    loading,
    rows,
    onFocus,
    onBlur,
    onChange,
    className,
    ...restProps
  } = props;

  const cx = useStyles(styles);
  const formControlContext = useFormControlContext();
  const inputRef = React.useRef<HTMLTextAreaElement>();
  const [focused, setFocused] = useBoolean(false);
  const [filled, setFilled] = useBoolean(value !== undefined && value !== '');
  const [innerRows, setInnerRows] = React.useState<number>(rows || 1);
  const hasIcon = icon || loading;

  const classNames = cx(className, 'container', {
    focused: focused && !readOnly,
    disabled: formControlContext.disabled || disabled,
    invalid: formControlContext.invalid || invalid,
    'with-label': isDefined(label),
  });

  const classNamesLabel = cx('placeholder', {
    focused: focused && !readOnly,
    filled: filled,
    disabled: formControlContext.disabled || disabled,
    invalid: formControlContext.invalid || invalid,
    'with-icon': hasIcon,
  });

  const classNamesTextarea = cx('textarea', {
    focused: focused && !readOnly,
    filled: filled,
    disabled: formControlContext.disabled || disabled,
    invalid: formControlContext.invalid || invalid,
    'with-icon': hasIcon,
    resize: resizable,
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
  }, [label, placeholder, filled, focused]);

  const setRows = React.useCallback(() => {
    if (!inputRef.current) {
      return;
    }

    const textareaLineHeight = 20;

    const previousRows = inputRef.current.rows;
    inputRef.current.rows = rows ?? MIN_ROWS;

    const currentRows = ~~(inputRef.current.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      inputRef.current.rows = currentRows;
    }

    if (currentRows >= MAX_ROWS) {
      inputRef.current.rows = MAX_ROWS;
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }

    currentRows && setInnerRows(currentRows < MAX_ROWS ? currentRows : MAX_ROWS);
  }, [inputRef, rows]);

  React.useEffect(() => {
    if (value !== undefined && value !== '') {
      setFilled.on();
    } else {
      setFilled.off();
    }
  }, [value]);

  const handleClick = React.useCallback(
    _event => {
      inputRef.current?.focus();
      setFocused.on();
    },
    [inputRef]
  );

  const handleFocus = React.useCallback(
    event => {
      setFocused.on();
      safeInvoke(onFocus, event);
    },
    [onFocus]
  );

  const handleBlur = React.useCallback(
    event => {
      setFocused.off();
      safeInvoke(onBlur, event);
    },
    [onBlur]
  );

  const handleChange = React.useCallback(
    event => {
      resizable && setRows();
      safeInvoke(onChange, event);
    },
    [resizable, setRows, onChange]
  );

  React.useEffect(() => {
    resizable && setRows();
  }, [resizable, value, setRows]);

  return (
    <div data-qa="Textarea" className={classNames} onClick={handleClick}>
      <textarea
        spellCheck="false"
        rows={innerRows}
        ref={useMergedRef(inputRef, ref)}
        value={fixControlledValue(value)}
        disabled={formControlContext.disabled || disabled}
        readOnly={readOnly}
        className={classNamesTextarea}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        {...restProps}
      />
      {labelElement}
      {placeholderElement}
      {iconElement}
    </div>
  );
});

Textarea.defaultProps = {
  rows: 1,
  resizable: true,
};

export default Textarea;
