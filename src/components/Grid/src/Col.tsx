import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { ColProps } from '../types/Col.types';
import RowContext from './RowContext';
import styles from '../styles/Col.module.less';

/**
 * @description Column element for Grid system.
 *
 * @component
 * @example
 * ```jsx
 * <Col span={3}>
 *   Column
 * </Button>
 * ```
 */
const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { className, span, order, breakpoints, style, children, ...restProps } = props;
  const cx = useStyles(styles);
  // const [match] = useMediaQuery()

  // const breakPointProps = React.useMemo(() => {
  //   if (breakpoints && match) {
  //     // @ts-ignore
  //     return breakpoints[match] || {}
  //   }
  //
  //   return {}
  // }, [match, breakpoints])

  const classNames = cx(className, 'container', {
    // [`span-${breakPointProps.span || span}`]: breakPointProps.span || span,
    [`span-${span}`]: span,
  });
  const { gutter } = React.useContext(RowContext);
  const mergedStyle: React.CSSProperties = {
    ...style,
    // order: breakPointProps.order || order || undefined,
    order: order || undefined,
    // ...breakPointProps.style,
  };

  // Horizontal gutter use padding
  if (gutter && gutter[0] > 0) {
    const horizontalGutter = gutter[0] / 2;
    mergedStyle.paddingLeft = horizontalGutter;
    mergedStyle.paddingRight = horizontalGutter;
  }

  // Vertical gutter use padding when gap not support
  if (gutter && gutter[1] > 0) {
    const verticalGutter = gutter[1] / 2;
    mergedStyle.paddingTop = verticalGutter;
    mergedStyle.paddingBottom = verticalGutter;
  }

  return (
    <div data-qa="Col" ref={ref} className={classNames} style={{ ...mergedStyle }} {...restProps}>
      {children}
    </div>
  );
});

Col.defaultProps = {};

export default Col;
