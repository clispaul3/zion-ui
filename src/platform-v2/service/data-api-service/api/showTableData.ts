/**
 * showTableData相关的请求
 */
export function showTableData(this, params) {
  return this.request({
    method: "POST",
    url: "api/restApi/controlData/showTableData",
    data: params
  })
}