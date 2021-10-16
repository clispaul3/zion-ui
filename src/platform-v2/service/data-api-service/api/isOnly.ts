/**
 * @description 判断是否唯一
 * filterCondition: [
 *  ["fieldName","condition","connection","value"],
 *  [  [],[]  ]
 * ]
 */
import DataApiService from "."
import { getFilterCondition } from "./utils/getFilterCondition"

interface IParams {
	tableName: string,
	filterCondition: string[][]
}
export const isOnly = async function (params: IParams) {
	const { tableName, filterCondition = [] } = params
	const reqParams = {
		tableName: params.tableName,
		params: {
			"filterCondition": getFilterCondition(tableName, filterCondition as any)
		}
	}
	const result = await DataApiService.request({
		url: "/api/restApi/controlData/isOnly",
		method: "POST",
		data: reqParams
	})
	return result
}