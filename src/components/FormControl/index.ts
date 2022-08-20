import * as React from 'react'

import { FormControlProps } from './types/FormControl.types'
import FormControlRoot from './src/FormControl'
import HelperText from './src/HelperText'

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<FormControlProps & React.RefAttributes<HTMLElement>> {
  HelperText: typeof HelperText
}

const FormControl = FormControlRoot as CompoundedComponent

FormControl.HelperText = HelperText

export { FormControl, FormControlProps }
