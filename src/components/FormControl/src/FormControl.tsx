import * as React from 'react'
import { useStyles, FormControlProvider } from '@starleaguecompany/package-react-utils'

import { FormControlProps } from '../types/FormControl.types'
import styles from '../styles/FormControl.module.less'

/**
 * @description The FormControl component is a utility component to help compose form fields
 *
 * @component
 * @example
 * ```jsx
 * <FormControl>content</FormControl>
 * ```
 */
const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>((props, ref) => {
  const { invalid = false, disabled = false, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const classNames = cx(className, 'container')
  const formControlContext = React.useMemo(() => ({ invalid, disabled }), [invalid, disabled])

  return (
    <div ref={ref} data-qa="FormControl" className={classNames} {...restProps}>
      <FormControlProvider value={formControlContext}>{children}</FormControlProvider>
    </div>
  )
})

FormControl.defaultProps = {}

export default FormControl
