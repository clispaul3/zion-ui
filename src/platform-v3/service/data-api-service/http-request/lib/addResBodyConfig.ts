/**
 * 添加数据返回结构体的配置
 */
interface IConfig {
  strictMatch?: boolean  // 是否严格匹配请求地址，默认为false，模糊匹配
  url: string,           // 请求地址
  dataKey: string,       // 数据存放的字段
  message: string,       // 提示文字存放的字段
  success: {
    key: string,       // 根据哪个字段判断是否返回成功
    value: any         // 根据字段的什么值判断是否返回成功
  }
}
export function addResBodyConfig(this, config: IConfig) {
  if (!this.resBodyConfig) this.resBodyConfig = []
  this.resBodyConfig.push(config)
}