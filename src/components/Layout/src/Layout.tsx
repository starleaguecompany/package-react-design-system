import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { LayoutProps } from '../types/Layout.types';
import styles from '../styles/Layout.module.less';

/**
 * @description Container component.
 *
 * @component
 * @example
 * ```jsx
 * <Container>content</Container>
 * ```
 */
const Layout = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const { className, children, ...restProps } = props;

  const cx = useStyles(styles);

  return (
    <div ref={ref} data-qa="Layout" className={cx(className, 'container')} {...restProps}>
      {children}
    </div>
  );
});

Layout.defaultProps = {};

export default Layout;
