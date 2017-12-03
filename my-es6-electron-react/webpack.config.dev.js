// webpack3

var path = require('path');

module.exports = {
  target: 'electron',
  node: {
    __dirname: false,
    __filename: false,
  },
  // エントリーポイントがあるディレクトリの絶対パス
  context: path.join(__dirname, 'src/assets/js'),
  // モジュールの依存関係を解析するエントリーポイント
  entry: {
    'main/index': './main/index.js',
    'renderer/app': './renderer/app.jsx',
  },
  output: {
    // バンドル・ファイルの出力先の絶対パス
    path: path.resolve(__dirname, 'dist/assets/js'),
    // バンドル・ファイルのファイル名
    filename: './[name].js',
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
        include: path.join(__dirname, 'src/assets/js'),
        use: [
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
          { loader: 'css-loader?modules' },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules' },
          { loader: 'stylus-loader' },
        ],
      },
    ],
  },
  // プラグインの設定
  plugins: [
    // 追記予定
  ],
};
