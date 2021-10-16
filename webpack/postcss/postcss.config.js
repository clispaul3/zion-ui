/**
 * @description 样式资源打包配置，支持less和sass
 */
const { watchEntry } = require("../config/devServer")
const { getAllAppointEntryFile } = require("../utils/getAllAppointEntryFile")
const mode = process.env.mode
const allStyleResources = getAllAppointEntryFile([]).style
module.exports = (function () {
  if (mode === "prod") {
    return allStyleResources
  }
  return watchEntry.style
})()


