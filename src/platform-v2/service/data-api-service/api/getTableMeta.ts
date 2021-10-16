/** 获取数据表的元数据 */
import DataApiService from "."

export const getTableMeta = async (tableName: string) => {
	try {
		const result = await DataApiService.request({
			url: "api/restApi/retable/listTableColumnTree?tableName=" + tableName
		})
		return result.find(table => table["tableName"] === tableName)
	} catch (error) {
		return error
	}
}