import * as React from 'react'
import { tuple } from '@starleaguecompany/package-react-utils'

const ControlGroupDirections = tuple('horizontal', 'vertical')

export type ControlGroupDirection = typeof ControlGroupDirections[number]

export interface ControlGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ControlGroupDirection
}
