/* eslint-disable import/no-extraneous-dependencies */
/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require("path");

/**
 *
 * WEBPACK DEV SERVER CONFIGURATION
 *
 */

const { merge } = require("webpack-merge");
const devCommon = require("./webpack.dev");

module.exports = merge(devCommon, {
  stats: "minimal", // Only output when errors or new compilation happen
  // Configure Dev Server
  devServer: {
    static: {
      directory: path.join(process.cwd(), "build"),
      publicPath: "/",
    },
    open: true,
    port: (process.env.PORT || 3001),
    liveReload: true,
    hot: true,
    historyApiFallback: true, // Nested routes config
  },
});
