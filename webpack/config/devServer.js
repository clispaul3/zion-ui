/**
 * @description 开发环境的devServer配置
 *   - 约定配置：1. 入口js文件名为: Index.tsx  2. 入口样式文件名为：style.scss
 */
const { getIP, resolvePath, getAllAppointEntryFile } = require("../utils")
const { devConfig: devServer } = require("../devConfig")
const proxy = require("./proxy")
const allWatchEntryFile = getAllAppointEntryFile(devServer.watchEntry)
const allBuildEntryFile = getAllAppointEntryFile(devServer.buildEntry)

module.exports = {
  devServer: {
    contentBase: resolvePath("dist"),
    publicPath: "/js/page/",
    inline: true,
    open: false,
    port: devServer.port,
    host: getIP() || "0.0.0.0",
    proxy: proxy(devServer.proxy)
  },
  watchEntry: allWatchEntryFile,
  buildEntry: allBuildEntryFile,
  buildProject: devServer.buildProject
}
