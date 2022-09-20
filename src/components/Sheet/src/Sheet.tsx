import * as React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useStyles, useMergedRef, safeInvoke, preventBodyScroll } from '@starleaguecompany/package-react-utils';
import { Cross } from '@starleaguecompany/react-icons';

import { Portal } from '../../Portal';
import { Icon } from '../../Icon';
import { EASINGS } from '../../Transition';

import { SheetProps } from '../types/Sheet.types';

import styles from '../styles/Sheet.module.less';

/**
 * @description Sheet component.
 *
 * @component
 * @example
 * ```jsx
 * <Sheet>content</Sheet>
 * ```
 */
const Sheet = React.forwardRef<HTMLDivElement, SheetProps>((props, ref) => {
  const { visible, closable, fullscreen, onClose, className, children, ...restProps } = props;

  const cx = useStyles(styles);
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const isUnmountEvent = React.useRef(true);
  const referenceRef = useMergedRef(sheetRef, ref);

  const handleClose = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      preventBodyScroll();
      safeInvoke(onClose, event);
      isUnmountEvent.current = false;
    },
    [onClose]
  );

  const handleDragEnd = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>, { velocity }: PanInfo) => {
      const sheetEl = sheetRef.current;
      if (!sheetEl) return;

      const contentHeight = sheetEl.getBoundingClientRect().height;

      // Close if dragged over 60%
      if (velocity.y / contentHeight > 0.6) {
        handleClose(event);
      }
    },
    [sheetRef, handleClose]
  );

  const handlePreventBodyScroll = React.useCallback(() => {
    if (visible && isUnmountEvent.current) {
      preventBodyScroll();
    }
  }, [visible, isUnmountEvent]);

  const sheetMotionProps = React.useMemo(
    () => ({
      initial: 'exit',
      exit: 'exit',
      variants: {
        enter: { y: 0, transition: { duration: 0.2, type: 'easeOut' } },
        exit: {
          y: sheetRef.current ? sheetRef.current.getBoundingClientRect().height : 1000,
          transition: { duration: 0.2, type: 'easeOut' },
        },
      },
      animate: visible ? 'enter' : 'exit',
    }),
    [visible, sheetRef.current]
  );
  const backdropMotionProps = React.useMemo(
    () => ({
      variants: {
        exit: {
          opacity: 0,
          transition: {
            duration: 0.2,
            delay: 0.2,
            ease: EASINGS.easeOut,
          },
        },
        enter: {
          opacity: 0.6,
          transition: {
            duration: 0.2,
            delay: 0.1,
            ease: EASINGS.easeIn,
          },
        },
      },
      animate: visible ? 'enter' : 'exit',
      initial: 'exit',
      exit: 'exit',
    }),
    [visible]
  );

  const dragProps = React.useMemo(
    () => ({
      drag: 'y',
      dragElastic: 0.5,
      dragConstraints: { top: 0, bottom: 0 },
      dragMomentum: false,
      onDragEnd: handleDragEnd,
    }),
    [handleDragEnd]
  );

  React.useEffect(() => {
    if (visible) {
      preventBodyScroll(true);
      isUnmountEvent.current = true;
    }

    return handlePreventBodyScroll;
  }, [visible]);

  return (
    <Portal>
      <AnimatePresence>
        {visible && (
          <div className={cx('overlay')}>
            <motion.div {...backdropMotionProps} className={cx('backdrop')} onClick={handleClose} />
            {/* @ts-ignore */}
            <motion.div
              {...dragProps}
              {...sheetMotionProps}
              ref={referenceRef}
              data-qa="Sheet"
              className={cx(className, 'container', { fullscreen })}
              {...restProps}
            >
              {closable && <Icon className={cx('close')} icon={<Cross />} onClick={handleClose} />}
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
});

Sheet.defaultProps = {};

export default Sheet;
