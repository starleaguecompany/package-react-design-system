import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { ButtonProps } from '../types/Skeleton.types';
import styles from '../styles/Skeleton.module.less';

/**
 * @description Skeleton Button component.
 *
 * @component
 * @example
 * ```jsx
 * <Skeleton.Button />
 * ```
 */
const Button = (props: ButtonProps) => {
  const { block, className, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'button', { block });

  return <div className={classNames} {...restProps} />;
};

export default Button;
