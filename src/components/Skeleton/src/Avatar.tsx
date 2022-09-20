import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { ElementProps } from '../types/Skeleton.types';
import styles from '../styles/Skeleton.module.less';

/**
 * @description Skeleton Avatar component.
 *
 * @component
 * @example
 * ```jsx
 * <Skeleton.Avatar />
 * ```
 */
const Avatar = (props: ElementProps) => {
  const { className, ...restProps } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, 'avatar');

  return <div className={classNames} {...restProps} />;
};

export default Avatar;
