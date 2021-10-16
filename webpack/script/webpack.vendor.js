const path = require("path")
const { resolvePath } = require("../utils")
const webpack = require("webpack");
const loader = require("../options/loader")
const { dllPath } = require("../config/base")
const { pathAlias, libConfig } = require("../devConfig")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: {
		...libConfig
	},
	output: {
		path: resolvePath("dist/js/lib"),
		filename: "[name].js",
		library: "[name]"
	},
	module: loader,
	resolve: {
		alias: { ...pathAlias },
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".d.ts"]
	},
	performance: {
		hints: false
	},
	plugins: [
		new ProgressBarPlugin(),
		...Object.keys(libConfig).map(name => {
			return new webpack.DllPlugin({
				name: "[name]",
				path: path.join(dllPath, `${name}-manifest.json`)
			});
		})
	]
};




