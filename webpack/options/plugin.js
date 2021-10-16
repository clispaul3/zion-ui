/**
 * @description 插件配置
 */
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolvePath } = require("../utils")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const mode = process.env.mode
const plugins = [
	new CopyWebpackPlugin([
		{
			from: resolvePath("src/assets/imgs"),
			to: resolvePath("dist/imgs"),
			toType: "dir"
		},
		{
			from: resolvePath("src/html/index.html"),
			to: resolvePath("dist"),
			toType: "dir"
		},
		{
			from: resolvePath("src/assets/lib"),
			to: resolvePath("dist/js/lib"),
			toType: "dir"
		}
	]),
	new ProgressBarPlugin(),
]
if (mode === "build") {
	plugins.push(new CleanWebpackPlugin())
}

module.exports = plugins
