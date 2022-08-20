import * as React from 'react'
import { motion, PanInfo } from 'framer-motion'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Alert } from '../../Alert'
import { EASINGS } from '../../Transition'

import { NotificationProps } from '../types/Notifications.types'
import styles from '../styles/Notifications.module.less'

/**
 * @description Notification component.
 *
 * @component
 * @example
 * ```jsx
 * <Notification />
 * ```
 */
const Notification: React.FC<NotificationProps & { onClose: (id: NotificationProps['id']) => void }> = React.memo(
  props => {
    const { id, title, subtitle, message, onClose } = props

    const cx = useStyles(styles)
    const alertMotionProps = React.useMemo(
      () => ({
        variants: {
          exit: {
            opacity: 0,
            x: 400,
            height: 0,
            transition: {
              x: { duration: 0.1, ease: EASINGS.easeOut },
              height: { delay: 0.1, duration: 0.1 },
              duration: 0.2,
              ease: EASINGS.easeOut,
            },
          },
          enter: {
            opacity: 1,
            height: 'auto',
            x: 0,
            transition: {
              height: { duration: 0.1 },
              x: { delay: 0.1, ease: EASINGS.easeInOut },
              duration: 0.25,
              delay: 0.2,
              ease: EASINGS.easeInOut,
            },
          },
        },
        initial: 'exit',
        animate: 'enter',
        exit: 'exit',
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          mass: 0.2,
        },
        drag: 'x' as const,
        draggable: true,
        dragElastic: 0.2,
        dragConstraints: { left: 0, right: 400 },
      }),
      []
    )

    const handleClickClose = React.useCallback(() => {
      onClose(id)
    }, [id])

    const handleDragEnd = React.useCallback(
      (_: Event, { offset, velocity }: PanInfo) => {
        if (Math.abs(offset.x) * velocity.x > 0) {
          onClose(id)
        }
      },
      [id]
    )

    const MotionComponent = motion(Alert)

    return (
      <MotionComponent
        {...alertMotionProps}
        className={cx('alert')}
        title={title}
        subtitle={subtitle}
        closable
        onClose={handleClickClose}
        // @ts-ignore
        onDragEnd={handleDragEnd}
      >
        {message}
      </MotionComponent>
    )
  }
)

export default Notification
