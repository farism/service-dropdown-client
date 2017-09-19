module.exports = {
  use: [
    ['neutrino-preset-react'],
    neutrino =>
      neutrino.config.output
        .path('/')
        .publicPath('/')
        .filename('[name].js'),
    neutrino =>
      neutrino.config.module
        .rule('compile')
        .use('babel')
        .tap(options => {
          options.plugins.push('relay')
          return options
        }),
  ],
}
