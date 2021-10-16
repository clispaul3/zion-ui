/**
 * @description webpack基础配置
 */
const path = require("path")
const plugins = require("../options/plugin")
const { resolvePath, getAllAppointEntryFile } = require("../utils")
const loader = require("../options/loader")
const { pathAlias, libConfig } = require("../devConfig")
const { watchEntry, buildEntry, buildProject } = require("../config/devServer")
const mode = process.env.mode
const webpack = require("webpack")
const { dllPath } = require("../config/base")

const getTargetEntry = function () {
	if (mode === "prod") { // 打包指定的入口文件
		return buildEntry.js
	}
	if (mode === "build") {
		return getAllAppointEntryFile(buildProject.length > 0 ? buildProject : []).js
	}
	if (mode === "dev") {
		return watchEntry.js
	}
}
const targetEntry = getTargetEntry()
console.log("-------------------------------------------------")
console.log(targetEntry)
console.log("-------------------------------------------------")

const pluginsConfig = [...plugins]
pluginsConfig.push(...Object.keys(libConfig).map(name => {
	return new webpack.DllReferencePlugin({
		context: ".",
		manifest: path.join(dllPath, `${name}-manifest.json`)
	});
}))
module.exports = {
	entry: targetEntry,
	output: {
		path: resolvePath("dist/js/page"),
		filename: "[name].js",
	},
	performance: {
		hints: false
	},
	module: loader,
	resolve: {
		alias: { ...pathAlias },
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".d.ts"]
	},
	plugins: pluginsConfig
}

