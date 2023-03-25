const path = require("path");

module.exports = [
  {
    mode: "development",
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
            { loader: "css-modules-typescript-loader" },
            { loader: "css-loader", options: { modules: true } },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    entry: "./src/components/first-widget/index.ts",
    output: {
      path: path.resolve(__dirname, "dist/statics/scripts/first-widget"),
      filename: "first-widget.bundle.js",
    },
    stats: "errors-only",
  },
];
