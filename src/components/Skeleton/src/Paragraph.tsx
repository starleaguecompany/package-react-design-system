import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { ElementProps } from '../types/Skeleton.types'
import styles from '../styles/Skeleton.module.less'

function validWidth(width: number | undefined) {
  if (!width || width < 0) {
    return 100
  }
  if (width > 100) {
    return 100
  }
  return width
}

/**
 * @description Skeleton Paragraph component.
 *
 * @component
 * @example
 * ```jsx
 * <Skeleton.Paragraph />
 * ```
 */
const Paragraph = (props: ElementProps) => {
  const { width, className, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'paragraph')
  const elementStyles = {
    width: `${validWidth(width)}%`,
  }

  return <div className={classNames} {...restProps} style={elementStyles} />
}

export default Paragraph
