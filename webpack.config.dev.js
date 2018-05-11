import path from 'path'
import webpack from 'webpack'

export default{
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/index.js')
  ],
  output:{
    path:'/',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module:{
    loaders:[
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loader: [ 'react-hot-loader/webpack','babel-loader' ]
      }
    ]
  }

}
