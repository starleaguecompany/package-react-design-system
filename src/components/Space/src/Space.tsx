import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { SPACE_SIZES } from '../../../constants/spaces';

import { SpaceSize, SpaceProps } from '../types/Space.types';
import styles from '../styles/Space.module.less';

/**
 * @description Set components spacing
 *
 * @component
 * @example
 * ```jsx
 * <Space size="m">
 *   <span>content</span>
 *   <span>content</span>
 *   <span>content</span>
 * </Space>
 * ```
 */
const Space = React.forwardRef<HTMLDivElement, SpaceProps>((props, ref) => {
  const { direction, size, align, justify, wrap, inline, className, children, style, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'container', {
    [`direction-${direction}`]: direction,
    [`align-${align}`]: align,
    [`justify-${justify}`]: justify,
    wrap,
    inline,
  });

  const elementStyles: React.CSSProperties = { ...style };

  const sizes = React.useMemo(() => {
    if (!size) return;

    const results: [SpaceSize, SpaceSize] = [0, 0];
    const normalizedSize = Array.isArray(size) ? size : [size, size];

    normalizedSize.forEach((g, index) => {
      results[index] = g || 0;
    });

    return results;
  }, [size]);

  if (sizes) {
    elementStyles.columnGap = sizes[0];
    elementStyles.rowGap = sizes[1];
  }

  return (
    <div ref={ref} data-qa="Space" className={classNames} style={elementStyles} {...restProps}>
      {children}
    </div>
  );
});

Space.defaultProps = {
  direction: 'horizontal',
  size: SPACE_SIZES.S0,
  wrap: false,
};

export default Space;
