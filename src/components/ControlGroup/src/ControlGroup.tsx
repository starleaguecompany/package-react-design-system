import * as React from 'react';
import { useStyles, error } from '@starleaguecompany/package-react-utils';

import { Space } from '../../Space';

import { ControlGroupProps } from '../types/ControlGroup.types';
import styles from '../styles/ControlGroup.module.less';

/**
 * @description ControlGroup component.
 *
 * @component
 * @example
 * ```jsx
 * <ControlGroup>
 *  <TextInput placeholder="Left input position"/>
 *  <TextInput placeholder="Center input position"/>
 *  <TextInput placeholder="Right input position"/>
 * </ControlGroup>
 * ```
 */
const ControlGroup = React.forwardRef<HTMLDivElement, ControlGroupProps>((props, ref) => {
  const { className, children, direction, ...restProps } = props;

  const cx = useStyles(styles);
  const count = React.useMemo(() => React.Children.count(children), [children]);
  const condition = count < 2;

  // Ensure group has more than one child node
  if (condition) {
    error({
      condition,
      message: 'Ensure group has more than one child node',
    })();
  }

  const group = React.useMemo(() => {
    return React.Children.map(children as React.ReactElement, (child, index) => {
      if (condition) {
        return child;
      }

      let positionInGroup;

      if (index === 0) {
        positionInGroup = 'start';
      } else if (index === count - 1) {
        positionInGroup = 'end';
      } else {
        positionInGroup = 'middle';
      }

      return React.cloneElement(child, { ...child.props, positionInGroup, directionGroup: direction });
    });
  }, [children]);

  return (
    <div ref={ref} data-qa="ControlGroup" className={cx(className, 'container')} {...restProps}>
      <Space direction={direction} size={2}>
        {group}
      </Space>
    </div>
  );
});

ControlGroup.defaultProps = {
  direction: 'horizontal',
};

export default ControlGroup;
