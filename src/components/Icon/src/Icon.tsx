import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { CONTENT_SIZES } from '../../../constants/sizes'

import { IconProps } from '../types/Icon.types'
import styles from '../styles/Icon.module.less'

/**
 * @description Icon container.
 *
 * @component
 * @example
 * ```jsx
 * <Icon size="l" icon={<ArrowUpIcon />} />
 * ```
 */
const Icon = React.forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { icon, size, strong, color, shape, style = {}, children, className, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container', {
    strong: strong,
    [`size-${size}`]: size,
    [`color-${color}`]: color,
    asContainer: children,
    [`shape-${shape}`]: shape,
  })
  // const modeProps = {
  //   fill: mode === 'fill' ? 'currentColor' : 'none',
  //   stroke: mode === 'outline' ? 'currentColor' : 'none',
  // }
  // const child = React.useMemo(() => {
  //   if (children || icon) {
  //     return React.cloneElement((children || icon) as React.ReactElement, modeProps)
  //   }
  //
  //   return null
  // }, [children, icon, mode])

  return (
    <span data-qa="Icon" ref={ref} className={classNames} style={style} {...restProps}>
      {children || icon}
    </span>
  )
})

Icon.defaultProps = {
  size: CONTENT_SIZES.S20,
  // color: COLORS.GRAY,
  shape: 'round',
  // mode: 'outline',
}

export default Icon
