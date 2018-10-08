module.exports = api => {
  api.chainWebpack(webpackConfig => {
    const copyWebpackConfig =[
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
    ]
    webpackConfig.plugin('copy')
    .use(copyWebpackConfig)
    .end()
    new CopyWebpackPlugin()    
  })
}
