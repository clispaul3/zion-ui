/**
 * @description 生产配置
 */
const webpackBaseConfig = require("./webpack.base")
const webpackMerge = require("webpack-merge")
const { buildProject } = require("../config/devServer")
const mode = process.env.mode

// BBK项目过大，不宜开启生产环境的source-map
const notSourceMapProject = ["BBK", "TPMS"]
const prodConfig = {
	mode: 'production',
}
if (notSourceMapProject.includes(buildProject.toString()) === false || mode === "prod") {
	// prodConfig.devtool = "source-map"
}

module.exports = webpackMerge(webpackBaseConfig, prodConfig)