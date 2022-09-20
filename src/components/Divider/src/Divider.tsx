import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { DividerProps } from '../types/Divider.types';
import styles from '../styles/Divider.module.less';

/**
 * @description A divider line separates different content
 *
 * @component
 * @example
 * ```jsx
 * <Divider />
 * ```
 */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const { size, className, ...restProps } = props;

  const cx = useStyles(styles);

  const classNames = cx(className, 'container', {
    [`size-${size}`]: size,
  });

  return <div ref={ref} data-qa="Divider" className={classNames} {...restProps} />;
});

Divider.defaultProps = {};

export default Divider;
