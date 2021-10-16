/**
 * @description 获取文件的路径
 */
const path = require('path');
const fs = require('fs');

const basePath = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(basePath, relativePath);
module.exports = {
  resolvePath
}