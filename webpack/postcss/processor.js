const postcss = require("postcss")
const scssSyntax = require("postcss-scss")
const lessSyntax = require("postcss-less")
const fs = require("fs")
const {
  postImport,
  postUrl,
  postCssnano,
  postAutoprefixer,
  postScss,
  pxToViewport
} = require("./plugins")
const processorScss = postcss([postImport(), postUrl(), postScss()])
const processorCss = postcss([postImport(), postAutoprefixer(), postCssnano(), postUrl()])
const { appProjects } = require("../config/base")
/**
 * @description 处理sass语法
 */
async function compileSass2Css(config, callback) {
  const path = config["entry"]
  const fileContent = fs.readFileSync(path, "utf-8")
  let targetProcessorScss = processorScss
  if (appProjects.includes(config["key"])) {
    targetProcessorScss = postcss([postImport(), postUrl(), postScss(), pxToViewport()])
  }
  const result = await targetProcessorScss.process(fileContent, { parser: scssSyntax, from: path })
  if (result.css) {
    const css = await optimizeCss(result.css, path)
    callback(css)
  } else {
    callback(null)
  }
}

/**
 * @description 处理less语法
 */
async function compileLess2Css(config, callback) {
  const path = config["entry"]
  const fileContent = fs.readFileSync(path, "utf-8")
  const result = await processorScss.process(fileContent, { syntax: lessSyntax });
  if (result.css) {
    const css = await optimizeCss(result.css, path)
    callback(css)
  } else {
    callback(null)
  }
}

/**
 * @description 优化css
 */
function optimizeCss(css, path) {
  return new Promise((resolve, reject) => {
    processorCss.process(css, {
      from: path
    })
      .then(result => {
        if (result.css) {
          resolve(result.css)
        } else {
          resolve(null)
        }
      })
  })
}

module.exports = {
  compileLess2Css,
  compileSass2Css
}
