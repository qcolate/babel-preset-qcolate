const __DEV__ = process.env.NODE_ENV !== 'production';

module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: 3,
        // exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/preset-react',
      {
        development: __DEV__,
        // will use the native built-in instead of trying to polyfill behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
    ['@babel/preset-typescript'],
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-numeric-separator'],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: true,
      },
    ],
    // Optional chaining and nullish coalescing are supported in @babel/preset-env,
    // but not yet supported in webpack due to support missing from acorn.
    // These can be removed once webpack has support.
    // See https://github.com/facebook/create-react-app/issues/8445#issuecomment-588512250
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-nullish-coalescing-operator'],
    // supported lodash
    ['lodash'],
    // supported antd (ant design)
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ];

  return {
    sourceType: 'unambiguous',
    overrides: [
      {
        presets,
        plugins,
        env: {
          development: {},
          production: {
            plugins: [['@babel/plugin-transform-react-inline-elements'], ['transform-react-remove-prop-types']],
          },
        },
        exclude: [/@babel[/\\]runtime/, /core-js/],
        ignore: [
          'node_modules',
          'logs',
          //
          '.cache',
          '_cache',
          'cache',
          //
          '.build',
          '_build',
          'build',
          //
          '.dist',
          '_dist',
          'dist',
          //
          '.deploy',
          '_deploy',
          'deploy',
        ],
      },
    ],
  };
};
