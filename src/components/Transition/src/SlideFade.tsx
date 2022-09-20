import * as React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

import { EASINGS, MotionVariants } from './_utils';

type SlideFadeVariants = MotionVariants<'initial' | 'enter' | 'exit'>;

const transitions = {
  enter: {
    duration: 0.2,
    ease: EASINGS.easeOut,
  },
  exit: {
    duration: 0.1,
    ease: EASINGS.easeIn,
  },
};

const variants: SlideFadeVariants = {
  initial: props => ({
    opacity: 0,
    x: props.offsetX,
    y: props.offsetY,
    transition: transitions.exit,
  }),
  exit: props => ({
    opacity: 0,
    transition: transitions.exit,
    ...(props.reverse && {
      x: props.offsetX,
      y: props.offsetY,
    }),
    ...(!props.reverse && {
      transitionEnd: {
        x: props.offsetX,
        y: props.offsetY,
      },
    }),
  }),
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: transitions.enter,
  },
};

export const slideFadeConfig: HTMLMotionProps<'div'> = {
  variants,
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
};

export interface SlideFadeProps extends HTMLMotionProps<'div'> {
  /**
   * The offset on the horizontal or `x` axis
   * @default 0
   */
  offsetX?: string | number;
  /**
   * The offset on the vertical or `y` axis
   * @default 8
   */
  offsetY?: string | number;
  /**
   * If `true`, the element will be transitioned back to the offset when it leaves.
   * Otherwise, it'll only fade out
   * @default true
   */
  reverse?: boolean;
  /** If `true`, the element will unmount when `visible={false}` and animation is done */
  unmountOnExit?: boolean;
  /** Show the component; triggers the enter or exit states */
  visible?: boolean;
}

export const SlideFade = React.forwardRef<HTMLDivElement, SlideFadeProps>((props, ref) => {
  const { unmountOnExit, visible, reverse = true, offsetX = 0, offsetY = 8, ...rest } = props;

  const show = unmountOnExit ? visible && unmountOnExit : true;
  const custom = { offsetX, offsetY, reverse };
  const motionProps = React.useMemo(
    () => ({
      ...slideFadeConfig,
      custom,
      animate: visible || unmountOnExit ? 'enter' : 'exit',
    }),
    [visible, unmountOnExit]
  );

  return (
    <AnimatePresence custom={custom}>{show && <motion.div ref={ref} {...motionProps} {...rest} />}</AnimatePresence>
  );
});
