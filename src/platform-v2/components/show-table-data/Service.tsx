import { DataApiService } from "../../index"
import { IProps } from "./index"
import { StateManage, Loading } from "zion-ui"
import { cloneDeep } from "lodash"

class ShowTableService {
	config: IProps
	/** 动态注入的查询条件 */
	dynamicFilterCondition: any = []
	constructor(config: IProps) {
		this.config = config
		this.getQueryParams = this.getQueryParams.bind(this)
		this.getTableDataSource = this.getTableDataSource.bind(this)
	}
	// 获取查询条件
	async getQueryParams(params: { page, filterConditionMap?}) {
		const { page, filterConditionMap = {} } = params
		const { tableName, fieldName = [], searchMatchField, filterCondition = [], orderBy = [] } = this.config
		const requestParams: any = {
			tableName,
			filterCondition: cloneDeep(filterCondition),
			orderBy
		}
		if (this.dynamicFilterCondition.length) {
			requestParams.filterCondition.push(this.dynamicFilterCondition)
		}
		if (fieldName.length) {
			requestParams.fieldName = fieldName
		}
		if (this.config.tableControlKey) {
			const { getQueryCondition } = StateManage.get(this.config.tableControlKey)
			if (getQueryCondition) {
				const { filterConditionMap, orderByMap } = getQueryCondition()
				Object.assign(requestParams, {
					page: page || filterConditionMap["@page"] || 1,
					pageSize: filterConditionMap["@pageSize"] || 10,
					orderBy: Object.keys(orderByMap).map(field => {
						return [field, orderByMap[field]]
					}).concat(orderBy)
				})
				const searchValue = filterConditionMap["@searchValue"]
				if (searchValue) {
					const filterCondition: any = [];
					(searchMatchField || this.config.fieldName || []).forEach(field => {
						filterCondition.push([field, "like", "||", searchValue])
					})
					requestParams.filterCondition.push(filterCondition)
				}
			}
		}
		if (StateManage.has(this.config.filterFormControlKey || "")) {
			const { getFormData } = StateManage.get(this.config.filterFormControlKey || "")
			const filterCondition: any = []
			const formData = await getFormData(false)
			Object.keys(formData).forEach(key => {
				const value = filterConditionMap[key] || formData[key]["value"]
				if (value) {
					if (Array.isArray(value)) {
						if (value.length) {
							filterCondition.push([key, "in", "&&", value.toString()])
						}
					} else {
						filterCondition.push([key, "=", "&&", value])
					}
				}
			})
			requestParams.filterCondition.push(...filterCondition)
		}
		return requestParams
	}
	// 获取数据源,extraParams,filterCondition 与 DataApiService.selectData 中的参数格式保持一致
	async getTableDataSource(params: { page?, filterCondition?, checkedKeys?, extraParams?, filterConditionMap?}) {
		const { page, filterCondition = [], checkedKeys = [], extraParams, filterConditionMap } = params
		const { rowKey } = this.config
		const requestParams = await this.getQueryParams({ page, filterConditionMap })
		if (filterCondition.length) {
			(requestParams as any).filterCondition.push(filterCondition)
		}
		if (extraParams) {
			requestParams.extraParams = extraParams
		}
		if (checkedKeys.length) {
			const checkedRows = await this.getCheckedData({ rowKey, checkedKeys, extraParams })
			const { data, total } = await DataApiService.selectData(requestParams)
			return {
				data, total, checkedRows
			}
		}
		return DataApiService.selectData(requestParams)
	}
	// 刷新表格,动态注入的filterCondition会长期驻留,除非再次动态注入一个[]
	async refreshTable(params: { page?, filterCondition?, extraParams?}) {
		const { page, filterCondition = [], extraParams } = params
		this.dynamicFilterCondition = filterCondition || []
		Loading.setGlobalLoading(true)
		const { data, total } = await this.getTableDataSource({ page, filterCondition, extraParams })
		StateManage.set(this.config.tableControlKey, {
			dataSource: data,
			"pagination.total": total
		})
		Loading.setGlobalLoading(false)
		return {
			data,
			total
		}
	}
	// 获取选中的数据
	async getCheckedData({ checkedKeys, rowKey, extraParams }) {
		const { tableName, fieldName } = this.config
		if (checkedKeys?.length <= 0) return []
		const { data } = await DataApiService.selectData({
			tableName,
			fieldName,
			pageSize: checkedKeys.length,
			filterCondition: [
				[rowKey || "id", "in", "&&", checkedKeys.toString()]
			],
			extraParams
		})
		return data
	}
}

export default ShowTableService