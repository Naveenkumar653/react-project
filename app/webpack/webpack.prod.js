/* eslint-disable import/no-extraneous-dependencies */
// Important modules this config uses
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve("react-app-polyfill/ie11"),
    path.join(process.cwd(), "app/app.js"),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },

  optimization: {
    minimize: true,
    minimizer: [
      (compiler) => {
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              comparisons: false,
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
        }).apply(compiler);
      },
    ],
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: "app/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new InjectManifest({
      swSrc: path.join(process.cwd(), "app/service-worker.js"),
      swDest: "sw.js",
      maximumFileSizeToCacheInBytes: 17 * 1024 * 1024,
      exclude: [".htaccess"],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new WebpackPwaManifest({
      name: "React Test",
      short_name: "React Test",
      description: "React Test Application!",
      background_color: "#fafafa",
      theme_color: "#2ca01c",
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve("app/images/Image.png"),
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
        {
          src: path.resolve("app/images/Image.png"),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          }, // Inject style into dom
          "css-loader", // Turns css into js
        ], // load reverse order
      },
    ],
  },

  performance: {
    assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
