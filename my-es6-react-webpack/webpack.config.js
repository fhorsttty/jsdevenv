var path = require('path');
// var webpack = require('webpack');

module.exports = {
  target: 'electron',
  node: {
    __dirname: false,
    __filename: false,
  },
  context: path.join(__dirname, 'src/assets/js'),   // ベースディレクトリ
  entry: {
    'main/index': './main/index.js',
    'renderer/app': './renderer/app.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist/assets/js'),
    filename: './[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/assets/js'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {modules: false}],
              'react',
            ],
          },
        }],
      },
      {
        // test: /\.css$/,
        // loaders: ['style-loader', 'css-loader?modules'],
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
