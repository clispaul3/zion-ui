/**
 * @description 开发配置
 */
const webpackBaseConfig = require("./webpack.base")
const webpackMerge = require("webpack-merge")
const { devServer, watchEntry } = require("../config/devServer")
const watch = require("node-watch")
const shell = require("shelljs")
const ignoreStyle = process.env.ignoreStyle
if (ignoreStyle == "true") {
  console.log("不会动态编译样式...")
} else {
  const styleEntry = []
  Object.keys(watchEntry.style).filter(key => {
    if (!watchEntry.style[key]["isBase"]) {
      styleEntry.push(watchEntry.style[key]["entry"])
    }
  })
  watch(styleEntry, function (ev, name) {
    console.log(name + ": 重新编译")
    shell.exec("node webpack/postcss/index.js")
  })
}

const devConfig = {
  mode: "development",
  devtool: 'cheap-module-eval-source-map',
  devServer
}
module.exports = webpackMerge(webpackBaseConfig, devConfig)
