import * as React from 'react'
import { Omit } from '@starleaguecompany/package-react-utils'

export interface TabPaneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Show text in TabPane's head */
  title: React.ReactNode
}
