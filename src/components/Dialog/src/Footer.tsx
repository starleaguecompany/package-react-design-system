import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { Space } from '../../Space'

import DialogContext from './DialogContext'

import { FooterProps } from '../types/Dialog.types'
import styles from '../styles/Dialog.module.less'

/**
 * @description The Dialog component is used to show content on top of an overlay that requires user interaction
 *
 * @component
 * @example
 * ```jsx
 * <Footer>content</Dialog>
 * ```
 */
const Footer = React.forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const { className, children, ...restProps } = props

  const cx = useStyles(styles)
  const { fullscreen } = React.useContext(DialogContext)
  const classNames = cx(className, 'footer', {
    // withBorder: isOverflow,
    fullscreen,
  })

  return (
    <Space ref={ref} size={12} justify="stretch" className={classNames} {...restProps}>
      {children}
    </Space>
  )
})

Footer.defaultProps = {}

export default Footer
