/* eslint-disable import/no-extraneous-dependencies */
/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");

module.exports = {
  target: "web", // Make web variables accessible to webpack, e.g. window
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|gif|jpe?g)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        ENV: JSON.stringify(process.env.ENV),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PUBLIC_PATH: JSON.stringify(process.env.PUBLIC_PATH),
      },
    }),
  ],
  resolve: {
    modules: ["node_modules", "app"],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
    alias: {
      moment$: "moment/moment.js",
    },
  },
};
