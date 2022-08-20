import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'

import { RowProps } from '../types/Row.types'
import RowContext from './RowContext'
import styles from '../styles/Row.module.less'

/**
 * @description Container element for Grid system.
 *
 * @component
 * @example
 * ```jsx
 * <Row gutter={[20, 20]} wrap>
 *   ...columns
 * </Button>
 * ```
 */
const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const { className, gutter, align = 'top', justify, wrap: wrap, style, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container', {
    wrap: wrap,
    [`align-${align}`]: align,
    [`justify-${justify}`]: justify,
  })

  const gutters = React.useMemo(() => {
    const results: [number, number] = [0, 0]
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0]

    normalizedGutter.forEach((g, index) => {
      results[index] = g || 0
    })

    return results
  }, [gutter])

  const rowStyle: React.CSSProperties = { ...style }
  const horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined

  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter
    rowStyle.marginRight = horizontalGutter
  }

  const rowContext = React.useMemo(() => ({ gutter: gutters, wrap }), [gutters, wrap])

  return (
    <RowContext.Provider value={rowContext}>
      <div data-qa="Row" ref={ref} className={classNames} style={{ ...rowStyle }} {...restProps}>
        {children}
      </div>
    </RowContext.Provider>
  )
})

Row.defaultProps = {
  gutter: 0,
  align: 'top',
  justify: 'start',
  wrap: true,
}

export default Row
