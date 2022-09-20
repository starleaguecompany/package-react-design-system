import * as React from 'react';
import { useStyles, noop } from '@starleaguecompany/package-react-utils';
import { Check } from '@starleaguecompany/react-icons';

import { CheckboxProps } from '../types/Checkbox.types';
import styles from '../styles/Checkbox.module.less';

/**
 * @description The Checkbox component allows user to select multiple items from a list
 *
 * @component
 * @example
 * ```jsx
 * <Checkbox name="radio" value="default" label="Checkbox default" checked disabled />
 * ```
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { name, value, checked, disabled, className, children, readOnly, onChange, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'container', {
    checked: checked,
    disabled: disabled,
    readOnly: readOnly,
  });
  const controlClassNames = cx('control', {
    checked: checked,
    disabled: disabled,
  });

  return (
    <label data-qa="Checkbox" className={classNames}>
      <input
        ref={ref}
        className={cx('input')}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      <div className={controlClassNames}>{checked ? <Check className={cx('icon')} /> : null}</div>
      {children ? <span className={cx('label')}>{children}</span> : null}
    </label>
  );
});

Checkbox.defaultProps = {
  checked: false,
  onChange: noop,
};

export default Checkbox;
