/**
 * @description 通用请求接口
 */
import DataApiService from "."

export async function request(this: any, reqParams) {
	return DataApiService.request(reqParams)
}