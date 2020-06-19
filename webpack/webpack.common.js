const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");
const friendlyFormatter = require("eslint-formatter-friendly");
const themeVars = require("../src/theme.less");
const isProd = process.env.NODE_ENV === "production";
const {
  appSrc,
  appDist,
  appIndex,
  appHtml,
  appUtils,
  appPages,
  appComponents,
  appNodeModules,
} = require("../config/paths");

module.exports = {
  entry: {
    main: ["@babel/polyfill", appIndex],
    common: ["react", "react-dom", "react-router-dom", "mobx", "mobx-react"],
  },
  output: {
    filename: "public/js/[name].[hash:8].js",
    path: appDist,
    publicPath: "/",
  },
  plugins: [
    // 自动在出口目录生成 html 并自动引入 js 文件
    new HTMLWebpackPlugin({
      template: appHtml,
      filename: "index.html",
      inject: true,
    }),
    // 打包进度
    new ProgressBarPlugin({
      complete: "█",
      format:
        chalk.green("Webpack ") +
        "[ " +
        chalk.green(":bar") +
        " ] " +
        ":msg: " +
        chalk.bold("(:percent)"),
      clear: true,
    }),
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(ts|tsx|js|jsx)?$/,
        include: [appSrc],
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
          options: {
            eslintPath: require.resolve("eslint"),
            emitWarning: false,
            cache: true, // 缓存lint结果，可以减少lint时间
            formatter: friendlyFormatter,
            quiet: true,
          },
        },
      },
      // 解析 js
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [appSrc],
        exclude: /node_modules/,
        //   loader: "babel-loader",
        // 把对 .js .jsx 文件的处理转交给 id 为 happy-babel 的 HappyPack 实例
        use: ["happypack/loader?id=happy-babel"],
      },
      // 解析样式
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        include: [appSrc],
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                localIdentName: "[local].[hash:base64:5]",
              },
              // 使用时 class 名会原样导出
              localsConvention: "asIs",
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: themeVars,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        exclude: [appSrc],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      // 解析图片资源
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
        include: [appSrc],
      },
      // 解析 字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      // 解析数据资源
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"],
      },
      // 解析数据资源
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      // 解析 MakeDown 文件
      {
        test: /\.md$/,
        use: ["html-loader", "markdown-loader"],
      },
    ],
  },
  resolve: {
    // 设置别名
    alias: {
      "@": appSrc,
      src: appSrc,
      utils: appUtils,
      pages: appPages,
      components: appComponents,
    },
    extensions: [
      ".js",
      ".jsx",
      ".tsx",
      ".ts",
      ".less",
      ".module.less",
      ".module.css",
    ],
    // 设置模块查找范围
    modules: ["node_modules", appNodeModules],
  },
};
