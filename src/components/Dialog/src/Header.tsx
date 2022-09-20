import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { Space } from '../../Space';

import DialogContext from './DialogContext';

import { HeaderProps } from '../types/Dialog.types';
import styles from '../styles/Dialog.module.less';

/**
 * @description The Dialog component is used to show content on top of an overlay that requires user interaction
 *
 * @component
 * @example
 * ```jsx
 * <Header title="Title">content</Dialog>
 * ```
 */
const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { title, subtitle, icon, className, children, ...restProps } = props;

  const cx = useStyles(styles);
  const { fullscreen } = React.useContext(DialogContext);
  const classNames = cx(className, 'header', {
    fullscreen,
  });

  return (
    <React.Fragment>
      <Space ref={ref} size={12} align="center" className={classNames} {...restProps}>
        {icon && <div className={cx('icon')}>{icon}</div>}
        {title || subtitle ? (
          <Space direction="vertical" size={8} className={cx('titleWrapper')}>
            {title && <div className={cx('title')}>{title}</div>}
            {subtitle && <div className={cx('subtitle')}>{subtitle}</div>}
          </Space>
        ) : null}
      </Space>
      {children}
    </React.Fragment>
  );
});

Header.defaultProps = {};

export default Header;
