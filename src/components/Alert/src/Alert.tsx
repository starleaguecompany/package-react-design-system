import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';
import { Cross } from '@starleaguecompany/react-icons';

import { Space } from '../../Space';
import { Icon } from '../../Icon';

import { AlertProps } from '../types/Alert.types';
import styles from '../styles/Alert.module.less';

/**
 * @description The Alert component is used to show feedback to the user about an action or state
 *
 * @component
 * @example
 * ```jsx
 * <Alert icon={icon} title="Информационный заголовок" message="Информационное сообщение" />
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { title, subtitle, icon, color, footer, closable, onClose, className, children, ...restProps } = props;

  const cx = useStyles(styles);
  const classNames = cx(className, 'container', {
    [`color-${color}`]: color,
  });

  return (
    <div ref={ref} data-qa="Alert" className={classNames} {...restProps}>
      {(!!icon || !!title || !!subtitle || !!closable) && (
        <Space size={12} align="center" className={cx('header')}>
          {icon && <div className={cx('icon')}>{icon}</div>}
          <Space direction="vertical" size={0} className={cx('titleWrapper')}>
            {title && <div className={cx('title')}>{title}</div>}
            {subtitle && <div className={cx('subtitle')}>{subtitle}</div>}
          </Space>
          {closable && <Icon className={cx('close')} icon={<Cross />} onClick={onClose} />}
        </Space>
      )}
      {children && <div className={cx('content')}>{children}</div>}
      {footer && (
        <Space size={12} justify="stretch" className={cx('footer')}>
          {footer}
        </Space>
      )}
    </div>
  );
});

Alert.defaultProps = {
  color: 'dark',
};

export default Alert;
