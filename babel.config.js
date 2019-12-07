module.exports = (api) => {
  const web = process.env.BABEL_ENV !== 'node'

  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'usage' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: !web ? { node: 'current' } : undefined,
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@loadable/babel-plugin',
    ],
  }
}