const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
);

module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "prettier",
    "prettier/react"
  ],
  rules: {
    "prettier/prettier": ["error", prettierOptions],
    "no-param-reassign": ["error", { props: false }],
  },
};
