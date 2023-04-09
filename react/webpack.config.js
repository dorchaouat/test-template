const path = require("path");
const glob = require('glob');

module.exports = [
  {
    mode: "development",
    entry: () => {
      const entries = {};

      glob.sync('./src/components/*/index.ts').forEach((file) => {
        const name = path.dirname(file).split('/').pop();
        entries[name] = './' + file;
      });

      return entries;
    },
    output: {
      path: path.resolve(__dirname, "dist/statics/scripts"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
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
      extensions: [".tsx", ".ts", ".js"],
    },
    stats: "errors-only",
  },
];
