import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { SPACE_SIZES } from '../../../constants/spaces';

import { Space } from '../../Space';

import { MenuItemGroupProps } from '../types/MenuItemGroup.types';
import styles from '../styles/Menu.module.less';

/**
 * @description Menu Item Group component.
 *
 * @component
 * @example
 * ```jsx
 * <Menu.ItemGroup title="hint">
 *   <Menu.Item>1 год</Menu.Item>
 * </Menu.Item>
 * ```
 */
const MenuItemGroup = React.forwardRef<HTMLDivElement, MenuItemGroupProps>((props, ref) => {
  const { label, className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'itemGroup');

  return (
    <Space ref={ref} direction="vertical" className={classNames} {...restProps}>
      <Space align="center" size={SPACE_SIZES.S4} className={cx('itemBase', 'label')}>
        {label}
      </Space>
      {children}
    </Space>
  );
});

MenuItemGroup.defaultProps = {};

export default MenuItemGroup;
