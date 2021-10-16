/**
 * @description 添加自定义的拦截
 */
interface IParams {
  reqInterceptor?: (config: object) => object              // 请求拦截，处理完config之后，要返回config
  resInterceptor?: (response: object) => Promise<object>   // 响应拦截，返回一个promise
  url: string | string[]  // 配置url，匹配到该url时，会走自定义拦截, 当url="*"时，未全局拦截器，会拦截所有的请求                                           
}

function addInterceptor(this, params: IParams) {
  if (params.url === "*") {
    if (!this.globalInterceptor) {
      this.globalInterceptor = {
        req: null,
        res: null
      }
    }
    if (params.reqInterceptor) {
      this.globalInterceptor.req = params.reqInterceptor
    }
    if (params.resInterceptor) {
      this.globalInterceptor.res = params.resInterceptor
    }
  } else {
    if (this.customInterceptor) {
      this.customInterceptor.push(params)
    } else {
      this.customInterceptor = [params]
    }
  }
}

export { addInterceptor }