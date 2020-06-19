/*
 * @Author: changluo
 * @Description:抽离第三方模块,打包一次后,第三方依赖不用打包,提高构建打包速度;每次更改本地代码的文件的时候,只需要打包编译项目本身的文件代码，而不会再去编译第三方库，提高编译速度
 * 对于开发项目中不经常会变更的静态依赖文件。类似于我们的react全家桶等等。因为很少会变更，所以我们不希望这些依赖要被集成到每一次的构建逻辑中去。
 *
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
