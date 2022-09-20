import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { COLORS } from '../../../constants/colors';

import { BadgeProps } from '../types/Badge.types';
import styles from '../styles/Badge.module.less';

/**
 * @description The Badge component is label with a background color
 *
 * @component
 * @example
 * ```jsx
 * <Badge color="green">Личные финансы</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { text, variant, color, shape, placement, className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const hasChildren = children !== undefined;

  const classNames = cx(className, 'container');
  const elementClassNames = cx('element', {
    [`color-${color}-${variant}`]: true,
    [`shape-${shape}`]: shape && text,
    'shape-dot': !text,
    floating: hasChildren,
    [`floating-${placement}`]: hasChildren,
  });

  return (
    <span ref={ref} data-qa="Badge" className={classNames} {...restProps}>
      {children}
      <span className={elementClassNames}>{text}</span>
    </span>
  );
});

Badge.defaultProps = {
  variant: 'secondary',
  color: COLORS.GRAY,
  shape: 'round',
  placement: 'top-end',
};

export default Badge;
