// Множественный дефолтный импорт внутри entrypoint приводит к поломке экспорта типов
// TODO: не собираются стили всей типографики
import { Heading } from './src/Heading'
import { Link } from './src/Link'
import { Text } from './src/Text'
import { ListItem } from './src/ListItem'
import { OrderedList } from './src/OrderedList'
import { UnorderedList } from './src/UnorderedList'

import { HeadingProps } from './types/Heading.types'
import { TextProps } from './types/Text.types'
import { LinkProps } from './types/Link.types'
import { OrderedListProps } from './types/OrderedList.types'
import { UnorderedListProps } from './types/UnorderedList.types'
import { ListItemProps } from './types/ListItem.types'

export {
  Heading,
  HeadingProps,
  Link,
  LinkProps,
  Text,
  TextProps,
  UnorderedList,
  UnorderedListProps,
  UnorderedList as Ul,
  OrderedList,
  OrderedListProps,
  OrderedList as Ol,
  ListItem,
  ListItemProps,
  ListItem as Li,
}
