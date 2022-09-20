const path = require('path');

module.exports = {
  stories: [
    // "../src/**/*.stories.mdx",
    '../src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => {
        return prop.parent
          ? prop.parent.name !== 'DOMAttributes' &&
              prop.parent.name !== 'HTMLAttributes' &&
              prop.parent.name !== 'AriaAttributes' &&
              prop.parent.name !== 'InputHTMLAttributes' &&
              prop.parent.name !== 'Attributes' &&
              prop.parent.name !== 'RefAttributes'
          : true;
      },
    },
  },
  core: { builder: 'webpack5' },
  webpackFinal: async config => {
    config.resolve.extensions.push('.less');
    config.module.rules.push({
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer'), require('cssnano')({ preset: 'default' })],
            },
          },
        },
        'less-loader',
      ],
      include: path.resolve(__dirname, '../src'),
    });
    config.module.rules.push({
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: true,
            importLoaders: 2,
            modules: {
              exportGlobals: true,
              exportOnlyLocals: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              localIdentContext: path.resolve(__dirname, '../src'),
            },
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer'), require('cssnano')({ preset: 'default' })],
            },
          },
        },
        'less-loader',
      ],
      include: path.resolve(__dirname, '../src'),
    });
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer'), require('cssnano')({ preset: 'default' })],
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../src'),
    });

    return config;
  },
};
