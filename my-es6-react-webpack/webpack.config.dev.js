// webpack3

var path = require('path');

module.exports = {
  // エントリーポイントがあるディレクトリの絶対パス
  context: path.join(__dirname, 'src/assets/js'),
  // モジュールの依存関係を解析するエントリーポイント
  entry: {
    javascript: './Index.jsx',
  },
  output: {
    // バンドル・ファイルの出力先の絶対パス
    path: path.resolve(__dirname, 'dist/assets/js'),
    // バンドル・ファイルのファイル名
    filename: 'bundle.js',
    // webpack-dev-serverでバンドルファイルを公開するURLの相対パス
    publicPath: '/assets/js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,            // ローダーの処理対象ファイル
        exclude: /node_modules/,    // ローダーの処理対象から除外するディレクトリ
        use: [
          { loader: 'react-hot-loader/webpack' }, // HMR: Hot Module Replacement
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  loose: true,
                }],
                'stage-2',
                'react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules' }, // CSS Modules
        ],
      }
    ],
  },
  // プラグインの設定
  plugins: [
    // 追記予定
  ],
  // webpack-dev-server
  devServer: {
    // webpack-dev-serverで公開するディレクトリ
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
};
