import * as React from 'react'

import { BreadcrumbProps } from './types/Breadcrumb.types'
import BreadcrumbRoot from './src/Breadcrumb'
import BreadcrumbItem from './src/BreadcrumbItem'

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>> {
  Item: typeof BreadcrumbItem
}

const Breadcrumb = BreadcrumbRoot as CompoundedComponent

Breadcrumb.Item = BreadcrumbItem

export { Breadcrumb, BreadcrumbProps }
