import * as React from 'react';
import { useStyles } from '@starleaguecompany/package-react-utils';

import { FONT_SIZES } from '../../../constants/sizes';

import { TextProps } from '../types/Text.types';
import styles from '../styles/Text.module.less';

/**
 * @description The Text component is used for single line or multiline text. The component renders a div element by default
 *
 * @component
 * @example
 * ```jsx
 * <Text as="div" size="xl" strong>Text</Text>
 * ```
 */
const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const {
    as,
    size,
    strong,
    uppercase,
    capitalize,
    lowercase,
    truncate,
    nowrap,
    lineThrough,
    className,
    children,
    ...restProps
  } = props;
  const cx = useStyles(styles);

  const classNames = cx(className, {
    [`size-${size}`]: true,
    strong,
    uppercase,
    capitalize,
    lowercase,
    truncate,
    nowrap,
    lineThrough,
  });

  return React.createElement(
    as as React.ElementType,
    {
      ref: ref,
      className: classNames,
      ...restProps,
    },
    children
  );
});

Text.defaultProps = {
  size: FONT_SIZES.S14,
  as: 'div',
};

export { Text };
