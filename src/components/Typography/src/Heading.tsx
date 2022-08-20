import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { HeadingProps } from '../types/Heading.types'
import styles from '../styles/Heading.module.less'

/**
 * @description The Heading component is used for all headings.
 *
 * @component
 * @example
 * ```jsx
 * <Heading level={2}>
 *   Heading
 * </Heading>
 * ```
 */
const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { as, level, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container', {
    [`size-${level}`]: level,
  })

  return React.createElement(
    as || (`h${level}` as React.ElementType),
    {
      ref: ref,
      className: classNames,
      ...restProps,
    },
    children
  )
})

Heading.defaultProps = {
  level: 1,
}

export { Heading }
