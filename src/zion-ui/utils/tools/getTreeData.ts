/**
 * @description 获取树形结构数据
 */
import cloneDeep from "lodash/cloneDeep"

interface IDataSourceItem {
	key: string
	uiPid: string | null
	[key: string]: any
}
const pidField = "uiPid"
const idField = "key"
const valueField = "value"
const childrenField = "children"

export const getTreeData = function (dataSource: IDataSourceItem[]) {
	const originData = cloneDeep(dataSource)
	let mapObj: any = {}
	let result: any = []
	let map: any = {}
	originData.forEach((item: any) => {
		item[pidField] = item[pidField] || null
		item[valueField] = item[valueField] || item[idField]
		map[item[idField]] = item
		mapObj[item[idField]] = item
	});
	originData.forEach((item: any) => {
		let parent = map[item[pidField]]
		if (parent) {
			(parent[childrenField] || (parent[childrenField] = [])).push(item)
		} else {
			result.push(item)
		}
	})
	return result
}