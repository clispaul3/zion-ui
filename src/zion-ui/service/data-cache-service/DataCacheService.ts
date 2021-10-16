/**
 * @description 数据缓存服务
 */
import Cookies from "js-cookie"

type ECacheType = "cookie" | "sessionStorage" | "localStorage"

const DataCacheService = {
  get(type: "cookie" | "sessionStorage" | "localStorage", key: string | string[]) {
    const lowerType = type.toLocaleLowerCase()
    let result
    // 获取cookie类型的缓存数据
    if (lowerType === "cookie") {
      if (typeof key === "string") {
        result = Cookies.get(key)
      } else {
        result = {}
        key.forEach(item => {
          result[item] = Cookies.get(item)
        })
      }
      return result
    }
    // 获取sessionStorage或locationStorage的缓存数据
    if (["sessionstorage", "localstorage"].includes(lowerType)) {
      const targetGetter = lowerType === "sessionstorage" ? sessionStorage : localStorage
      if (typeof key === "string") {
        result = targetGetter.getItem(key)
      } else {
        result = {}
        key.forEach(item => {
          result[item] = targetGetter.getItem(item)
        })
      }
      return result
    }
  },
  set(type: "cookie" | "sessionStorage" | "localStorage", target: object) {
    const lowerType = type.toLocaleLowerCase()
    // 设置cookie类型的缓存数据
    if (lowerType === "cookie") {
      Object.keys(target).forEach(key => {
        Cookies.set(key, target[key])
      })
    }
    // 设置sessionStorage或locationStorage的缓存数据
    if (["sessionstorage", "localstorage"].includes(lowerType)) {
      const targetGetter = lowerType === "sessionstorage" ? sessionStorage : localStorage
      Object.keys(target).forEach(key => {
        targetGetter.setItem(key, target[key])
      })
    }
  }
}

export default DataCacheService