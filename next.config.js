module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.(geo)?json$/,
      use: ['json-loader']
    })
    return config
  }
}
