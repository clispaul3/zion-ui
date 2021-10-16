/**
 * @description 新增数据通用接口
 */
import DataApiService from "."

interface IParams {
	tableName: string
	data: object[]
	tableType?: "main" | "sub" | "main_sub"    // 主表 | 附属表 | 主附表
}

export const insertData = async function (params: IParams) {
	const { tableName, data = [], tableType = "main" } = params
	if (data.length <= 0) return
	if (data.length <= 0) {
		return
	}
	// 新增(主表|主附表)数据
	if (tableType.indexOf("main") >= 0) {
		const requestParams = data.map(item => {
			return {
				tableName: tableName,
				tableType: "0",
				operation: "insert",
				data: {
					[tableName]: [item]
				}
			}
		})
		const result = await DataApiService.request({
			url: "api/restApi/pageControl/batchInsertBusinessData",
			method: "POST",
			data: { pageFormData: requestParams }
		})

		return result
		// 只新增附属表数据
	} else if (tableType === "sub") {
		const requestParams = data.map(item => {
			return {
				tableName: tableName,
				tableType: "0",
				operType: "INSERT",
				setColumns: { ...item }
			}
		})
		const result = await DataApiService.request({
			url: "api/restApi/buttonControl/dbTableButton/execOperations",
			method: "POST",
			data: requestParams
		})
		return result
	}
}