import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { SkeletonProps } from '../types/Skeleton.types';
import styles from '../styles/Skeleton.module.less';

/**
 * @description Provide a placeholder while you wait for content to load, or to visualise content that doesn't exist yet
 *
 * @component
 * @example
 * ```jsx
 * <Skeleton />
 * ```
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { className, children, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'container');

  return (
    <div ref={ref} data-qa="Skeleton" className={classNames} {...restProps}>
      {children}
    </div>
  );
});

Skeleton.defaultProps = {};

export default Skeleton;
