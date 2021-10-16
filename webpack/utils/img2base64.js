/**
 * @description 将图片转成base64
 * @param {img:string} 图片的绝对地址
 * @return {string} 
 */
const fs = require('fs');

function img2base64(img) {
  const bitmap = fs.readFileSync(img);
  const base64str = Buffer.from(bitmap, 'binary').toString('base64');
  return base64str
}

module.exports = {
  img2base64
}