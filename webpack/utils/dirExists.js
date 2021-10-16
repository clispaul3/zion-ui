const fs = require("fs")
const path = require("path")
/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    })
  })
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      console.log(dir)
      console.log(err)
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
function dirExists(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (dirExists(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true
    }
  }
}

module.exports = {
  dirExists
}
