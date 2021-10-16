/**
 * @description 修改数据通用接口
 */
import DataApiService from "."
import { getFilterCondition } from "./utils/getFilterCondition"

interface IParams {
	tableName: string
	setColumns?: object
	filterCondition?: string[][]
	data?: object[]
}

export const updateData = async function (params: IParams) {
	const { tableName, data = [], filterCondition = [], setColumns } = params
	// 通过条件修改
	if (filterCondition?.length > 0) {
		const requestParams = {
			tableName: tableName,
			tableType: "0",
			operType: "UPDATE",
			setColumns,
			filterCondition: getFilterCondition(tableName, filterCondition as any)
		}
		const result = await DataApiService.request({
			url: "api/restApi/buttonControl/dbTableButton/execOperations",
			method: "POST",
			data: [requestParams]
		})
		return result
		// 通过id修改
	} else {
		if (data?.length <= 0) return
		let hasError = false
		const requestParams = data?.map((item: any) => {
			const setColumns: any = {}
			const id = item["id"]
			if (!id) {
				hasError = true
				console.error("未提供id，无法通过id修改")
				return
			}
			Object.keys(item).forEach(key => {
				if (key !== "id") {
					setColumns[key] = item[key]
				}
			})
			return {
				tableName: tableName,
				tableType: "0",
				operType: "UPDATE",
				setColumns,
				conditions: {
					id: [id]
				}
			}
		})
		if (hasError) return
		const result = await DataApiService.request({
			url: "api/restApi/buttonControl/dbTableButton/execOperations",
			method: "POST",
			data: requestParams
		})
		return result
	}
}