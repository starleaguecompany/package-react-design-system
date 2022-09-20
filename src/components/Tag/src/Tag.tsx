import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';
import { Cross } from '@starleaguecompany/react-icons';

import { CONTAINER_SIZES } from '../../../constants/sizes';

import { Icon } from '../../Icon';

import { TagProps } from '../types/Tag.types';
import styles from '../styles/Tag.module.less';

/**
 * @description Tag for categorizing or markup
 *
 * @component
 * @example
 * ```jsx
 * <Tag>content</Tag>
 * ```
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const { size, active, closable, onClose, className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'container', {
    active: active,
    [`size-${size}`]: size,
  });

  return (
    <span ref={ref} data-qa="Tag" className={classNames} {...restProps}>
      {children}
      {closable ? <Icon icon={<Cross />} onClick={onClose} /> : null}
    </span>
  );
});

Tag.defaultProps = {
  size: CONTAINER_SIZES.S44,
};

export default Tag;
