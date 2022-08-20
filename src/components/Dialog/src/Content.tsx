import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import DialogContext from './DialogContext'

import { ContentProps } from '../types/Dialog.types'
import styles from '../styles/Dialog.module.less'

/**
 * @description The Dialog component is used to show content on top of an overlay that requires user interaction
 *
 * @component
 * @example
 * ```jsx
 * <Content>content</Dialog>
 * ```
 */
const Content = React.forwardRef<HTMLDivElement, ContentProps>((props, ref) => {
  const { className, children, ...restProps } = props

  const cx = useStyles(styles)
  const { fullscreen } = React.useContext(DialogContext)
  const classNames = cx(className, 'content', {
    fullscreen,
  })

  return (
    <div ref={ref} className={classNames} {...restProps}>
      {children}
    </div>
  )
})

Content.defaultProps = {}

export default Content
