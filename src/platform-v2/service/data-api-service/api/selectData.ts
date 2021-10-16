/**
 * @description 通用的查询表数据，封装showTableData
 * filterCondition: [["fieldName","condition","connection","value"],[[],[]]]
 * orderBy: [["fieldName", "value"]]
 */
import DataApiService from "."
import { getFilterCondition } from "./utils/getFilterCondition"
import { getOrderBy } from "./utils/getOrderBy"
import { cloneDeep } from "lodash"

interface IParams {
	tableName: string               // 如:["usr_Account"]
	page?: number
	pageSize?: number | null
	fieldName?: string[]            // 如:["id","name"]
	filterCondition?: any[]         // 如：[["fieldName","condition","connection","value"],[[],[]]]
	orderBy?: any[]                 // 如: [["fieldName", "value"]]
	type?: "TABLE" | "ES"           // 查询类型: 表格查询 | ES查询
	extraParams?: any               // 额外参数, object
}

export const selectData = function () {
	const allTableList: any = {}
	return async function (params?: IParams) {
		const { tableName = "", type = "TABLE", extraParams } = params || {}
		if (type === "ES" && params && !params?.fieldName) {
			params.fieldName = []
		}
		let tableConfig
		if (allTableList[tableName]) {
			tableConfig = allTableList[tableName]
		} else if (params?.fieldName) {
			tableConfig = {
				tableName,
				columns: params.fieldName.map(field => {
					return {
						columnAlias: field,
						filedName: field
					}
				}),
				tableAlias: ""
			}
		} else {
			const result = await DataApiService.request({
				url: "api/restApi/retable/listTableColumnTree?tableName=" + tableName
			})
			let { columns, tableName: tablename, tableAlias } = result[0]
			const targetColumns: any = []
			columns.forEach((item: any) => {
				targetColumns.push({
					columnAlias: item["columnAlias"],
					filedName: item["filedName"]
				})
			})
			tableConfig = {
				tableName: tablename,
				columns: targetColumns,
				tableAlias
			}
			allTableList[tablename] = tableConfig
		}
		const { columns: targetColumns } = tableConfig
		let requestParams: any = {
			fieldName: targetColumns.map((field: any) => {
				if (type === "ES") return field
				return field["filedName"].indexOf(".") >= 0 ? field["filedName"] : (tableName + "." + field["filedName"])
			}),
			params: {
				filterCondition: getFilterCondition(tableName, params?.filterCondition as any),
				orderBy: getOrderBy(tableName, params?.orderBy as any)
			},
			start: ((params?.page || 1) - 1) * (params?.pageSize || 10),
			length: params?.pageSize || 10,
			tableName,
			type: type === "ES" ? "ES_DATA_PAGE" : "TABLE_QUERY",
		}
		// 支持额外参数
		if (extraParams) {
			if (extraParams.filterCondition) {
				requestParams.params.filterCondition = [
					...(extraParams.filterCondition || []),
					...(requestParams.params.filterCondition || [])
				]
			}
			if (extraParams.orderBy) {
				requestParams.params.orderBy = [
					...(extraParams.orderBy || []),
					...(requestParams.params.orderBy || [])
				]
			}
			const _extraParams = cloneDeep(extraParams)
			delete _extraParams.filterCondition
			delete _extraParams.orderBy
			Object.assign(requestParams, { ..._extraParams })
		}
		if (params?.pageSize === null) {
			delete requestParams.length
		}
		const result = await DataApiService.request({
			method: "POST",
			url: "api/restApi/controlData/showTableData",
			data: requestParams
		})
		const aaData = result["aaData"]
		const copyFieldName: any = params?.fieldName?.map(item => {
			if (item.indexOf(".") >= 0) {
				return item.replace(".", "_")
			} else {
				return (tableName + "_" + item)
			}
		})
		const dataSource = aaData.map((item: any) => {
			if (type === "ES") return item
			let obj: any = {}
			Object.keys(item).forEach(key => {
				const targetKey = key.indexOf(tableName) >= 0 ? key.replace(tableName + "_", "") : key
				if (params?.fieldName) {
					if (copyFieldName.includes(key) || copyFieldName.includes(key.replace("_JSON", ""))) {
						if (key.indexOf("_JSON") >= 0) {
							obj[targetKey] = item[key]["name"]
							obj[targetKey.replace("_JSON", "")] = item[key]["code"]
						} else if (!obj[targetKey]) {
							obj[targetKey] = item[key]
						}
					}
				} else {
					if (key.indexOf("_JSON") >= 0) {
						obj[targetKey.replace("_JSON", "")] = item[key]["code"]
						obj[targetKey] = item[key]["name"]
					} else {
						if (!item.hasOwnProperty(key + "_JSON")) {
							obj[targetKey] = item[key]
						}
					}
				}
			})
			return obj
		})
		return {
			data: dataSource,
			total: result["iTotalRecords"]
		}
	}
}();
