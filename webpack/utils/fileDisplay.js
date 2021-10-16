/**
 * @description 遍历文件夹,找到匹配后缀名的文件
 * @param {dir:string} 遍历的目录或文件(绝对路径)
 * @param {suffix:string|string[]} 文件后缀名
 * @param {callback:function} 回调函数
 * @return {void}
 **/
const fs = require("fs")
const path = require("path")

function fileDisplay(dir = "", suffix, callback) {
  const targetFiles = []
  // 提取匹配到的目标文件
  function matchTarget(filePath) {
    const stat = fs.statSync(filePath)
    if (stat.isFile() && suffix.indexOf(path.extname(filePath)) >= 0) {
      targetFiles.push(filePath)
    }
    if (stat.isDirectory()) {
      return filePath
    }
  }
  const filterDir = matchTarget(dir)
  // 从文件夹中递归匹配目标文件
  function filterFile(dir) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.resolve(dir, file)
      const filterRes = matchTarget(filePath)
      if (filterRes) {
        filterFile(filterRes)
      }
    })
  }
  if (filterDir) {
    filterFile(filterDir)
  }
  callback(targetFiles)
}
module.exports = {
  fileDisplay
}
