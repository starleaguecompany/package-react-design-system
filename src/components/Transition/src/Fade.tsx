import * as React from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'

import { EASINGS, MotionVariants } from './_utils'

type FadeVariants = MotionVariants<'enter' | 'exit'>

const variants: FadeVariants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: EASINGS.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: EASINGS.easeIn,
    },
  },
}

export const fadeConfig: HTMLMotionProps<'div'> = {
  variants,
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
}

export interface FadeProps extends HTMLMotionProps<'div'> {
  /** If `true`, the element will unmount when `visible={false}` and animation is done */
  unmountOnExit?: boolean
  /** Show the component; triggers the enter or exit states */
  visible?: boolean
}

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
  const { unmountOnExit, visible, ...rest } = props

  const show = unmountOnExit ? visible && unmountOnExit : true
  const motionProps = React.useMemo(
    () => ({
      ...fadeConfig,
      animate: visible || unmountOnExit ? 'enter' : 'exit',
    }),
    [visible, unmountOnExit]
  )

  return <AnimatePresence>{show && <motion.div ref={ref} {...motionProps} {...rest} />}</AnimatePresence>
})
