import * as React from 'react';
import { useStyles, noop, safeInvoke } from '@starleaguecompany/package-react-utils';
import { Star as IconStar } from '@starleaguecompany/react-icons';

import { Icon } from '../../Icon';

import styles from '../styles/Rate.module.less';

interface IProps {
  className?: string;
  index: number;
  value?: number | null;
  allowHalf?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, value: number) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement>, value: number) => void;
}

const Star: React.FC<IProps> = props => {
  const { className, index, value, allowHalf, disabled, onClick, onHover } = props;

  const cx = useStyles(styles);
  const classNames = cx(className, 'starContainer', {
    disabled,
  });

  const handleClick = React.useCallback(
    event => {
      safeInvoke(onClick, event, index);
    },
    [index]
  );

  const handleHover = React.useCallback(
    event => {
      safeInvoke(onHover, event, index);
    },
    [index]
  );

  const focusedFirst = value && value >= index + 0.5;
  const focusedSecond = value && value >= index + 1;

  return (
    <div className={classNames} onClick={disabled ? noop : handleClick} onMouseMove={disabled ? noop : handleHover}>
      {allowHalf ? (
        <Icon className={cx('star', 'half', { disabled, fill: focusedFirst })} color="orange" icon={<IconStar />} />
      ) : null}
      <Icon className={cx('star', { disabled, fill: focusedSecond })} color="orange" icon={<IconStar />} />
    </div>
  );
};

export default Star;
