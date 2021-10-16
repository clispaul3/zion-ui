const postcssImport = require("postcss-import")
const postcssUrl = require("postcss-url")
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer")
const postcssPxToViewport = require("postcss-px-to-viewport")
const postcssScss = require("precss")
const path = require("path")
const { resolvePath, img2base64 } = require("../utils")
/**
 * @description 处理import语法
 */
function postImport() {
	return postcssImport({
		resolve: function (id, basedir, options) {
			return new Promise((resolve, reject) => {
				if (/^\./.test(id)) {
					resolve(path.resolve(basedir, id))
				} else {
					resolve(resolvePath(id))
				}
			})
		}
	})
}


/**
 * @description 处理url语法
 */
function postUrl() {
	return postcssUrl({
		url: options => {
			const { pathname, absolutePath } = options
			let base64 = ""
			if (pathname) {
				base64 = "data:image/" + path.extname(absolutePath).replace(".", "") + ";base64," + img2base64(absolutePath)
			}
			return base64
		},
		useHash: false
	})
}

/**
 * @description 样式打包与压缩
 */
function postCssnano() {
	return cssnano({ preset: "default" })
}

/**
 * @description 浏览器前缀处理
 */
function postAutoprefixer() {
	return autoprefixer({
		browsers: [
			'last 10 Chrome versions',
			'last 5 Firefox versions',
			'Safari >= 6',
			'ie> 8'
		]
	})
}


/**
 * @description 编译sass语法
 */
function postScss() {
	return postcssScss({})
}

/**
 * @description 手机的端样式适配
 */
function pxToViewport() {
	return postcssPxToViewport({
		viewportWidth: 750,
		unitPrecision: 3,
		viewportUnit: "vw",
		minPixelValue: 1,
		mediaQuery: false,
		exclude: [/node_modules/]
	})
}

module.exports = {
	postImport,
	postUrl,
	postCssnano,
	postAutoprefixer,
	postScss,
	pxToViewport
}
