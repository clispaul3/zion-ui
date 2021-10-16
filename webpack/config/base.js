/**
 * @description 基础资源的配置
 *   - 样式资源用 postcss 打包
 */
const { resolvePath } = require("../utils/resolvePath")
const baseSource = {
	style: {
		"base": {
			entry: resolvePath("src/style/base.css"),
			external: "sass",
			isBase: true
		},
		"zion-ui.min": {
			entry: resolvePath("src/zion-ui/style/index.css"),
			external: "sass",
			isBase: true
		}
	}
}

/** 公共库打包目录 */
const dllPath = resolvePath("dist/js/lib")

/** 手机类项目 */
const appProjects = [
	// "MobileProject",
]

module.exports = {
	baseSource,
	dllPath,
	appProjects
}