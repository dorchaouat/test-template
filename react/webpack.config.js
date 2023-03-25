const path = require('path');

module.exports = [
  {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-modules-typescript-loader' },
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    entry: './src/components/firstWidget/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist/statics/firstWidget'),
      filename: 'first-widget.bundle.js',
    },
    stats: 'errors-only',
  },
];
