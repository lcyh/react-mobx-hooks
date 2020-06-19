const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  plugins: [
    // 清理 dist 文件，2.0。0 版本之后不需要设置参数就可以自动清除打包生成的目录
    new CleanWebpackPlugin(),
    // 提取 css 文件
    new MiniCssExtractPlugin({
      filename: "public/styles/[name].[contenthash:8].css",
      chunkFilename: "public/styles/[name].[contenthash:8].chunk.css",
    }),
    // 区分环境
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    // 在命令行展示更清晰地提示信息
    new FriendlyErrorsWebpackPlugin(),
    // 引用dll
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../public/dll/vendors_manifest.json"),
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../public/dll/vendors.dll.js"),
    }),
  ],
  optimization: {
    minimize: true,
    // 打包压缩js/css文件
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        // 使用多进程并行运行来提高构建速度。并发运行的默认数量为 os.cpus().length - 1
        parallel: true,
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            ecma: 5,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        sourceMap: false,
      }),
      // 压缩 CSS 代码
      new OptimizeCSSAssetsPlugin({}),
    ],
    // 拆分公共模块
    splitChunks: {
      chunks: "all",
      name: false,
      //   cacheGroups: {
      //     styles: {
      //       name: "styles",
      //       test: /\.(css|less)/,
      //       chunks: "all",
      //       enforce: true,
      //       // 表示是否使用已有的 chunk
      //       reuseExistingChunk: true,
      //     },
      //     commons: {
      //       name: "commons",
      //       chunks: "initial",
      //       minChunks: 2,
      //       reuseExistingChunk: true,
      //     },
      //     vendors: {
      //       name: "vendors",
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: -10,
      //       reuseExistingChunk: true,
      //     },
      //   },
    },
    // 为每个仅含有 runtime 的入口起点添加一个额外 chunk
    runtimeChunk: true,
  },
  // 性能提醒
  performance: {
    hints: false,
  },
  // 统计信息展示
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
});

module.exports = config;
