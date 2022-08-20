import * as React from 'react'
import { tupleNum } from '@starleaguecompany/package-react-utils'

import { CONTAINER_SIZES } from '../../../constants/sizes'

const TagSizes = tupleNum(CONTAINER_SIZES.S36, CONTAINER_SIZES.S44)

export type TagSize = typeof TagSizes[number]

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size */
  size?: TagSize
  /** Active state */
  active?: boolean
  /** Whether the Tag can be closed */
  closable?: boolean
  /** Callback executed when tag is closed */
  onClose?: React.MouseEventHandler<HTMLSpanElement>
}
