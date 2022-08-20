import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { CONTAINER_SIZES, FONT_SIZES } from '../../../constants/sizes'

import { Text, TextProps } from '../../Typography'

import SizeContext from './SizeContext'

import { AvatarProps } from '../types/Avatar.types'
import styles from '../styles/Avatar.module.less'

const getTextSize = (size?: AvatarProps['size']): TextProps['size'] => {
  switch (size) {
    case 36:
    case 44:
    case 52:
    default:
      return FONT_SIZES.S16
    case 60:
      return FONT_SIZES.S20
  }
}

/**
 * @description The Avatar component is used to represent users. And should only be used for avatars and logotypes
 *
 * @component
 * @example
 * ```jsx
 * <Avatar src="image.png" />
 * ```
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const groupSize = React.useContext(SizeContext)

  const { size, src, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'avatar', {
    [`size-${groupSize || size}`]: size,
  })

  const content = React.useMemo(() => {
    if (src) {
      return <img className={cx('image')} src={src} alt="avatar" loading="lazy" />
    }

    return (
      <Text strong uppercase size={getTextSize(size)}>
        {children}
      </Text>
    )
  }, [src])

  return (
    <div ref={ref} data-qa="Avatar" className={classNames} {...restProps}>
      {content}
    </div>
  )
})

Avatar.defaultProps = {
  size: CONTAINER_SIZES.S44,
}

export default Avatar
