module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "entry",
        corejs: "3",
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
  ],
};
