const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const assets = ['static'];

const copyPlugins = assets.map(asset => {
  return new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve( __dirname, 'src', asset), to: asset},
      { from: path.resolve(__dirname, 'src', 'index.html') },
      { from: path.resolve(__dirname, 'src', 'static', 'package.json')}
    ]
  });
});

const uiConfig = {
  target: "electron11-renderer",
  mode: 'production',
  entry: {
    ui: path.join(__dirname, 'src', 'renderer.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist1'),
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
  mode: 'production',
  target: 'electron15.1-main',
  entry: {
    electron: path.join(__dirname, 'src', 'main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist1'),
    filename: 'index.js',
    globalObject: "this",
  },
}

module.exports = [uiConfig, serverConfig]