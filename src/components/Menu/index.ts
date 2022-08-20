import * as React from 'react'

import { MenuProps } from './types/Menu.types'
import MenuRoot from './src/Menu'
import MenuItem from './src/MenuItem'
import MenuItemGroup from './src/MenuItemGroup'

interface CompoundedComponent extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLElement>> {
  ItemGroup: typeof MenuItemGroup
  Item: typeof MenuItem
}

const Menu = MenuRoot as CompoundedComponent

Menu.Item = MenuItem
Menu.ItemGroup = MenuItemGroup

export { Menu, MenuProps }
