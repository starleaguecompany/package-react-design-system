import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { LinkProps } from '../types/Link.types';
import styles from '../styles/Link.module.less';

/**
 * @description The Link component is used for anchor links. This component renders a a element by default
 *
 * @component
 * @example
 * ```jsx
 * <Link href="#">Link</Link>
 * ```
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { color, strong, className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'container', {
    [`color-${color}`]: color,
    strong,
  });

  return (
    <a ref={ref} className={classNames} {...restProps}>
      {children}
    </a>
  );
});

Link.defaultProps = {
  color: 'blue',
};

export { Link };
