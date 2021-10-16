const postcssConfig = require("./postcss.config")
const path = require("path")
const fs = require("fs")
const { dirExists, resolvePath } = require("../utils")
const {
  compileSass2Css,
  compileLess2Css
} = require("./processor")

Object.keys(postcssConfig).forEach(key => {
  const item = postcssConfig[key]
  if (item["external"].includes("sass")) {
    compileSass2Css({ ...item, key }, css => writeCssToFile(key, css))
  }
  if (item["external"].includes("less")) {
    compileLess2Css({ ...item, key }, css => writeCssToFile(key, css))
  }
})

/**
 * @description 将编译完成的css写入到指定文件
 */
function writeCssToFile(key, css) {
  const directory = resolvePath("dist/css")
  const filePath = key + ".css"
  const bool = dirExists(directory)
  const absPath = path.resolve(directory, filePath)
  console.info(absPath + ": 打包" + (bool ? "成功" : "失败"))
  fs.writeFile(absPath, css, () => true)
}
