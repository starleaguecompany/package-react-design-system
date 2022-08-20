## 🖥 Environment Support
- Modern browsers and Internet Explorer Edge
- Server-side Rendering

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions |

## 📦 Install

Design System can be installed by either NPM or Yarn, using the following command. You should also have `react@16.8.0`, `react-dom@16.8.0`, `classnames@2.3.1`, `@starleaguecompany/package-react-utils@0.1.0`, `@starleaguecompany/react-icons@0.1.0` and `@starleaguecompany/design-system-theme@0.1.0` or higher versions.

If you want to use the design system inside npm package you must **install it as peer and dev dependencies**
```bash
yarn add --peer @starleaguecompany/react-design-system @starleaguecompany/design-system-theme @starleaguecompany/react-utils @starleaguecompany/react-icons
yarn add --dev @starleaguecompany/react-design-system @starleaguecompany/design-system-theme @starleaguecompany/react-utils @starleaguecompany/react-icons
```

If you want to use the design system inside a project you must **install it as a prod dependency**
```bash
yarn add @starleaguecompany/react-design-system @starleaguecompany/design-system-theme @starleaguecompany/react-utils @starleaguecompany/react-icons
```

## 🔨 Usage

```jsx
import { ThemeProvider } from '@starleaguecompany/design-system-theme'
import { Button } from '@starleaguecompany/react-design-system';

const App = () => (
  <ThemeProvider>
    <Button color="green" type="primary">PRESS ME</Button>
  </ThemeProvider>
);
```

**If you are using Next.js, you need to apply the plugin** `next-transpile-modules`

```javascript
// next.config.js
const withStyles = require('next-transpile-modules')([
  '@starleaguecompany/react-header',
  '@starleaguecompany/react-footer',
  /* all packages with css modules */
])

const config = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
}

module.exports = withStyles(config)
```

See full [example](/examples/nextjs)

### TypeScript

Design System is written in TypeScript with complete definitions.

## ⌨️ Development

Clone locally:

```bash
$ git clone git@github.com:starleaguecompany/package-react-design-system.git
$ cd package-react-design-system
$ yarn install
$ yarn dev
```

Open your browser and visit http://localhost:6006.

## 🤓 Scripts explained

Inside the `package.json` there is a bunch of scripts that this repo uses to run the project in development mode and to build the project.

Below you can read a description of each script.

- `yarn dev`: Starts the development React Storybook.
- `yarn lint`: Lints the JavaScript and `less` files.
- `yarn test`: Runs the unit tests using `Jest`.
- `yarn format`: Runs formatters using `Prettier`.
- `yarn build`: Builds all the JavaScript files using `Babel`.
- `yarn g`: Runs component generator.
- `yarn release`: Releases new version of Design System.
- `yarn commit`: Runs gui for help to create correct commit.

## 🤝 Contributing

Read our [contributing guide](./CONTRIBUTING.md) and let's build a better Design System together.
