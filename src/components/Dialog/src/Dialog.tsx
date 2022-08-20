import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStyles, noop, preventBodyScroll, useKeyPress, safeInvoke } from '@starleaguecompany/package-react-utils'
import { Cross } from '@starleaguecompany/react-icons'

import { Portal } from '../../Portal'
import { Icon } from '../../Icon'
import { EASINGS } from '../../Transition'
import { scaleFadeConfig } from '../../Transition/src/ScaleFade'

import DialogContext from './DialogContext'

import { DialogProps } from '../types/Dialog.types'
import styles from '../styles/Dialog.module.less'

/**
 * @description The Dialog component is used to show content on top of an overlay that requires user interaction
 *
 * @component
 * @example
 * ```jsx
 * <Dialog title="Title">content</Dialog>
 * ```
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { visible, fullscreen, closable, onClose, className, children, ...restProps } = props
  // 'isActive' fixes the problem of simultaneously exiting with Esc in nested dialogs
  const [isActive, setIsActive] = React.useState<boolean>(true)
  // const [isOverflow, setIsOverflow] = useBoolean(false)
  const isUnmountEvent = React.useRef(true)
  const { setActive } = React.useContext(DialogContext)

  const cx = useStyles(styles)

  const animationProps = React.useMemo(() => ({ initialScale: fullscreen ? 1.05 : 0.95, reverse: true }), [])
  const dialogMotionProps = React.useMemo(
    () => ({
      ...scaleFadeConfig,
      custom: animationProps,
      animate: visible ? 'enter' : 'exit',
    }),
    [visible]
  )
  const backdropMotionProps = React.useMemo(
    () => ({
      variants: {
        exit: {
          opacity: 0,
          transition: {
            duration: 0.15,
            ease: EASINGS.easeOut,
          },
        },
        enter: {
          opacity: 0.6,
          transition: {
            duration: 0.2,
            ease: EASINGS.easeIn,
          },
        },
      },
      animate: visible ? 'enter' : 'exit',
      initial: 'exit',
      exit: 'exit',
    }),
    [visible]
  )

  // React.useEffect(() => {
  //   if (contentRef.current && contentRef.current.scrollHeight > contentRef.current.clientHeight) {
  //     setIsOverflow.on()
  //   } else {
  //     setIsOverflow.off()
  //   }
  // }, [visible, contentRef.current])

  const handleClose = React.useCallback(
    (event: React.KeyboardEvent | React.MouseEvent) => {
      preventBodyScroll()
      setActive?.(true)
      safeInvoke(onClose, event)
      isUnmountEvent.current = false
    },
    [onClose]
  )

  const handlePreventBodyScroll = React.useCallback(() => {
    if (visible && isUnmountEvent.current) {
      preventBodyScroll()
    }
  }, [visible, isUnmountEvent])

  React.useEffect(() => {
    if (visible) {
      preventBodyScroll(true)
      setActive?.(false)
      isUnmountEvent.current = true
    }

    return handlePreventBodyScroll
  }, [visible])

  useKeyPress(
    {
      enabled: !!visible,
      keyMap: {
        Escape: event => {
          event.preventDefault()
          if (!isActive) {
            return
          }

          setActive?.(true)
          handleClose(event as unknown as React.KeyboardEvent)
        },
      },
    },
    [visible, isActive]
  )

  return (
    <Portal>
      <AnimatePresence custom={animationProps}>
        {visible && (
          <div className={cx('overlay')}>
            {!fullscreen && <motion.div {...backdropMotionProps} className={cx('backdrop')} onClick={handleClose} />}
            {/* @ts-ignore */}
            <motion.div
              {...dialogMotionProps}
              ref={ref}
              data-qa="Dialog"
              className={cx(className, 'container', { fullscreen })}
              {...restProps}
            >
              {closable && <Icon className={cx('close')} size={28} icon={<Cross />} onClick={handleClose} />}
              <DialogContext.Provider value={{ fullscreen, setActive: setIsActive }}>{children}</DialogContext.Provider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Portal>
  )
})

Dialog.defaultProps = {
  closable: true,
  onClose: noop,
}

export default Dialog
