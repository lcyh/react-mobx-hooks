/*
 * @Author: changluo
 * @Description:dll
 */
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  // 你想要打包的模块的数组
  entry: {
    vendors: ["react", "react-router-dom", "react-dom", "mobx-react"],
  },
  output: {
    path: path.resolve(__dirname, "../public/dll"), // 打包后文件输出的位置
    filename: "[name].dll.js",
    library: "[name]_library",
    // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "../public/dll/vendors_manifest.json"),
      name: "[name]_library",
      context: __dirname,
    }),
  ],
};
