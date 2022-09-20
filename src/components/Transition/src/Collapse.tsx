import * as React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { safeInvoke } from '@starleaguecompany/package-react-utils';

import { EASINGS, MotionVariants } from './_utils';

type CollapseVariants = MotionVariants<'enter' | 'exit'>;

const hasHeightValue = (value?: string | number) => value != null && parseInt(value.toString(), 10) > 0;

const variants: CollapseVariants = {
  exit: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: hasHeightValue(props.startingHeight) ? 1 : 0,
    }),
    height: props.startingHeight,
    transition: {
      height: { duration: 0.2, ease: EASINGS.ease },
      opacity: { duration: 0.3, ease: EASINGS.ease },
    },
  }),
  enter: (props: CollapseOptions) => ({
    ...(props.animateOpacity && {
      opacity: 1,
    }),
    height: props.endingHeight,
    transition: {
      height: {
        duration: 0.3,
        ease: EASINGS.ease,
      },
      opacity: {
        duration: 0.4,
        ease: EASINGS.ease,
      },
    },
  }),
};

export const fadeConfig: HTMLMotionProps<'div'> = {
  variants,
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
};

export interface CollapseOptions {
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean;
  /** If `true`, the element will unmount when `in={false}` and animation is done */
  unmountOnExit?: boolean;
  /** If `true`, the content will be expanded */
  visible?: boolean;
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight?: number | string;
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight?: number | string;
}

type Display = React.CSSProperties['display'];

export interface CollapseProps extends HTMLMotionProps<'div'>, CollapseOptions {}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  const {
    unmountOnExit,
    visible,
    animateOpacity = true,
    startingHeight = 0,
    endingHeight = 'auto',
    style,
    onAnimationComplete,
    ...rest
  } = props;

  const fromZeroHeight = startingHeight === 0;

  const [open, setOpen] = React.useState(!!visible);

  const getInitialHidden = () => {
    // If it is open by default, no need to apply `aria-hidden`
    if (visible) return false;
    // If startingHeight > 0, then content is partially visible
    if (hasHeightValue(startingHeight)) return false;
    // Else, the content is hidden
    return true;
  };

  const [display, setDisplay] = React.useState<Display>(() => {
    if (!fromZeroHeight) return 'block';
    const hidden = getInitialHidden();
    return hidden ? 'none' : 'block';
  });

  const custom = { startingHeight, endingHeight, animateOpacity };
  const ownProps: HTMLMotionProps<'div'> & React.RefAttributes<any> = {
    ref,
    // @future: set parameter as `definition` when we remove `framer-motion`
    // v3 support
    onAnimationComplete: (definition?: any) => {
      if (!open && fromZeroHeight) {
        setDisplay('none');
      }

      safeInvoke(onAnimationComplete, definition);
    },
    ...rest,
    variants,
    style: { overflow: 'hidden', ...style },
    custom,
  };

  React.useEffect(() => {
    setDisplay('block');
    setOpen(!!visible);
  }, [visible]);

  if (unmountOnExit) {
    return (
      <AnimatePresence initial={false} custom={custom}>
        {visible && <motion.div {...ownProps} initial="exit" animate="enter" exit="exit" />}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      {...ownProps}
      style={{ ...ownProps.style, display }}
      initial={false}
      animate={open ? 'enter' : 'exit'}
    />
  );
});
