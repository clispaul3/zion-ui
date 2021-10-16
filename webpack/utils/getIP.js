/**
 * @description 获取本机IP
 */
const pattern = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
const os = require("os");

function getIP() {
  const networkInterfaces = os.networkInterfaces();
  let platform = "lo0"
  if (!networkInterfaces[platform]) {
    platform = "本地连接"
  }
  if (!networkInterfaces[platform]) {
    platform = "以太网"
  }
  let ip = null;
  if (networkInterfaces[platform]) {
    const res = networkInterfaces[platform].filter((item) =>
      pattern.test(item.address)
    );
    if (res.length > 0) {
      ip = res[0]["address"];
    }
  }
  return ip;
}

getIP()

module.exports = {
  getIP,
};
