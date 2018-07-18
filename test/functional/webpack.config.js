var webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    'scalar-x-axis': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'scalar-x-axis.js')
    ],
    'scalar-y-axis': [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      path.resolve(__dirname, 'scalar-y-axis.js')
    ]
  },
  // entry: path.resolve(__dirname, 'scalar-y-axis.js'),
  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [
          path.resolve(__dirname, '..', '..', 'src'),
          path.resolve(__dirname)
        ],
        exclude: /node_modules/
      }
    ]
  }
}
