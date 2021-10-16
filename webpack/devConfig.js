const { resolvePath } = require("./utils/resolvePath")

/** 代理IP配置 */
const proxyIp = {
	"16.86": "http://192.168.16.86",
	"35.53": "http://192.168.35.53",
}

/** 公共库配置，配置第三方插件的统一打包 */
const libConfig = {
	["vendor"]: [
		"lodash", "react", "react-dom", "antd",
		"@ant-design/icons", "mobx", "mobx-react",
		"js-cookie", "axios", "jquery", "moment",
		"wangeditor", "turndown", "codemirror",
		/** 如果需要调试框架，请注释 zion-ui，然后 npm run build && npm run dev */
		"zion-ui"
	]
}

/** 路径别名配置 */
const pathAlias = {
	"@": resolvePath("src"),
	"zion-ui": resolvePath("src/zion-ui"),
	"zion-mobile": resolvePath("src/zion-mobile"),
	"v2": resolvePath("src/platform-v2"),
	"v3": resolvePath("src/platform-v3"),
	"IOTMPV3": resolvePath("src/IOTMPV3")
}

/**
 * 1.watchEntry
 *   - 监视入口，不指定则监视全部, 格式:项目.模块.页面，如果是单页面项目，只需指定项目名称即可, 脚本命令：npm run dev | npm start
 * 2.buildEntry
 *   - 打包页面，不指定则打包全部, 格式:项目.模块.页面，如果是单页面项目，只需指定项目名称即可, 脚本命令：npm run prod
 * 3.buildProject
 *   - 打包项目，指定项目，则会打包该项目下的所有页面，如["BBK","XJAPP"], 脚本命令：npm run build
 */
const devConfig = {
	port: 9000,
	proxy: proxyIp["35.53"],
	watchEntry: [
		"ZionUIDocs",
	],
	buildEntry: [],
	buildProject: ["ZionUIDocs"]
}

module.exports = {
	pathAlias,
	devConfig,
	libConfig
}



