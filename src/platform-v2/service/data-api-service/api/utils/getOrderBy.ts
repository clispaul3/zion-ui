/**
 * @description 获取filterCondition
 * orderBy: [["fieldName", "value"]]
 * @param tableName 
 * @param filterCondition 
 */
export const getOrderBy = function (tableName, orderBy = []) {
  const result = orderBy.map((item: any) => {
    return {
      fieldName: tableName + "." + item[0],
      sort: item[1].toUpperCase()
    }
  })
  return result
}