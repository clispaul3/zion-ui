// 获取指定入口的打包入口文件
const { resolvePath } = require("./resolvePath")
const { baseSource } = require("../config/base")
const allEntryFile = require("../../src/config/pagename.json")
const fs = require("fs")
const path = require("path")
const pathSeperator = path.sep

const getAllAppointEntryFile = function (appiontEntry = []) { // ["BBK.auth_manage.device_auth"]
  const allAppointEntryFile = {
    js: { "main": resolvePath("src/main.ts") },
    style: baseSource.style
  }
  const getEntryFilePath = function (entry) {  // BBK.auth_manage.device_auth
    const filePath = entry.replace(/\./g, pathSeperator)
    const pageDir = ("src/projects" + pathSeperator + filePath + pathSeperator)
    // if (Object.keys(allAppointEntryFile["js"]).length >= 10) return
    allAppointEntryFile["js"][entry] = resolvePath(pageDir + "Index.tsx")
    const styleEntryFile = resolvePath(pageDir + "style.scss")
    if (fs.existsSync(styleEntryFile)) {
      allAppointEntryFile["style"][entry] = {
        entry: styleEntryFile,
        external: "sass"
      }
    }
  }
  if (appiontEntry.length <= 0) {
    Object.keys(allEntryFile).forEach(key => {
      if (allEntryFile[key].length <= 0) {  // 单页面应用
        getEntryFilePath(key)
      } else {
        allEntryFile[key].forEach(entry => { // 项目.模块.页面
          getEntryFilePath(key + "." + entry)
        })
      }
    })
  } else {
    allAppointEntryFile.style = {}
    appiontEntry.forEach(entry => {
      if (allEntryFile[entry] && allEntryFile[entry].length > 0) {
        allEntryFile[entry].forEach(pagename => {
          getEntryFilePath(entry + "." + pagename)
        })
      } else {
        getEntryFilePath(entry)
      }
    })
  }
  return allAppointEntryFile
}

module.exports = {
  getAllAppointEntryFile
}