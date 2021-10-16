/**
 * @description 根据配置过滤接口返回的数据
 */
function filterResBoby(response, httpInstance) {
  const { data, config } = response
  const { resBodyConfig } = httpInstance || []
  let res = {
    status: false,
    result: "未配置响应数据结构映射"
  }
  function getRes(item) {
    if ((data[item.success.key] === item.success.value)) {
      res = { status: true, result: data[item.dataKey] }
    } else {
      res = { status: false, result: data[item.message] }
    }
    return res
  }
  try {
    resBodyConfig.forEach(item => {
      if (item.strictMatch === true) {
        if (config.url === item.url) {
          res = getRes(item)
          throw Error()
        }
      } else {
        if (config.url.indexOf(item.url) >= 0) {
          res = getRes(item)
          throw Error()
        }
      }
    })
  } catch (error) {

  }

  return res
}

function getUrlPath() {
  const { protocol, hostname, port } = window.location
  return protocol + "//" + hostname + ":" + port
}

/**
 * @description 请求拦截
 */
export function initReqInterceptor(httpInstance) {
  httpInstance.interceptors.request.use((config) => {
    if (location.hostname !== "location" && !config.isAbsolute) {
      config.url = location.origin + "/" + config.url.replace(/^\/+/, "")
    }
    // 全局拦截器处理
    if (httpInstance.globalInterceptor.req) {
      config = httpInstance.globalInterceptor.req(config)
    }
    const shouldFilterStr = getUrlPath()
    httpInstance.customInterceptor.forEach(item => {
      let url = config.url.replace(shouldFilterStr, "")
      if (item.url[0] === "/") {
        url = url.slice(0, 0) + "/" + url.slice(0);
      }
      if (url.indexOf(item.url) >= 0 && item["reqInterceptor"]) {
        config = item["reqInterceptor"](config)
      }
		})
    return config
  }, function (error) {
    return Promise.reject(error)
  })

}
/**
 * @description 响应拦截
 */
export function initResInterceptor(httpInstance) {
  function getCustomInterceptorRes(response) {
    const shouldFilterStr = getUrlPath()
    let result
    if (response.config.ignore === true) {
      return response
    }
    httpInstance.customInterceptor.forEach(item => {
      let url = response.config.url.replace(shouldFilterStr, "")
      if (item.url[0] === "/") {
        url = url.slice(0, 0) + "/" + url.slice(0);
      }
      if (url.indexOf(item.url) >= 0 && item["resInterceptor"]) {
        result = item["resInterceptor"](response)
      }
    })
    return result
  }
  httpInstance.interceptors.response.use(function (response) {
    // 全局响应拦截器处理
    if (httpInstance.globalInterceptor.res) {
      response = httpInstance.globalInterceptor.res(response)
    }
    // 自定义拦截器处理
    const result = getCustomInterceptorRes(response)
    if (result) return result
    const res = filterResBoby(response, httpInstance)
    const { status } = res
    return status ? Promise.resolve(res.result) : Promise.reject(res.result)
  }, function (error) {
    const { status } = error.response || {}
    if (status == 504) {
      error.message = (status + ":服务器响应异常")
    } else if (status == 404) {
      error.message = (status + ":未找到请求资源")
    } else {
      error.message = error.message || "未正确请求到数据"
    }
    return Promise.reject(error.message)
  })
}