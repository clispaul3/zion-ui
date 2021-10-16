/**
 * @description 删除节点
 */
export const onDelete = ({ config, layout, callback }) => {
  const controlKey = config["children"][0]["props"]["controlKey"]
  let { children = [] } = layout
  children = children.filter(child => child["children"][0]["props"]["controlKey"] !== controlKey)
  layout["children"] = children
  callback({ layout })
}