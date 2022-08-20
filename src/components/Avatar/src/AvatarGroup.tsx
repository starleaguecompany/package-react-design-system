import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { SizeContextProvider } from './SizeContext'

import { AvatarGroupProps } from '../types/AvatarGroup.types'
import styles from '../styles/Avatar.module.less'

/**
 * @description AvatarGroup component.
 *
 * @component
 * @example
 * ```jsx
 * <AvatarGroup size="m">
 *  <Avatar src="image.png" />
 *  <Avatar src="image.png" />
 * </AvatarGroup>
 * ```
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>((props, ref) => {
  const { size, className, children, ...restProps } = props

  const cx = useStyles(styles)
  const classNames = cx(className, 'group')

  return (
    <div ref={ref} data-qa="AvatarGroup" className={classNames} {...restProps}>
      <SizeContextProvider size={size}>{children}</SizeContextProvider>
    </div>
  )
})

AvatarGroup.defaultProps = {
  size: 36,
}

export default AvatarGroup
