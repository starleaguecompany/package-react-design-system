import * as React from 'react'

import { SheetProps } from './types/Sheet.types'
import Header from './src/Header'
import Footer from './src/Footer'
import Content from './src/Content'
import SheetRoot from './src/Sheet'

interface CompoundedComponent extends React.ForwardRefExoticComponent<SheetProps & React.RefAttributes<HTMLElement>> {
  Header: typeof Header
  Footer: typeof Footer
  Content: typeof Content
}

const Sheet = SheetRoot as CompoundedComponent

Sheet.Header = Header
Sheet.Footer = Footer
Sheet.Content = Content

export { Sheet, SheetProps }
