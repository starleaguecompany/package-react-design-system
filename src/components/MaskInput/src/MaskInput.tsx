import * as React from 'react';
import InputMask from 'react-input-mask';
import { useStyles, useFormControlContext, safeInvoke, isDefined } from '@starleaguecompany/package-react-utils';

import { TextInput } from '../../TextInput';

import { MaskInputProps } from '../types/MaskInput.types';
import styles from '../styles/MaskInput.module.less';
/**
 * @description The Mask Input component allows user to type in text with mask
 *
 * @component
 * @example
 * ```jsx
 * <MaskInput placeholder="Дата" mask="99/99/9999" value={value} onChange={handleChange} />
 * ```
 */
const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>((props, ref) => {
  const { defaultValue, value, mask, placeholder, className, onChange, ...restProps } = props;

  const [innerValue, setInnerValue] = React.useState(value || defaultValue);
  const formControlContext = useFormControlContext();
  const cx = useStyles(styles);
  const classNames = cx(className, 'container');
  const inputProps = React.useMemo(
    () => ({
      ...formControlContext,
      ...restProps,
    }),
    [restProps, formControlContext]
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInnerValue(event.currentTarget.value);
    safeInvoke(onChange, event);
  };

  React.useEffect(() => {
    isDefined(value) && setInnerValue(value);
  }, [value]);

  return (
    <div data-qa="MaskInput" className={classNames}>
      <InputMask mask={mask} value={innerValue} onChange={handleChange} {...inputProps}>
        <TextInput ref={ref} placeholder={placeholder} />
      </InputMask>
    </div>
  );
});

MaskInput.defaultProps = {};

export default MaskInput;
