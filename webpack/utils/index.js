const { getIP } = require("./getIP")
const { resolvePath } = require("./resolvePath")
const { fileDisplay } = require("./fileDisplay")
const { img2base64 } = require("./img2base64")
const { dirExists } = require("./dirExists")
const { getAllAppointEntryFile } = require("./getAllAppointEntryFile")

module.exports = {
  getIP,
  resolvePath,
  fileDisplay,
  img2base64,
  dirExists,
  getAllAppointEntryFile
}
