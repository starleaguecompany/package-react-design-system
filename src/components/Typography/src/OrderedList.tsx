import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { OrderedListProps } from '../types/OrderedList.types';
import styles from '../styles/List.module.less';

/**
 * @description Ordered list element.
 *
 * @component
 * @example
 * ```jsx
 * <OrderedList>...</OrderedList>
 * ```
 */
const OrderedList = React.forwardRef<HTMLOListElement, OrderedListProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'ordered');

  return (
    <ol ref={ref} className={classNames} {...restProps}>
      {children}
    </ol>
  );
});

export { OrderedList };
