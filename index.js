const yaml = require('js-yaml')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = api => {
  api.chainWebpack(config => {
    config.plugin('copy')
      .use(new CopyWebpackPlugin([
        {
          from: 'config.yaml',
          to: 'baseURL.js',
          transform (content) {
            const BUILD_ENV = process.env.BUILD_ENV || 'DEV'
            const config = yaml.safeLoad(content)
            return (
              Object.keys(config)
                .map(key => {
                  return `var ${key} = "${config[key][BUILD_ENV]}"`
                })
                .join(';\n') + ';'
            )
          }
        }
      ]))
      .end()
  })
}
