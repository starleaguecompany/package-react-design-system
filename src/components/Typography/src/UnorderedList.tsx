import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { UnorderedListProps } from '../types/UnorderedList.types';
import styles from '../styles/List.module.less';

/**
 * @description Unordered list element.
 *
 * @component
 * @example
 * ```jsx
 * <UnorderedList>...</UnorderedList>
 * ```
 */
const UnorderedList = React.forwardRef<HTMLUListElement, UnorderedListProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'unordered');

  return (
    <ul ref={ref} className={classNames} {...restProps}>
      {children}
    </ul>
  );
});

export { UnorderedList };
