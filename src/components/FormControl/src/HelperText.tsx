import * as React from 'react'
import { useStyles, useFormControlContext } from '@starleaguecompany/package-react-utils'

import { HelperTextProps } from '../types/FormControl.types'
import styles from '../styles/FormControl.module.less'

/**
 * @description Skeleton Avatar component.
 *
 * @component
 * @example
 * ```jsx
 * <Skeleton.Avatar />
 * ```
 */
const HelperText = (props: HelperTextProps) => {
  const { className, children, ...restProps } = props
  const cx = useStyles(styles)
  const formControlContext = useFormControlContext()

  const classNames = cx(className, 'helperText', {
    invalid: formControlContext.invalid,
    disabled: formControlContext.disabled,
  })

  return (
    <div className={classNames} {...restProps}>
      {children}
    </div>
  )
}

export default HelperText
