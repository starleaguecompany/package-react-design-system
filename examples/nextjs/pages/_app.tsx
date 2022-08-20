import React from 'react'
import { useIsMobile, DeviceInfoProvider } from '@starleaguecompany/package-react-utils'
import { ThemeProvider } from '@starleaguecompany/design-system-theme'
// import { DesktopHeader, MobileHeader } from '@starleaguecompany/react-header'
// import { Footer } from '@starleaguecompany/react-footer'

function MyApp({ Component, pageProps }) {
  const isMobile = useIsMobile();

  return (
    <DeviceInfoProvider initialInfo={{ phone: false, tablet: false }}>
      <ThemeProvider theme="lager">
        {/*{isMobile ? <MobileHeader serviceURL="/" /> : <DesktopHeader serviceURL="/" />}*/}
        <Component {...pageProps} />
        {/*<Footer />*/}
      </ThemeProvider>
    </DeviceInfoProvider>
  )
}

export default MyApp
