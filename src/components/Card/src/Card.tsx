import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { CardProps } from '../types/Card.types';
import styles from '../styles/Card.module.less';

/**
 * @description Simple rectangular container
 *
 * @component
 * @example
 * ```jsx
 * <Card>content</Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { variant, size, color, shadow, className, children, ...restProps } = props;

  const cx = useStyles(styles);
  const classNames = cx(className, 'container', {
    [`size-${size}`]: size,
    [`color-${color}-${variant}`]: true,
    shadow,
  });

  return (
    <div ref={ref} data-qa="Card" className={classNames} {...restProps}>
      {children}
    </div>
  );
});

Card.defaultProps = {
  size: 24,
  color: 'light',
  variant: 'primary',
  shadow: false,
};

export default Card;
