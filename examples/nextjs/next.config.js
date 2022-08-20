const withStyles = require('next-transpile-modules')([
    '@starleaguecompany/react-auth-dialog',
    '@starleaguecompany/react-region-dialog',
    '@starleaguecompany/react-design-system',
    '@starleaguecompany/react-header',
    '@starleaguecompany/react-footer',
    '@starleaguecompany/react-pre-footer',
    '@starleaguecompany/design-system-theme',
    "@starleaguecompany/react-icons",
])
// const withBundleAnalyzer = require('@next/bundle-analyzer');

const config = {
  analyzeBrowser: true,
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
}

module.exports = withStyles(config)
// module.exports = withBundleAnalyzer(withStyles(config))
// module.exports = config
