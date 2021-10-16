/**
 * @description 获取本级 + 子孙集数据
 */
import { selectData } from "./selectData"
interface IParams {
	tableName: string               // 表名
	idKey?: string                  // 数据标识字段，默认是 id
	pidKey?: string                 // 上级标识字段, 默认是 pid
	id: string
	filterCondition?: string[][]    // 额外的数据过滤条件
	fieldName?: string[]            // 查询字段
}

export const getChildren = async function (params: IParams) {
	const { tableName, pidKey = "pid", id, idKey = "id", filterCondition = [], fieldName = [] } = params
	let nextFilterCondition: any = [
		[idKey, "samelevel_childrens", "&&", id, pidKey]
	]
	if (filterCondition.length > 0) {
		nextFilterCondition.push(filterCondition)
	}
	return selectData({
		tableName,
		pageSize: null,
		filterCondition: nextFilterCondition,
		fieldName: fieldName.length === 0 ? [idKey, pidKey] : fieldName
	})
}