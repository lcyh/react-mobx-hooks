module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 2,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "import",
      {
        libraryName: "antd",
        style: true,
      },
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 2,
      },
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
      },
    ],
    "@babel/plugin-syntax-dynamic-import",
  ],
};
