import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';
import { ArrowRight } from '@starleaguecompany/react-icons';

import { Icon } from '../../Icon';
import { Space } from '../../Space';

import { BreadcrumbProps } from '../types/Breadcrumb.types';
import styles from '../styles/Breadcrumb.module.less';

/**
 * @description A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy
 *
 * @component
 * @example
 * ```jsx
 * <Breadcrumb>
 *   <Breadcrumb.Item>Home</Breadcrumb.Item>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'container');

  const count = React.useMemo(() => React.Children.count(children), [children]);
  const navigation = React.useMemo(() => {
    return React.Children.map(children as React.ReactElement, (child, index) => {
      return (
        <React.Fragment>
          {child}
          {index + 1 < count && <Icon size={16} icon={<ArrowRight />} />}
        </React.Fragment>
      );
    });
  }, [children]);

  return (
    <Space ref={ref} data-qa="Breadcrumb" align="center" size={8} className={classNames} {...restProps}>
      {navigation}
    </Space>
  );
});

Breadcrumb.defaultProps = {};

export default Breadcrumb;
