import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { isBrowser, useBoolean } from '@starleaguecompany/package-react-utils'

let portalContainer: Element
const portalAttribute = 'sr-portal-container'

const Portal: React.FC = React.memo(props => {
  const { children } = props
  const [isContainerMounted, setIsContainerMounted] = useBoolean(false)

  const portal = React.useMemo(() => {
    if (!isBrowser) {
      return null
    }

    if (portalContainer) {
      return portalContainer
    }

    const el = document.querySelector(`div[${portalAttribute}]`)

    if (el) {
      portalContainer = el

      return portalContainer
    }

    portalContainer = document.createElement('div')
    portalContainer.setAttribute(portalAttribute, '')

    return portalContainer
  }, [])

  React.useEffect(() => {
    if (!portal) return

    document.body.appendChild(portal)

    setIsContainerMounted.on()
  }, [portal])

  if (!isBrowser) {
    return null
  }

  if (portal && isContainerMounted) {
    return ReactDOM.createPortal(children, portal)
  }

  return null
})

export default Portal
