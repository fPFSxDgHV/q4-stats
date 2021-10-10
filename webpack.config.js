const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const assets = ['static'];
const copyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve( __dirname, 'src', asset), to: asset},
      { from: path.resolve(__dirname, 'src', 'index.html')}
    ]
  });
});

const uiConfig = {
  target: "electron11-renderer",
  mode: 'development',
  entry: {
    ui: path.join(__dirname, 'src', 'renderer.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [

      // First Rule
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      // Second Rule
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...copyPlugins
  ]
}

const serverConfig = {
  mode: 'development',
  target: 'electron15.1-main',
  entry: {
    electron: path.join(__dirname, 'src', 'main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: "this",
  },
}

module.exports = [uiConfig, serverConfig]