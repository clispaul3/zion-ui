/**
 * @description 删除数据通用接口
 */
import DataApiService from "."
import { getFilterCondition } from "./utils/getFilterCondition"
interface IParams {
	tableName: string               // 表名
	ids?: string[]                  // 需要删除的id
	filterCondition?: string[][]    // 数据过滤条件
}

export const deleteData = async function (params: IParams) {
	const { ids = [], filterCondition, tableName } = params
	if (ids.length > 0) {
		const result = await DataApiService.request({
			url: "api/restApi/controlData/deleteTableRecord",
			method: "POST",
			data: {
				tableName,
				tableType: "1",
				ids: params.ids
			}
		})
		return result
	} else if (filterCondition) {
		const result = await DataApiService.request({
			url: "api/restApi/buttonControl/dbTableButton/execOperations",
			method: "POST",
			data: [{
				tableName,
				tableType: "1",
				operType: "DELETE",
				filterCondition: getFilterCondition(tableName, params.filterCondition as any)
			}]
		})
		return result
	}
	return null
}