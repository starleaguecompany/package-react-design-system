import * as React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

import { EASINGS, MotionVariants } from './_utils';

type ScaleFadeVariants = MotionVariants<'enter' | 'exit'>;

const variants: ScaleFadeVariants = {
  exit: props => ({
    opacity: 0,
    ...(props.reverse ? { scale: props.initialScale } : { transitionEnd: { scale: props.initialScale } }),
    transition: {
      duration: 0.2,
      ease: EASINGS.easeOut,
    },
  }),
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: EASINGS.easeInOut,
    },
  },
};

export const scaleFadeConfig: HTMLMotionProps<'div'> = {
  variants,
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
};

export interface ScaleFadeProps extends HTMLMotionProps<'div'> {
  /**
   * The initial scale of the element
   * @default 0.95
   */
  initialScale?: number;
  /** If `true`, the element will transition back to exit state */
  reverse?: boolean;
  /** If `true`, the element will unmount when `visible={false}` and animation is done */
  unmountOnExit?: boolean;
  /** Show the component; triggers the enter or exit states */
  visible?: boolean;
}

export const ScaleFade = React.forwardRef<HTMLDivElement, ScaleFadeProps>((props, ref) => {
  const { reverse = true, initialScale = 0.95, unmountOnExit, visible, ...rest } = props;

  const show = unmountOnExit ? visible && unmountOnExit : true;
  const custom = { initialScale, reverse };
  const motionProps = React.useMemo(
    () => ({
      ...scaleFadeConfig,
      custom,
      animate: visible || unmountOnExit ? 'enter' : 'exit',
    }),
    [visible, unmountOnExit, initialScale, reverse]
  );

  return (
    <AnimatePresence custom={custom}>{show && <motion.div ref={ref} {...motionProps} {...rest} />}</AnimatePresence>
  );
});
